"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../../common/enum");
const hash_security_1 = require("../../common/security/hash.security");
const encryption_security_1 = require("../../common/security/encryption.security");
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return this.provider === enum_1.ProviderEnum.SYSTEM;
        }
    },
    phone: {
        type: String,
    },
    DOB: Date,
    confirmEmail: Date,
    image: String,
    coverImage: [String],
    gender: {
        type: String,
        enum: Object.values(enum_1.GenderEnum),
        default: enum_1.GenderEnum.MALE
    },
    role: {
        type: String,
        enum: Object.values(enum_1.RoleEnum),
        default: enum_1.RoleEnum.USER
    },
    provider: {
        type: String,
        enum: Object.values(enum_1.ProviderEnum),
        default: enum_1.ProviderEnum.SYSTEM
    },
    id: {
        type: String,
        default: function () {
            return new mongoose_1.default.Types.ObjectId().toString();
        }
    },
    status: {
        type: Number,
        enum: enum_1.AccStatusEnum,
        default: enum_1.AccStatusEnum.ACTIVE
    },
    changeStatusAt: Date,
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    strict: true,
    strictQuery: true,
    autoIndex: true
});
userSchema.virtual('username')
    .set(function (value) {
    if (!value)
        return;
    const parts = value.trim().split(/\s+/);
    this.firstName = parts[0] || '';
    this.lastName = parts.slice(1).join(' ');
})
    .get(function () {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});
userSchema.pre('save', async function () {
    if (this.isModified("password")) {
        this.password = await (0, hash_security_1.hash)(this.password);
    }
    if (this.isModified("phone")) {
        this.phone = await (0, encryption_security_1.encryption)(this.phone);
    }
});
userSchema.post('save', async function (doc) {
});
exports.UserModel = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
