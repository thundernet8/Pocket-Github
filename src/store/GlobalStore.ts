import { observable, action } from "mobx";
import ICredential from "../data/interface/ICredential";

export default class GlobalStore {
    private static instance: GlobalStore;

    public static getInstance() {
        if (GlobalStore.instance) {
            return GlobalStore.instance;
        }
        return new GlobalStore();
    }

    private constructor() {}

    /**
     * Credentials
     */
    @observable credential: ICredential;

    @action
    setCredential = (credential: ICredential) => {
        this.credential = credential;
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
