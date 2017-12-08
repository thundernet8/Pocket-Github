import { AppRegistry } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import * as Storage from "./utils/Storage";
import GlobalStore from "./store/GlobalStore";
import EntryRouter from "./screens";

export default async function startup() {
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
    // const icons = await Promise.all([
    //     Icon.getImageSource("logo-rss", 30),
    //     Icon.getImageSource("md-information-circle", 30),
    //     Icon.getImageSource("md-git-pull-request", 30)
    // ]);

    // 启动App
    AppRegistry.registerComponent("PocketGithub", () => EntryRouter);
}
