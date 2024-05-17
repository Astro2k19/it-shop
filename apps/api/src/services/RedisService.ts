import { createClient } from 'redis';

export class RedisService {
    public static async init() {
        const redisClient = createClient();
        await redisClient.connect();
        return redisClient;
    }
}
