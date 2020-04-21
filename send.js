
const sendResponse = async function(req, res, next) {
    res.status(res.statusCode || 200);
    const responseData = {
        data: res.data,
        warnings: res.warnings && res.warnings.length ? res.warnings : void 0,
        status: res.statusCode || 200,
        success: true
    };
    if(res.accessToken) responseData.accessToken = res.accessToken;
    if(res.refreshToken) responseData.refreshToken = res.refreshToken;
    res.json(responseData);
    return;
};

module.exports = sendResponse;