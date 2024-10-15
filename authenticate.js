// authenticate.js
module.exports = function (req, res, next) {
    // 假设你已经验证了用户并将其信息存储在req.user中
    if (req.user) {
        next();
    } else {
        res.status(401).send('未授权');
    }
}