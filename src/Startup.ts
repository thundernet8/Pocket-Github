import { AppRegistry } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import * as Storage from "./utils/Storage";
import GlobalStore from "./store/GlobalStore";
import RootScreen from "./screens";

export default async function startup() {
    // 初始化本地存储
    Storage.init();

    // 忽略一些warning
    // console.ignoredYellowBox = ["Remote debugger"];
    console.disableYellowBox = true;

    // 实例化Base Store
    GlobalStore.getInstance();

    // 准备图标资源
    // const icons = await Promise.all([
    //     Icon.getImageSource("logo-rss", 30),
    //     Icon.getImageSource("md-information-circle", 30),
    //     Icon.getImageSource("md-git-pull-request", 30)
    // ]);

    // 启动App
    AppRegistry.registerComponent("PocketGithub", () => RootScreen);
}
