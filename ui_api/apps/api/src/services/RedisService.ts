import { createClient } from 'redis';
import { Service } from 'typedi';
import env from '../env';
import { History, InterventionHistory, Role } from '../helpers/types';
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

  public async getChatHistory(name: string): Promise<History[]> {
    const key = this.userKey(name);

    return JSON.parse(await this.get(key) || '[]');
  }

  public async addToChatHistory(role: Role, name: string, newMessage: string, intervention: boolean): Promise<History[]> {
    const key = this.userKey(name);

    let cachedHistory = JSON.parse(await this.get(key) || '[]') as InterventionHistory[];
    cachedHistory.push({ role, content: newMessage, name, intervention });
    cachedHistory = cachedHistory.filter(({ role }) => role !== 'system');

    await this.set(key, JSON.stringify(cachedHistory));

    cachedHistory.unshift(systemMessage);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return cachedHistory.map(({ intervention, ...history }) => history);
  }

}