"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usePersistStorage_1 = __importDefault(require("./usePersistStorage"));
__export(require("./usePersistStorage"));
var createMigrate_1 = require("./createMigrate");
exports.createMigrate = createMigrate_1.default;
var defaultOptions_1 = require("./defaultOptions");
exports.setPersistStorageDefaults = defaultOptions_1.setPersistStorageDefaults;
exports.default = usePersistStorage_1.default;
