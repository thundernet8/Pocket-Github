import { observable, action, toJS } from "mobx";
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
        const { page, events, loading } = this;

        if (loading) {
            return;
        }

        this.loading = true;
        const globalStore = GlobalStore.getInstance();
        globalStore
            .getMePromise()
            .then(me => {
                return Request.RestGet<IEvent[]>(
                    `/users/${me.login}/received_events`,
                    { page }
                );
            })
            .then(resp => {
                if (page === 1) {
                    this.events = resp;
                } else {
                    this.events = [].concat(toJS(events)).concat(resp);
                }
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
                this.refreshing = false;
                this.loadingMore = false;
            });
    }

    @observable loading: boolean = false;
    @observable refreshing: boolean = false;
    @observable loadingMore: boolean = false;

    /**
     * 收到的事件
     */
    @observable events: IEvent[] = [];

    @observable page: number = 1;

    @observable pageSize: number = 30;

    @observable hasMoreEvents: boolean = true;

    @action
    loadNextPage = () => {
        const { page, pageSize, hasMoreEvents, events, loading } = this;
        if (loading || !hasMoreEvents || events.length < pageSize) {
            return;
        }
        this.page = page + 1;
        this.loadingMore = true;
        this.loadData();
    };

    @action
    refresh = () => {
        this.page = 1;
        this.refreshing = true;
        this.loadData();
    };
}
