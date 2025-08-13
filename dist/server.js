"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const console_1 = require("console");
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
const startServer = async () => {
    try {
        await mongoose_1.default.connect(mongoURI);
        app_1.default.listen(port, () => {
            console.log(`This app is listining on port ${port}`);
        });
    }
    catch {
        console.log(console_1.error, "Connection Error");
    }
};
startServer();
