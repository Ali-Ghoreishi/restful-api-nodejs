exports.errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = []
    message.push(error.message);
    const data = error.data || {};
    res.status(status).json({ status: false, message, data });
};