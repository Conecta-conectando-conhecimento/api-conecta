"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAreasEntity = void 0;
// userAreasEntity.ts
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const InterestArea_1 = require("./InterestArea");
let UserAreasEntity = class UserAreasEntity {
};
exports.UserAreasEntity = UserAreasEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], UserAreasEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_1.UserEntity)
], UserAreasEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], UserAreasEntity.prototype, "area_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InterestArea_1.InterestAreaEntity),
    (0, typeorm_1.JoinColumn)({ name: 'area_id' }),
    __metadata("design:type", InterestArea_1.InterestAreaEntity)
], UserAreasEntity.prototype, "interestArea", void 0);
exports.UserAreasEntity = UserAreasEntity = __decorate([
    (0, typeorm_1.Entity)('User_Areas')
], UserAreasEntity);
