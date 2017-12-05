"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var mobx_1 = require("mobx");
var AbstractScreenStore_1 = require("./AbstractScreenStore");
var GlobalStore_1 = require("./GlobalStore");
var Request_1 = require("../utils/Request");
var FeedsStore = /** @class */ (function (_super) {
    __extends(FeedsStore, _super);
    function FeedsStore() {
        var _this = _super.call(this) || this;
        _this.loading = false;
        /**
         * 收到的事件
         */
        _this.events = [];
        _this.page = 1;
        _this.pageSize = 2;
        _this.hasMoreEvents = true;
        return _this;
    }
    FeedsStore.getInstance = function () {
        if (!FeedsStore.instance) {
            FeedsStore.instance = new FeedsStore();
        }
        return FeedsStore.instance;
    };
    // @override
    FeedsStore.prototype.loadData = function () {
        var _this = this;
        this.loading = true;
        var globalStore = GlobalStore_1["default"].getInstance();
        globalStore
            .mePromise()
            .then(function (me) {
            return Request_1["default"].RestGet("/users/" + me.login + "/received_events", { page: _this.page });
        })
            .then(function (resp) {
            _this.events = resp;
            _this.dataLoaded = true;
            if (!resp || resp.length === 0) {
                _this.hasMoreEvents = false;
            }
        })["catch"](function (error) {
            console.log(error);
        })["finally"](function () {
            _this.loading = false;
        });
    };
    __decorate([
        mobx_1.observable
    ], FeedsStore.prototype, "loading");
    __decorate([
        mobx_1.observable
    ], FeedsStore.prototype, "events");
    __decorate([
        mobx_1.observable
    ], FeedsStore.prototype, "page");
    __decorate([
        mobx_1.observable
    ], FeedsStore.prototype, "pageSize");
    __decorate([
        mobx_1.observable
    ], FeedsStore.prototype, "hasMoreEvents");
    return FeedsStore;
}(AbstractScreenStore_1["default"]));
exports["default"] = FeedsStore;
