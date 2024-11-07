"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const environment_1 = __importDefault(require("./environment"));
const port = parseInt(environment_1.default.PORT);
app_1.default.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
