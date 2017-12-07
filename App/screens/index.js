import { Navigation } from "react-native-navigation";
import Screen from "../data/enum/Screen";
import LoginScreen from "./Login";
import FeedsTabScreen from "./Home/FeedsTab";
import IssuesTabScreen from "./Home/IssuesTab";
import PullRequestsTabScreen from "./Home/PRsTab";
import LeftMenuScreen from "./LeftMenu";
export default function registerScreens() {
    Navigation.registerComponent(Screen.LOGIN, () => LoginScreen);
    Navigation.registerComponent(Screen.HOMEFeedsTab, () => FeedsTabScreen);
    Navigation.registerComponent(Screen.HOMEIssuesTab, () => IssuesTabScreen);
    Navigation.registerComponent(Screen.HOMEPRsTab, () => PullRequestsTabScreen);
    Navigation.registerComponent(Screen.LeftMenu, () => LeftMenuScreen);
}
