export default abstract class AbstractScreenStore {
    protected dataLoaded: boolean = false;

    public maybeInit() {
        if (!this.dataLoaded) {
            this.loadData();
        }
    }

    protected abstract loadData(): void;
}
