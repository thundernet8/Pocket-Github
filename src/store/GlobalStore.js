"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var mobx_1 = require("mobx");
var react_native_1 = require("react-native");
var apollo_client_1 = require("apollo-client");
var apollo_link_http_1 = require("apollo-link-http");
var apollo_link_context_1 = require("apollo-link-context");
var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
var graphql_tag_1 = require("graphql-tag");
var Keychain = require("react-native-keychain");
var react_native_navigation_1 = require("react-native-navigation");
var Screen_1 = require("../data/enum/Screen");
var meQuery_graphql_1 = require("../data/graphQL/meQuery.graphql");
var FeedsStore_1 = require("../store/FeedsStore");
require("../utils/Promise");
var GlobalStore = /** @class */ (function () {
    function GlobalStore() {
        var _this = this;
        /**
         * Apollo Client
         */
        this.initApollo = function () {
            var password = (_this.credential || {}).password;
            var authLink = apollo_link_context_1.setContext(function (_, _a) {
                var headers = _a.headers;
                // return the headers to the context so httpLink can read them
                return {
                    headers: __assign({}, headers, { authorization: password ? "Bearer " + password : null })
                };
            });
            var httpLink = new apollo_link_http_1.HttpLink({
                uri: "https://api.github.com/graphql",
                credentials: "same-origin"
            });
            var client = new apollo_client_1.ApolloClient({
                link: authLink.concat(httpLink),
                cache: new apollo_cache_inmemory_1.InMemoryCache()
            });
            _this.apollo = client;
        };
        this.getApollo = function () {
            return _this.apollo;
        };
        this.setCredential = function (credential) {
            _this.credential = credential;
            _this.initApollo();
        };
        this.getToken = function () {
            return _this.credential.password;
        };
        this.checkLogin = function () {
            return Keychain.getGenericPassword(GlobalStore.appName)
                .then(function (credentials) {
                if (typeof credentials !== "boolean") {
                    _this.setCredential(credentials);
                    return true;
                }
                else {
                    throw new Error("Credentials has not been set.");
                }
            })["catch"](function (error) {
                console.warn("Keychain couldn't be accessed! Maybe no value set?", error);
                return false;
            });
        };
        this.isDoingLogin = false;
        this.username = "";
        this.password = ""; // Github密码或Access Token
        this.inputUsername = function (username) {
            console.log(username);
            _this.username = username;
        };
        this.inputPassword = function (password) {
            _this.password = password;
        };
        this.signIn = function () {
            var _a = _this, username = _a.username, password = _a.password;
            if (password) {
                Keychain.setGenericPassword(username, password, GlobalStore.appName);
                _this.setCredential({
                    username: username,
                    password: password,
                    service: GlobalStore.appName
                });
            }
            // TODO login
            _this.isDoingLogin = true;
            return _this.apollo
                .query({
                query: graphql_tag_1["default"](meQuery_graphql_1["default"]),
                variables: {
                    avatar_size: 64
                }
            })
                .then(function (data) {
                console.log(data);
                var viewer = data.data.viewer;
                _this.me = viewer;
                return viewer;
            })["catch"](function (error) {
                console.warn(error);
                throw error;
            })["finally"](function () {
                _this.isDoingLogin = false;
            });
        };
        this.signOut = function () {
            _this.setCredential(null);
        };
        /**
         * Modal show login screen
         */
        this.showLoginScreen = function () {
            react_native_navigation_1.Navigation.showModal({
                screen: Screen_1["default"].LOGIN,
                title: "Login",
                passProps: {},
                navigatorStyle: { navBarHidden: true },
                animationType: "slide-up"
            });
        };
        /**
         * AppState listener
         */
        this.appStateActive = true;
        this.handleAppStateChange = function () {
            _this.appStateActive = react_native_1.AppState.currentState === "active";
        };
        /**
         * Screen and Screen visibility
         */
        this.currentScreen = Screen_1["default"].HOME;
        this.registerListener = function () {
            _this.screenVisibilityListener = new react_native_navigation_1.ScreenVisibilityListener({
                didAppear: function (_a) {
                    var screen = _a.screen, startTime = _a.startTime, endTime = _a.endTime, commandType = _a.commandType;
                    console.log("screenVisibility", "Screen " + screen + " displayed in " + (endTime -
                        startTime) + " millis after [" + commandType + "]");
                    if (commandType === "InitialScreen" && !_this.isLogged) {
                        _this.showLoginScreen();
                    }
                    else {
                        switch (screen) {
                            case Screen_1["default"].HOMEFeedsTab:
                                FeedsStore_1["default"].getInstance().maybeInit();
                                break;
                            // TODO more
                            default:
                                console.log("default");
                        }
                    }
                }
            });
            _this.screenVisibilityListener.register();
            react_native_1.AppState.addEventListener("change", _this.handleAppStateChange);
        };
        this.unregisterListener = function () {
            if (_this.screenVisibilityListener) {
                _this.screenVisibilityListener.unregister();
                _this.screenVisibilityListener = null;
            }
            react_native_1.AppState.removeEventListener("change", _this.handleAppStateChange);
        };
        this.initApollo();
        this.registerListener();
    }
    GlobalStore.getInstance = function () {
        if (!GlobalStore.instance) {
            GlobalStore.instance = new GlobalStore();
        }
        return GlobalStore.instance;
    };
    Object.defineProperty(GlobalStore.prototype, "isLogged", {
        get: function () {
            var credential = this.credential;
            return credential && credential.password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalStore.prototype, "loginBtnDisabled", {
        get: function () {
            var _a = this, isDoingLogin = _a.isDoingLogin, username = _a.username, password = _a.password;
            return isDoingLogin || !username || !password;
        },
        enumerable: true,
        configurable: true
    });
    GlobalStore.prototype.mePromise = function () {
        if (this.me) {
            return Promise.resolve(this.me);
        }
        return this.signIn();
    };
    GlobalStore.appName = "PocketGithub";
    GlobalStore.dispose = function () {
        if (GlobalStore.instance) {
            GlobalStore.instance.unregisterListener();
            GlobalStore.instance = null;
        }
    };
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "credential");
    __decorate([
        mobx_1.action
    ], GlobalStore.prototype, "setCredential");
    __decorate([
        mobx_1.computed
    ], GlobalStore.prototype, "isLogged");
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "isDoingLogin");
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "username");
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "password");
    __decorate([
        mobx_1.computed
    ], GlobalStore.prototype, "loginBtnDisabled");
    __decorate([
        mobx_1.action
    ], GlobalStore.prototype, "inputUsername");
    __decorate([
        mobx_1.action
    ], GlobalStore.prototype, "inputPassword");
    __decorate([
        mobx_1.action
    ], GlobalStore.prototype, "signIn");
    __decorate([
        mobx_1.action
    ], GlobalStore.prototype, "signOut");
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "me");
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "appStateActive");
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "currentScreen");
    return GlobalStore;
}());
exports["default"] = GlobalStore;
