"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheService = exports.CacheService = void 0;
const redis_1 = require("redis");
const config_1 = require("../../config");
class CacheService {
    client;
    constructor() {
        this.client = (0, redis_1.createClient)({ url: config_1.REDIS_URI });
    }
    async connectRedis() {
        try {
            await this.client.connect();
            console.log('Connected to Redis');
        }
        catch (err) {
            console.error('Error connecting to Redis:', err);
        }
    }
    async set(key, value, ttlSeconds) {
        const data = typeof value === 'object' ? JSON.stringify(value) : String(value);
        if (ttlSeconds) {
            await this.client.set(key, data, { EX: ttlSeconds });
        }
        else {
            await this.client.set(key, data);
        }
    }
    async get(key) {
        const data = await this.client.get(key);
        if (!data)
            return null;
        try {
            return JSON.parse(data);
        }
        catch {
            return data;
        }
    }
    async del(...keys) {
        return await this.client.del(keys);
    }
    async exists(key) {
        const count = await this.client.exists(key);
        return count > 0;
    }
    async expire(key, seconds) {
        return await this.client.expire(key, seconds);
    }
    async ttl(key) {
        return await this.client.ttl(key);
    }
    async incr(key) {
        return await this.client.incr(key);
    }
    async decr(key) {
        return await this.client.decr(key);
    }
    async flushAll() {
        await this.client.flushAll();
    }
}
exports.CacheService = CacheService;
exports.cacheService = new CacheService();
