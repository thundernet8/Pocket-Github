var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observable, action } from "mobx";
export default class GlobalStore {
    constructor() {
        this.setCredential = (credential) => {
            this.credential = credential;
        };
        this.getToken = () => {
            return this.credential.password;
        };
        this.signIn = (username, password) => {
        };
        this.signOut = () => {
            this.setCredential(null);
        };
    }
    static getInstance() {
        if (GlobalStore.instance) {
            return GlobalStore.instance;
        }
        return new GlobalStore();
    }
}
__decorate([
    observable,
    __metadata("design:type", Object)
], GlobalStore.prototype, "credential", void 0);
__decorate([
    action,
    __metadata("design:type", Object)
], GlobalStore.prototype, "setCredential", void 0);
__decorate([
    action,
    __metadata("design:type", Object)
], GlobalStore.prototype, "signIn", void 0);
__decorate([
    action,
    __metadata("design:type", Object)
], GlobalStore.prototype, "signOut", void 0);
