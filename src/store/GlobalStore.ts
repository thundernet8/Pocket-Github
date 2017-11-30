import { observable, action } from "mobx";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import ICredential from "../data/interface/ICredential";

export default class GlobalStore {
    private static instance: GlobalStore;
    private apollo: ApolloClient<NormalizedCacheObject>;

    public static getInstance(credential?: ICredential) {
        if (GlobalStore.instance) {
            GlobalStore.instance.credential = credential;
            return GlobalStore.instance;
        }
        const instance = new GlobalStore(credential);
        GlobalStore.instance = instance;
        return instance;
    }

    private constructor(credential?: ICredential) {
        this.setCredential(credential);
    }

    /**
     * Apollo Client
     */
    initApollo = () => {
        const { password } = this.credential;
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

    /**
     * @param username Github用户名
     * @param password Github密码或Access Token(注: 使用了两步验证时必须使用Access Token作为密码)
     */
    @action
    signIn = (username: string, password: string) => {
        // TODO
    };

    @action
    signOut = () => {
        this.setCredential(null);
    };
}
