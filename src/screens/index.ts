import { Navigation } from "react-native-navigation";
import Screen from "../data/enum/Screen";
import WelcomeScreen from "./Welcome";
import LoginScreen from "./Login";
import FeedsTabScreen from "./Home/FeedsTab";
import IssuesTabScreen from "./Home/IssuesTab";
import PullRequestsTabScreen from "./Home/PRsTab";

export default function registerScreens() {
    Navigation.registerComponent(Screen.WELCOME, () => WelcomeScreen);
    Navigation.registerComponent(Screen.LOGIN, () => LoginScreen);
    Navigation.registerComponent(Screen.HOMEFeedsTab, () => FeedsTabScreen);
    Navigation.registerComponent(Screen.HOMEIssuesTab, () => IssuesTabScreen);
    Navigation.registerComponent(
        Screen.HOMEPRsTab,
        () => PullRequestsTabScreen
    );
}
