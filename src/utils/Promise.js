Promise.prototype["finally"] = function (finaliser) {
    return this.then(function (result) {
        finaliser();
        return result;
    }, function (reason) {
        finaliser();
        throw new Error(reason);
    });
};
