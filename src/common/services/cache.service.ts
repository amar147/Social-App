import {createClient, RedisClientType} from 'redis'
import { REDIS_URI } from '../../config'



export class CacheService {
    private readonly client : RedisClientType
    constructor() {
        this.client=createClient({url:REDIS_URI})
    }
    async connectRedis() {
        try{
            await this.client.connect()
            console.log('Connected to Redis')
        }catch(err){
            console.error('Error connecting to Redis:', err)
        }
    }
    async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    const data = typeof value === 'object' ? JSON.stringify(value) : String(value);
    if (ttlSeconds) {
        await this.client.set(key, data, { EX: ttlSeconds });
    } else {
        await this.client.set(key, data);
    }
}

  // Get value w y3ml parse lw kan JSON
    async get<T = string>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        if (!data) return null;

        try {
            return JSON.parse(data) as T;
        } catch {
            return data as unknown as T;
    }
}

  // Delete key aw aktar
    async del(...keys: string[]): Promise<number> {
        return await this.client.del(keys);
}

  // Check if key exists
    async exists(key: string): Promise<boolean> {
        const count = await this.client.exists(key);
        return count > 0;

    }
  // Set TTL le key mawgod
    async expire(key: string, seconds: number) {
        return await this.client.expire(key, seconds);
}

  // Get remaining TTL
    async ttl(key: string): Promise<number> {
        return await this.client.ttl(key);
}
    async incr(key: string): Promise<number> {
        return await this.client.incr(key);
}

    async decr(key: string): Promise<number> {
        return await this.client.decr(key);
}
    async flushAll(): Promise<void> {
        await this.client.flushAll();
}
}

export const cacheService = new CacheService();