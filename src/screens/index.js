"use strict";
exports.__esModule = true;
var react_native_navigation_1 = require("react-native-navigation");
var Screen_1 = require("../data/enum/Screen");
var Login_1 = require("./Login");
var FeedsTab_1 = require("./Home/FeedsTab");
var IssuesTab_1 = require("./Home/IssuesTab");
var PRsTab_1 = require("./Home/PRsTab");
function registerScreens() {
    react_native_navigation_1.Navigation.registerComponent(Screen_1["default"].LOGIN, function () { return Login_1["default"]; });
    react_native_navigation_1.Navigation.registerComponent(Screen_1["default"].HOMEFeedsTab, function () { return FeedsTab_1["default"]; });
    react_native_navigation_1.Navigation.registerComponent(Screen_1["default"].HOMEIssuesTab, function () { return IssuesTab_1["default"]; });
    react_native_navigation_1.Navigation.registerComponent(Screen_1["default"].HOMEPRsTab, function () { return PRsTab_1["default"]; });
}
exports["default"] = registerScreens;
