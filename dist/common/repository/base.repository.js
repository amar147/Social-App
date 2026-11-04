"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRepository = void 0;
class DatabaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return await this.model.create(data);
    }
    async insertMany(data) {
        return (await this.model.insertMany(data));
    }
    async findById(id, projection, options) {
        return await this.model.findById(id, projection, options);
    }
    async findOne(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    async find(filter = {}, projection, options) {
        return await this.model.find(filter, projection, options);
    }
    async findByIdAndUpdate(id, update, options = { new: true, runValidators: true }) {
        return await this.model.findByIdAndUpdate(id, update, options);
    }
    async findOneAndUpdate(filter, update, options = { new: true, runValidators: true }) {
        return await this.model.findOneAndUpdate(filter, update, options);
    }
    async updateOne(filter, update, options) {
        return await this.model.updateOne(filter, update, options);
    }
    async updateMany(filter, update, options) {
        return await this.model.updateMany(filter, update, options);
    }
    async findByIdAndDelete(id, options) {
        return await this.model.findByIdAndDelete(id, options);
    }
    async findOneAndDelete(filter, options) {
        return await this.model.findOneAndDelete(filter, options);
    }
    async deleteOne(filter, options) {
        return await this.model.deleteOne(filter, options);
    }
    async deleteMany(filter, options) {
        return await this.model.deleteMany(filter, options);
    }
    async exists(filter) {
        return await this.model.exists(filter);
    }
    async countDocuments(filter = {}) {
        return await this.model.countDocuments(filter);
    }
    async paginate(filter = {}, page = 1, limit = 10, projection, options) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.model.find(filter, projection, { ...options, skip, limit }),
            this.model.countDocuments(filter),
        ]);
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
        };
    }
}
exports.DatabaseRepository = DatabaseRepository;
