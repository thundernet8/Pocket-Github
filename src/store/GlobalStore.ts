import { observable, action, computed } from "mobx";
import { AppState } from "react-native";
import { ApolloClient, ApolloQueryResult } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import * as Keychain from "react-native-keychain";
import {
    ScreenVisibilityListener as RNNScreenVisibilityListener,
    Navigation
} from "react-native-navigation";
import ICredential from "../data/interface/ICredential";
import Screen from "../data/enum/Screen";
import { meQuery } from "../data/graphQL/types";
import meQueryTag from "../data/graphQL/meQuery.graphql";
import FeedsStore from "../store/FeedsStore";

require("../utils/Promise");

export default class GlobalStore {
    private static instance: GlobalStore;
    private apollo: ApolloClient<NormalizedCacheObject>;
    public static appName = "PocketGithub";

    public static getInstance() {
        if (!GlobalStore.instance) {
            GlobalStore.instance = new GlobalStore();
        }
        return GlobalStore.instance;
    }

    private constructor() {
        this.initApollo();
        this.registerListener();
    }

    public static dispose = () => {
        if (GlobalStore.instance) {
            GlobalStore.instance.unregisterListener();
            GlobalStore.instance = null;
        }
    };

    /**
     * Apollo Client
     */
    initApollo = () => {
        const { password } = this.credential || ({} as ICredential);
        const authLink = setContext((_, { headers }) => {
            // return the headers to the context so httpLink can read them
            return {
                headers: {
                    ...headers,
                    authorization: password ? `Bearer ${password}` : null
                }
            };
        });

        const httpLink = new HttpLink({
            uri: "https://api.github.com/graphql",
            credentials: "same-origin"
        });

        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });
        this.apollo = client;
    };

    getApollo = () => {
        return this.apollo;
    };

    /**
     * Credentials
     */
    @observable credential: ICredential;

    @action
    setCredential = (credential: ICredential) => {
        this.credential = credential;
        this.initApollo();
    };

    getToken = () => {
        return this.credential.password;
    };

    checkLogin = () => {
        return Keychain.getGenericPassword(GlobalStore.appName)
            .then(credentials => {
                if (typeof credentials !== "boolean") {
                    this.setCredential(credentials);
                    return true;
                } else {
                    throw new Error("Credentials has not been set.");
                }
            })
            .catch(error => {
                console.warn(
                    "Keychain couldn't be accessed! Maybe no value set?",
                    error
                );
                return false;
            });
    };

    @computed
    get isLogged() {
        const { credential } = this;
        return credential && credential.password;
    }

    @observable isDoingLogin: boolean = false;
    @observable username: string = "";
    @observable password: string = ""; // Github密码或Access Token
    @computed
    get loginBtnDisabled() {
        const { isDoingLogin, username, password } = this;
        return isDoingLogin || !username || !password;
    }

    @action
    inputUsername = (username: string) => {
        console.log(username);
        this.username = username;
    };

    @action
    inputPassword = (password: string) => {
        this.password = password;
    };

    @action
    signIn = () => {
        const { username, password } = this;
        if (password) {
            Keychain.setGenericPassword(
                username,
                password,
                GlobalStore.appName
            );
            this.setCredential({
                username,
                password,
                service: GlobalStore.appName
            });
        }

        // TODO login
        this.isDoingLogin = true;
        return this.apollo
            .query<meQuery>({
                query: gql(meQueryTag),
                variables: {
                    avatar_size: 64
                }
            })
            .then((data: ApolloQueryResult<meQuery>) => {
                console.log(data);
                const viewer = data.data.viewer;
                this.me = viewer;
                return viewer;
            })
            .catch(error => {
                console.warn(error);
                throw error;
            })
            .finally(() => {
                this.isDoingLogin = false;
            });
    };

    @action
    signOut = () => {
        this.setCredential(null);
    };

    @observable me: meQuery["viewer"];

    public mePromise(): Promise<meQuery["viewer"]> {
        if (this.me) {
            return Promise.resolve(this.me);
        }
        return this.signIn();
    }

    /**
     * Modal show login screen
     */
    private showLoginScreen = () => {
        Navigation.showModal({
            screen: Screen.LOGIN,
            title: "Login",
            passProps: {},
            navigatorStyle: { navBarHidden: true },
            animationType: "slide-up"
        });
    };

    /**
     * AppState listener
     */
    @observable appStateActive: boolean = true;

    private handleAppStateChange = () => {
        this.appStateActive = AppState.currentState === "active";
    };

    /**
     * Screen and Screen visibility
     */
    @observable currentScreen: Screen = Screen.HOME;

    private screenVisibilityListener: RNNScreenVisibilityListener;

    private registerListener = () => {
        this.screenVisibilityListener = new RNNScreenVisibilityListener({
            didAppear: ({ screen, startTime, endTime, commandType }) => {
                console.log(
                    "screenVisibility",
                    `Screen ${screen} displayed in ${endTime -
                        startTime} millis after [${commandType}]`
                );
                if (commandType === "InitialScreen" && !this.isLogged) {
                    this.showLoginScreen();
                } else {
                    switch (screen) {
                        case Screen.HOMEFeedsTab:
                            FeedsStore.getInstance().maybeInit();
                            break;
                        // TODO more
                        default:
                            console.log("default");
                    }
                }
            }
        });

        this.screenVisibilityListener.register();
        AppState.addEventListener("change", this.handleAppStateChange);
    };

    private unregisterListener = () => {
        if (this.screenVisibilityListener) {
            this.screenVisibilityListener.unregister();
            this.screenVisibilityListener = null;
        }

        AppState.removeEventListener("change", this.handleAppStateChange);
    };
}
