var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observable, action, toJS } from "mobx";
import AbstractScreenStore from "./AbstractScreenStore";
import GlobalStore from "./GlobalStore";
import Request from "../utils/Request";
export default class FeedsStore extends AbstractScreenStore {
    constructor() {
        super();
        this.loading = false;
        this.refreshing = false;
        this.loadingMore = false;
        this.events = [];
        this.page = 1;
        this.pageSize = 30;
        this.hasMoreEvents = true;
        this.loadNextPage = () => {
            const { page, pageSize, hasMoreEvents, events, loading } = this;
            if (loading || !hasMoreEvents || events.length < pageSize) {
                return;
            }
            this.page = page + 1;
            this.loadingMore = true;
            this.loadData();
        };
        this.refresh = () => {
            this.page = 1;
            this.refreshing = true;
            this.loadData();
        };
    }
    static getInstance() {
        if (!FeedsStore.instance) {
            FeedsStore.instance = new FeedsStore();
        }
        return FeedsStore.instance;
    }
    loadData() {
        const { page, events, loading } = this;
        if (loading) {
            return;
        }
        this.loading = true;
        const globalStore = GlobalStore.getInstance();
        globalStore
            .mePromise()
            .then(me => {
            return Request.RestGet(`/users/${me.login}/received_events`, { page });
        })
            .then(resp => {
            if (page === 1) {
                this.events = resp;
            }
            else {
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
}
__decorate([
    observable,
    __metadata("design:type", Boolean)
], FeedsStore.prototype, "loading", void 0);
__decorate([
    observable,
    __metadata("design:type", Boolean)
], FeedsStore.prototype, "refreshing", void 0);
__decorate([
    observable,
    __metadata("design:type", Boolean)
], FeedsStore.prototype, "loadingMore", void 0);
__decorate([
    observable,
    __metadata("design:type", Array)
], FeedsStore.prototype, "events", void 0);
__decorate([
    observable,
    __metadata("design:type", Number)
], FeedsStore.prototype, "page", void 0);
__decorate([
    observable,
    __metadata("design:type", Number)
], FeedsStore.prototype, "pageSize", void 0);
__decorate([
    observable,
    __metadata("design:type", Boolean)
], FeedsStore.prototype, "hasMoreEvents", void 0);
__decorate([
    action,
    __metadata("design:type", Object)
], FeedsStore.prototype, "loadNextPage", void 0);
__decorate([
    action,
    __metadata("design:type", Object)
], FeedsStore.prototype, "refresh", void 0);
