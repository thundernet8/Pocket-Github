import { observable } from "mobx";
import AbstractScreenStore from "./AbstractScreenStore";
import GlobalStore from "./GlobalStore";
import Request from "../utils/Request";
import IEvent from "../data/interface/IEvent";

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
        this.loading = true;
        const globalStore = GlobalStore.getInstance();
        globalStore
            .mePromise()
            .then(me => {
                return Request.RestGet<IEvent[]>(
                    `/users/${me.login}/received_events`,
                    { page: this.page }
                );
            })
            .then(resp => {
                this.events = resp;
                this.dataLoaded = true;
                if (!resp || resp.length === 0) {
                    this.hasMoreEvents = false;
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.loading = false;
            });
    }

    @observable loading: boolean = false;

    /**
     * 收到的事件
     */
    @observable events: IEvent[] = [];

    @observable page: number = 1;

    @observable pageSize: number = 2;

    @observable hasMoreEvents: boolean = true;
}
