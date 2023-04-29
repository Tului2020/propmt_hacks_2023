import { createClient } from 'redis';
import { Service } from 'typedi';
import env from '../env';
import { History, Role } from '../helpers/types';
import systemMessage from '../helpers/systemMessage';

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

  private userKey(name: string): string {
    return `${name}`;
  }

  public async addToChatHistory(role: Role, name: string, newMessage: string): Promise<History[]> {
    const key = this.userKey(name);

    let cachedHistory = JSON.parse(await this.get(key) || '[]') as History[];
    cachedHistory.push({ role, content: newMessage, name });
    cachedHistory = cachedHistory.filter(({ role }) => role !== 'system');

    await this.set(key, JSON.stringify(cachedHistory));

    cachedHistory.unshift(systemMessage);
    return cachedHistory;
  }

}