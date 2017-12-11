import axios from "axios";
import qs from "qs";
import GlobalStore from "../store/GlobalStore";

/**
 * For Github v3 REST API (V4 GraphQL API不支持Event/Feed等数据资源)
 *
 * @param httpMethod
 * @param path
 * @param params
 * @param contentType
 */
function Request<T>(
    httpMethod: string,
    path: string,
    params: any,
    contentType: string = "text/plain"
): Promise<T> {
    path = path.startsWith("/") ? path.substring(1) : path;

    const headers: any = {
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
            data:
                httpMethod.toLowerCase() !== "get"
                    ? headers["Content-type"] ===
                      "application/x-www-form-urlencoded"
                      ? qs.stringify(params)
                      : params
                    : null,
            validateStatus: function(status) {
                return status >= 200 && status < 500;
            }
        })
        .then<T>(resp => {
            if (__DEV__) {
                // console.log(resp);
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

function RestGet<T>(path: string, params: any): Promise<T> {
    return Request("get", path, params);
}

function RestPost<T>(path: string, params: any): Promise<T> {
    return Request("post", path, params);
}

function RestDel<T>(path: string, params: any): Promise<T> {
    return Request("delete", path, params);
}

function RestPut<T>(path: string, params: any): Promise<T> {
    return Request("put", path, params);
}

export default {
    RestGet,
    RestPost,
    RestDel,
    RestPut
};
