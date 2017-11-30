import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";
export function init() {
    const sync = {};
    const storage = new Storage({
        size: 10000,
        storageBackend: AsyncStorage,
        defaultExpires: 0,
        enableCache: true,
        sync
    });
    global.storage = storage;
}
