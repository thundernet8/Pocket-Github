import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import * as Storage from "./utils/Storage";
import RegisterScreens from "./screens";
import Screen from "./data/enum/Screen";
import GlobalStore from "./store/GlobalStore";

export default async function startup() {
    // 注册视图
    RegisterScreens();

    // 初始化本地存储
    Storage.init();

    // 忽略一些warning
    // console.ignoredYellowBox = ["Remote debugger"];
    console.disableYellowBox = true;

    // 实例化Base Store
    const globalStore = GlobalStore.getInstance();
    globalStore.checkLogin().then(result => {
        if (result) {
            // 已有本地credentials直接请求API获取基本信息
            globalStore.signIn();
        }
    });

    // 准备图标资源
    const icons = await Promise.all([
        Icon.getImageSource("logo-rss", 30),
        Icon.getImageSource("md-information-circle", 30),
        Icon.getImageSource("md-git-pull-request", 30)
    ]);

    // 启动App
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: "Feeds",
                screen: Screen.HOMEFeedsTab,
                icon: icons[0], // require("./assets/images/home_tab_feeds.png"),
                // selectedIcon: require("./assets/images/home_tab_feeds_selected.png"), // iOS only
                title: "Feeds"
            },
            {
                label: "Issues",
                screen: Screen.HOMEIssuesTab,
                icon: icons[1], // require("./assets/images/home_tab_issues.png"),
                // selectedIcon: require("./assets/images/home_tab_issues_selected.png"), // iOS only
                title: "Issues"
            },
            {
                label: "Pull Requests",
                screen: Screen.HOMEPRsTab,
                icon: icons[2], // require("./assets/images/home_tab_prs.png"),
                // selectedIcon: require("./assets/images/home_tab_prs_selected.png"), // iOS only
                title: "Pull Requests"
            }
        ]
        // appStyle: {
        //     tabBarHidden: true
        // }
    });
}
