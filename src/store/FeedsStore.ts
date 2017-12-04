import { observable } from "mobx";
import AbstractScreenStore from "./AbstractScreenStore";

export default class FeedsStore extends AbstractScreenStore {
    private static instance: FeedsStore;

    public static getInstance() {
        if (!FeedsStore.instance) {
            FeedsStore.instance = new FeedsStore();
        }
        return FeedsStore.instance;
    }

    private constructor() {
        super();
    }

    // @override
    protected loadData() {
        //
        this.loading = true;
    }

    @observable loading: boolean = false;
}
