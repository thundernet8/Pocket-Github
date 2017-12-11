import { observable, action, toJS, computed } from "mobx";
import AbstractScreenStore from "./AbstractScreenStore";
import GlobalStore from "./GlobalStore";
import Request from "../utils/Request";
import Issue from "../data/interface/Issue";
import { IssueFilter, IssueState, IssueSort } from "../data/enum/Issue";

export default class IssuesStore extends AbstractScreenStore {
    private static instance: IssuesStore;

    public static getInstance() {
        if (!IssuesStore.instance) {
            IssuesStore.instance = new IssuesStore();
        }
        return IssuesStore.instance;
    }

    private constructor() {
        super();
    }

    // @override
    protected loadData() {
        const { page, issues, loading, currentFilter, state, sort } = this;

        if (loading[currentFilter]) {
            return;
        }

        this.loading = Object.assign({}, loading, { [currentFilter]: true });
        const globalStore = GlobalStore.getInstance();
        globalStore
            .getMePromise()
            .then(() => {
                console.log("1");
                return Request.RestGet<Issue[]>(`/user/issues`, {
                    page: page[currentFilter],
                    filter: currentFilter,
                    state: state[currentFilter],
                    sort: sort[currentFilter]
                });
            })
            .then(resp => {
                if (page[currentFilter] === 1) {
                    this.issues = Object.assign({}, issues, {
                        [currentFilter]: resp
                    });
                } else {
                    this.issues = Object.assign({}, issues, {
                        [currentFilter]: []
                            .concat(toJS(issues[currentFilter]))
                            .concat(resp)
                    });
                }

                this.dataLoaded = true;
                if (!resp || resp.length === 0) {
                    this.hasMoreIssues = Object.assign({}, this.hasMoreIssues, {
                        [currentFilter]: false
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.loading = Object.assign({}, this.loading, {
                    [currentFilter]: false
                });
                this.refreshing = Object.assign({}, this.refreshing, {
                    [currentFilter]: false
                });
                this.loadingMore = Object.assign({}, this.loadingMore, {
                    [currentFilter]: false
                });
            });
    }

    /**
     * Filter
     */
    @observable currentFilter: IssueFilter = IssueFilter.CREATED;

    /**
     * State
     */
    @observable
    state: { [filter: string]: IssueState } = {
        [IssueFilter.CREATED]: IssueState.OPEN,
        [IssueFilter.ASSIGNED]: IssueState.OPEN,
        [IssueFilter.MENTIONED]: IssueState.OPEN,
        [IssueFilter.SUBSCRIBED]: IssueState.OPEN
    };

    /**
     * Sort
     */
    @observable
    sort: { [filter: string]: IssueSort } = {
        [IssueFilter.CREATED]: IssueSort.COMMENTS,
        [IssueFilter.ASSIGNED]: IssueSort.COMMENTS,
        [IssueFilter.MENTIONED]: IssueSort.COMMENTS,
        [IssueFilter.SUBSCRIBED]: IssueSort.COMMENTS
    };

    /**
     * Default pageSize
     */
    @observable pageSize: number = 30;

    /**
     * Issues
     */
    @observable
    issues: { [filter: string]: Issue[] } = {
        [IssueFilter.CREATED]: [],
        [IssueFilter.ASSIGNED]: [],
        [IssueFilter.MENTIONED]: [],
        [IssueFilter.SUBSCRIBED]: []
    };

    @observable
    page: { [filter: string]: number } = {
        [IssueFilter.CREATED]: 1,
        [IssueFilter.ASSIGNED]: 1,
        [IssueFilter.MENTIONED]: 1,
        [IssueFilter.SUBSCRIBED]: 1
    };

    @observable
    hasMoreIssues: { [filter: string]: boolean } = {
        [IssueFilter.CREATED]: true,
        [IssueFilter.ASSIGNED]: true,
        [IssueFilter.MENTIONED]: true,
        [IssueFilter.SUBSCRIBED]: true
    };

    @observable
    loading: { [filter: string]: boolean } = {
        [IssueFilter.CREATED]: false,
        [IssueFilter.ASSIGNED]: false,
        [IssueFilter.MENTIONED]: false,
        [IssueFilter.SUBSCRIBED]: false
    };

    @observable
    refreshing: { [filter: string]: boolean } = {
        [IssueFilter.CREATED]: false,
        [IssueFilter.ASSIGNED]: false,
        [IssueFilter.MENTIONED]: false,
        [IssueFilter.SUBSCRIBED]: false
    };

    @observable
    loadingMore: { [filter: string]: boolean } = {
        [IssueFilter.CREATED]: false,
        [IssueFilter.ASSIGNED]: false,
        [IssueFilter.MENTIONED]: false,
        [IssueFilter.SUBSCRIBED]: false
    };

    @action
    loadNextPage = () => {
        const {
            page,
            pageSize,
            hasMoreIssues,
            issues,
            loading,
            currentFilter
        } = this;
        if (
            loading[currentFilter] ||
            !hasMoreIssues[currentFilter] ||
            issues[currentFilter].length < pageSize
        ) {
            return;
        }
        this.page = Object.assign({}, page, {
            [currentFilter]: page[currentFilter] + 1
        });
        this.loadingMore = Object.assign({}, page, { [currentFilter]: true });
        this.loadData();
    };

    @action
    refresh = () => {
        const { currentFilter, page, refreshing } = this;
        this.page = Object.assign({}, page, { [currentFilter]: 1 });
        this.refreshing = Object.assign({}, refreshing, {
            [currentFilter]: true
        });
        this.loadData();
    };

    @computed
    get issueList() {
        const { currentFilter, issues } = this;
        return issues[currentFilter];
    }

    @computed
    get isLoading() {
        const { currentFilter, loading } = this;
        return loading[currentFilter];
    }

    @computed
    get isRefreshing() {
        const { currentFilter, refreshing } = this;
        return refreshing[currentFilter];
    }

    @computed
    get isLoadingMore() {
        const { currentFilter, loadingMore } = this;
        return loadingMore[currentFilter];
    }
}
