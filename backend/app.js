"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: './backend/config/config.env'
});
var app = (0, express_1.default)();
app.listen(process.env.PORT, function () {
    console.log("Server running on ".concat(process.env.PORT, " in ").concat(process.env.NODE_ENV));
});
