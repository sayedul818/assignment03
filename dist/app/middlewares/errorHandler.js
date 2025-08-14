"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    const status = err.status || 500;
    res.status(status).json({
        message: 'Validation failed',
        success: false,
        error: err
    });
};
exports.errorHandler = errorHandler;
