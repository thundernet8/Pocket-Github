export default class AbstractScreenStore {
    constructor() {
        this.dataLoaded = false;
    }
    maybeInit() {
        if (!this.dataLoaded) {
            this.loadData();
        }
    }
}
