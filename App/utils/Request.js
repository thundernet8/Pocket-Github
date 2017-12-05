import axios from "axios";
import qs from "qs";
import GlobalStore from "../store/GlobalStore";
function Request(httpMethod, path, params, contentType = "text/plain") {
    path = path.startsWith("/") ? path.substring(1) : path;
    const headers = {
        Accept: "*/*",
        Authorization: "Bearer " + GlobalStore.getInstance().getToken(),
        "Content-type": contentType
    };
    const ax = axios.create({
        baseURL: "https://api.github.com/",
        timeout: 60000,
        withCredentials: true,
        headers
    });
    return ax
        .request({
        url: path,
        method: httpMethod,
        params: httpMethod.toLowerCase() === "get" ? params : null,
        data: httpMethod.toLowerCase() !== "get"
            ? headers["Content-type"] ===
                "application/x-www-form-urlencoded"
                ? qs.stringify(params)
                : params
            : null,
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        }
    })
        .then(resp => {
        if (__DEV__) {
            console.log(resp);
        }
        if (resp.status >= 400) {
            throw new Error(resp.data);
        }
        return resp.data;
    })
        .catch(error => {
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
export default {
    RestGet,
    RestPost,
    RestDel,
    RestPut
};
