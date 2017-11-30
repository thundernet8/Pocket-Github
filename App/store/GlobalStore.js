var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observable, action } from "mobx";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import * as Keychain from "react-native-keychain";
import Screen from "../data/enum/Screen";
import meQueryTag from "../data/graphQL/meQuery.graphql";
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
            Keychain.getGenericPassword(GlobalStore.appName)
                .then(credentials => {
                if (typeof credentials !== "boolean") {
                    this.setCredential(credentials);
                }
                else {
                    throw new Error("Credentials has not been set.");
                }
            })
                .catch(error => {
                console.warn("Keychain couldn't be accessed! Maybe no value set?", error);
            });
        };
        this.signIn = (username, password) => {
            Keychain.setGenericPassword(username, password, GlobalStore.appName);
            this.setCredential({
                username,
                password,
                service: GlobalStore.appName
            });
            this.apollo
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
            });
        };
        this.signOut = () => {
            this.setCredential(null);
        };
        this.currentScreen = Screen.WELCOME;
        this.initApollo();
    }
    static getInstance() {
        if (!GlobalStore.instance) {
            GlobalStore.instance = new GlobalStore();
        }
        return GlobalStore.instance;
    }
}
GlobalStore.appName = "PocketGithub";
__decorate([
    observable,
    __metadata("design:type", Object)
], GlobalStore.prototype, "credential", void 0);
__decorate([
    action,
    __metadata("design:type", Object)
], GlobalStore.prototype, "setCredential", void 0);
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
    __metadata("design:type", Number)
], GlobalStore.prototype, "currentScreen", void 0);
