import { createClient } from 'redis';
import { Service } from 'typedi';
import env from '../env';
import { History } from '../types/types';

const redisClient = createClient(env.redis);
redisClient.on('connect', () => console.log('Redis connection established'));
redisClient.on('error', (e) => console.error('Redis connection FAILED', e));
redisClient.connect();

@Service()
export default class RedisService {
  private redisClient = redisClient;

  private async get(key: string): Promise<string> {
    return await this.redisClient.get(key);
  }

  private async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  private userKey(key: string): string {
    return `user_${key}`;
  }

  public async getChatHistory(key = 'kevin'): Promise<string> {
    return await this.get(this.userKey(key));
  }

  public async addToChatHistory(key = 'kevin', newMessage: History): Promise<void> {
    const cachedHistory = JSON.parse(await this.get(this.userKey(key)) || '[]');
    cachedHistory.push(newMessage);
    await this.set(key, JSON.stringify(cachedHistory));
  }

}