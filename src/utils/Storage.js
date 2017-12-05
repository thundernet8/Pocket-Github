"use strict";
exports.__esModule = true;
var react_native_storage_1 = require("react-native-storage");
var react_native_1 = require("react-native");
function init() {
    var sync = {};
    var storage = new react_native_storage_1["default"]({
        // 最大容量，默认值1000条数据循环存储
        size: 10000,
        // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
        // 如果不指定则数据只会保存在内存中，重启后即丢失
        storageBackend: react_native_1.AsyncStorage,
        // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
        defaultExpires: 0,
        // 读写时在内存中缓存数据。默认启用。
        enableCache: true,
        // 如果storage中没有相应数据，或数据已过期，
        // 则会调用相应的sync方法，无缝返回最新数据。
        // sync方法的具体说明会在后文提到
        // 你可以在构造函数这里就写好sync的方法
        // 或是在任何时候，直接对storage.sync进行赋值修改
        // 或是写到另一个文件里，这里require引入
        sync: sync
    });
    global.storage = storage;
}
exports.init = init;