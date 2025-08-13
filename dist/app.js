"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Errors_1 = require("./app/Errors/Errors");
const routes_1 = require("./app/routes/routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.routes);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use(async (err, req, res, next) => {
    if (err) {
        res.status(404).json({
            "message": err.message,
            "success": false,
            validationError: Errors_1.validationError
        });
    }
});
exports.default = app;
