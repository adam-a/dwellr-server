"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseFetch = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const baseFetch = async (url) => {
    const response = await (0, node_fetch_1.default)(url);
    return response.json();
};
exports.baseFetch = baseFetch;
