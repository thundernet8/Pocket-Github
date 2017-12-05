"use strict";
exports.__esModule = true;
var AbstractScreenStore = /** @class */ (function () {
    function AbstractScreenStore() {
        this.dataLoaded = false;
    }
    AbstractScreenStore.prototype.maybeInit = function () {
        if (!this.dataLoaded) {
            this.loadData();
        }
    };
    return AbstractScreenStore;
}());
exports["default"] = AbstractScreenStore;
