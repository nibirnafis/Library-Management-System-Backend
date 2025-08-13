"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const Book_controler_1 = require("../modules/Book/Book.controler");
const Borrow_controler_1 = require("../modules/Borrow/Borrow.controler");
exports.routes = (0, express_1.Router)();
exports.routes.use('/books', Book_controler_1.bookRoutes);
exports.routes.use('/borrow', Borrow_controler_1.borrowRoutes);
