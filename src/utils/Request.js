"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var qs_1 = require("qs");
var GlobalStore_1 = require("../store/GlobalStore");
/**
 * For Github v3 REST API (V4 GraphQL API不支持Event/Feed等数据资源)
 *
 * @param httpMethod
 * @param path
 * @param params
 * @param contentType
 */
function Request(httpMethod, path, params, contentType) {
    if (contentType === void 0) { contentType = "text/plain"; }
    path = path.startsWith("/") ? path.substring(1) : path;
    var headers = {
        Accept: "*/*",
        Authorization: "Bearer " + GlobalStore_1["default"].getInstance().getToken(),
        "Content-type": contentType
    };
    var ax = axios_1["default"].create({
        baseURL: "https://api.github.com/",
        timeout: 60000,
        withCredentials: true,
        headers: headers
    });
    return ax
        .request({
        url: path,
        method: httpMethod,
        params: httpMethod.toLowerCase() === "get" ? params : null,
        data: httpMethod.toLowerCase() !== "get"
            ? headers["Content-type"] ===
                "application/x-www-form-urlencoded"
                ? qs_1["default"].stringify(params)
                : params
            : null,
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        }
    })
        .then(function (resp) {
        if (__DEV__) {
            console.log(resp);
        }
        if (resp.status >= 400) {
            throw new Error(resp.data);
        }
        return resp.data;
    })["catch"](function (error) {
        if (__DEV__) {
            console.log(error);
        }
        throw error;
    });
}
function RestGet(path, params) {
    return Request("get", path, params);
}
function RestPost(path, params) {
    return Request("post", path, params);
}
function RestDel(path, params) {
    return Request("delete", path, params);
}
function RestPut(path, params) {
    return Request("put", path, params);
}
exports["default"] = {
    RestGet: RestGet,
    RestPost: RestPost,
    RestDel: RestDel,
    RestPut: RestPut
};
