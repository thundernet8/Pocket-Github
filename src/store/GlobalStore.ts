import { observable, action } from "mobx";
import { ApolloClient, ApolloQueryResult } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import * as Keychain from "react-native-keychain";
import ICredential from "../data/interface/ICredential";
import Screen from "../data/enum/Screen";
import { meQuery } from "../data/graphQL/types";
import meQueryTag from "../data/graphQL/meQuery.graphql";

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
    }

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
        Keychain.getGenericPassword(GlobalStore.appName)
            .then(credentials => {
                if (typeof credentials !== "boolean") {
                    this.setCredential(credentials);
                } else {
                    throw new Error("Credentials has not been set.");
                }
            })
            .catch(error => {
                console.warn(
                    "Keychain couldn't be accessed! Maybe no value set?",
                    error
                );
            });
    };

    /**
     * @param username Github用户名
     * @param password Github密码或Access Token(注: 使用了两步验证时必须使用Access Token作为密码)
     */
    @action
    signIn = (username: string, password: string) => {
        Keychain.setGenericPassword(username, password, GlobalStore.appName);
        this.setCredential({
            username,
            password,
            service: GlobalStore.appName
        });

        // TODO login
        this.apollo
            .query<meQuery>({
                query: gql(meQueryTag),
                variables: {
                    avatar_size: 64
                }
            })
            .then((data: ApolloQueryResult<meQuery>) => {
                console.log(data);
                this.me = data.data.viewer;
            })
            .catch(error => {
                console.warn(error);
            });
    };

    @action
    signOut = () => {
        this.setCredential(null);
    };

    @observable me: meQuery["viewer"];

    /**
     * Screen
     */
    @observable currentScreen: Screen = Screen.WELCOME;
}
