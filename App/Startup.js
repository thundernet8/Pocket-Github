var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import * as Storage from "./utils/Storage";
import RegisterScreens from "./screens";
import Screen from "./data/enum/Screen";
import GlobalStore from "./store/GlobalStore";
export default function startup() {
    return __awaiter(this, void 0, void 0, function* () {
        RegisterScreens();
        Storage.init();
        console.disableYellowBox = true;
        const globalStore = GlobalStore.getInstance();
        globalStore.checkLogin().then(result => {
            if (result) {
                globalStore.signIn();
            }
        });
        const icons = yield Promise.all([
            Icon.getImageSource("logo-rss", 30),
            Icon.getImageSource("md-information-circle", 30),
            Icon.getImageSource("md-git-pull-request", 30)
        ]);
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: "Feeds",
                    screen: Screen.HOMEFeedsTab,
                    icon: icons[0],
                    title: "Feeds",
                    navigatorButtons: {
                        leftButtons: [
                            {
                                id: "sideMenu"
                            }
                        ]
                    }
                },
                {
                    label: "Issues",
                    screen: Screen.HOMEIssuesTab,
                    icon: icons[1],
                    title: "Issues",
                    navigatorButtons: {
                        leftButtons: [
                            {
                                id: "sideMenu"
                            }
                        ]
                    }
                },
                {
                    label: "Pull Requests",
                    screen: Screen.HOMEPRsTab,
                    icon: icons[2],
                    title: "Pull Requests",
                    navigatorButtons: {
                        leftButtons: [
                            {
                                id: "sideMenu"
                            }
                        ]
                    }
                }
            ],
            drawer: {
                left: {
                    screen: Screen.LeftMenu,
                    passProps: {}
                },
                disableOpenGesture: true
            }
        });
    });
}
