var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observable, action, computed } from "mobx";
import { AppState } from "react-native";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import * as Keychain from "react-native-keychain";
import { ScreenVisibilityListener as RNNScreenVisibilityListener, Navigation } from "react-native-navigation";
import Screen from "../data/enum/Screen";
import meQueryTag from "../data/graphQL/meQuery.graphql";
import FeedsStore from "../store/FeedsStore";
require("../utils/Promise");
export default class GlobalStore {
    constructor() {
        this.initApollo = () => {
            const { password } = this.credential || {};
            const authLink = setContext((_, { headers }) => {
                return {
                    headers: Object.assign({}, headers, { authorization: password ? `Bearer ${password}` : null })
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
        this.getApollo = () => {
            return this.apollo;
        };
        this.setCredential = (credential) => {
            this.credential = credential;
            this.initApollo();
        };
        this.getToken = () => {
            return this.credential.password;
        };
        this.checkLogin = () => {
            return Keychain.getGenericPassword(GlobalStore.appName)
                .then(credentials => {
                if (typeof credentials !== "boolean") {
                    this.setCredential(credentials);
                    return true;
                }
                else {
                    throw new Error("Credentials has not been set.");
                }
            })
                .catch(error => {
                console.warn("Keychain couldn't be accessed! Maybe no value set?", error);
                return false;
            });
        };
        this.isDoingLogin = false;
        this.username = "";
        this.password = "";
        this.inputUsername = (username) => {
            console.log(username);
            this.username = username;
        };
        this.inputPassword = (password) => {
            this.password = password;
        };
        this.signIn = () => {
            const { username, password } = this;
            if (password) {
                Keychain.setGenericPassword(username, password, GlobalStore.appName);
                this.setCredential({
                    username,
                    password,
                    service: GlobalStore.appName
                });
            }
            this.isDoingLogin = true;
            return this.apollo
                .query({
                query: gql(meQueryTag),
                variables: {
                    avatar_size: 64
                }
            })
                .then((data) => {
                console.log(data);
                this.me = data.data.viewer;
            })
                .catch(error => {
                console.warn(error);
                throw error;
            })
                .finally(() => {
                this.isDoingLogin = false;
            });
        };
        this.signOut = () => {
            this.setCredential(null);
        };
        this.showLoginScreen = () => {
            Navigation.showModal({
                screen: Screen.LOGIN,
                title: "Login",
                passProps: {},
                navigatorStyle: { navBarHidden: true },
                animationType: "slide-up"
            });
        };
        this.appStateActive = true;
        this.handleAppStateChange = () => {
            this.appStateActive = AppState.currentState === "active";
        };
        this.currentScreen = Screen.HOME;
        this.registerListener = () => {
            this.screenVisibilityListener = new RNNScreenVisibilityListener({
                didAppear: ({ screen, startTime, endTime, commandType }) => {
                    console.log("screenVisibility", `Screen ${screen} displayed in ${endTime -
                        startTime} millis after [${commandType}]`);
                    if (commandType === "InitialScreen" && !this.isLogged) {
                        this.showLoginScreen();
                    }
                    else {
                        switch (screen) {
                            case Screen.HOMEFeedsTab:
                                FeedsStore.getInstance().maybeInit();
                                break;
                            default:
                                console.log("default");
                        }
                    }
                }
            });
            this.screenVisibilityListener.register();
            AppState.addEventListener("change", this.handleAppStateChange);
        };
        this.unregisterListener = () => {
            if (this.screenVisibilityListener) {
                this.screenVisibilityListener.unregister();
                this.screenVisibilityListener = null;
            }
            AppState.removeEventListener("change", this.handleAppStateChange);
        };
        this.initApollo();
        this.registerListener();
    }
    static getInstance() {
        if (!GlobalStore.instance) {
            GlobalStore.instance = new GlobalStore();
        }
        return GlobalStore.instance;
    }
    get isLogged() {
        const { credential } = this;
        return credential && credential.password;
    }
    get loginBtnDisabled() {
        const { isDoingLogin, username, password } = this;
        return isDoingLogin || !username || !password;
    }
}
GlobalStore.appName = "PocketGithub";
GlobalStore.dispose = () => {
    if (GlobalStore.instance) {
        GlobalStore.instance.unregisterListener();
        GlobalStore.instance = null;
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], GlobalStore.prototype, "credential", void 0);
__decorate([
    action,
    __metadata("design:type", Object)
], GlobalStore.prototype, "setCredential", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], GlobalStore.prototype, "isLogged", null);
__decorate([
    observable,
    __metadata("design:type", Boolean)
], GlobalStore.prototype, "isDoingLogin", void 0);
__decorate([
    observable,
    __metadata("design:type", String)
], GlobalStore.prototype, "username", void 0);
__decorate([
    observable,
    __metadata("design:type", String)
], GlobalStore.prototype, "password", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], GlobalStore.prototype, "loginBtnDisabled", null);
__decorate([
    action,
    __metadata("design:type", Object)
], GlobalStore.prototype, "inputUsername", void 0);
__decorate([
    action,
    __metadata("design:type", Object)
], GlobalStore.prototype, "inputPassword", void 0);
__decorate([
    action,
    __metadata("design:type", Object)
], GlobalStore.prototype, "signIn", void 0);
__decorate([
    action,
    __metadata("design:type", Object)
], GlobalStore.prototype, "signOut", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], GlobalStore.prototype, "me", void 0);
__decorate([
    observable,
    __metadata("design:type", Boolean)
], GlobalStore.prototype, "appStateActive", void 0);
__decorate([
    observable,
    __metadata("design:type", String)
], GlobalStore.prototype, "currentScreen", void 0);
