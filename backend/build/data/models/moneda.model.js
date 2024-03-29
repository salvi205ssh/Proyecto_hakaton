"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monedaPojo = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let monedaPojo = class monedaPojo extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        type: sequelize_1.STRING,
        field: "cripto_id",
    })
], monedaPojo.prototype, "cripto_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.STRING,
        field: "cripto_name",
    })
], monedaPojo.prototype, "cripto_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.NUMBER,
        field: "value",
    })
], monedaPojo.prototype, "value", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.STRING,
        field: "icon",
    })
], monedaPojo.prototype, "icon", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.STRING,
        field: "asset",
    })
], monedaPojo.prototype, "asset", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.NUMBER,
        field: "stock",
    })
], monedaPojo.prototype, "stock", void 0);
monedaPojo = __decorate([
    (0, sequelize_typescript_1.Table)({
        freezeTableName: true,
        schema: "public",
        tableName: "monedas",
        createdAt: false,
        updatedAt: false,
    })
], monedaPojo);
exports.monedaPojo = monedaPojo;
//# sourceMappingURL=moneda.model.js.map