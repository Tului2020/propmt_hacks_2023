/* eslint-disable max-len */
import { Body, Get, JsonController, Post, QueryParam } from 'routing-controllers';
import RedisService from '../services/RedisService';
import { SendMessageBody } from '../helpers/validators';
import AIService from '../services/AIService';
import { Role } from '../helpers/types';

@JsonController('/session')
export default class SessionController {
  private redisService = new RedisService();
  private aiService = new AIService();

  @Post('/message')
  public async sendMessage(@Body() { role, newMessage, name }: SendMessageBody): Promise<string> {
    const intervene = await this.aiService.interventionCheck({ role, content: newMessage, name });
    const conversationHistory = await this.redisService.addToChatHistory(role, name, newMessage, intervene);
    const responseContent = await this.aiService.relaySendMessage(conversationHistory);
    this.redisService.addToChatHistory(Role.assistant, name, responseContent, false);
    return responseContent;
  }

  @Get('/dashboard')
  public async getDashboardInfo(@QueryParam('name') name: string): Promise<any> {
    const conversationHistory = await this.redisService.getChatHistory(name);
    const interventionCount = conversationHistory.reduce((acc, { role, intervention }) => acc + +(intervention && role === 'user'), 0);
    if (!conversationHistory.length) return [];

    return Promise.all([
      this.aiService.getChatSummary(conversationHistory),
      this.aiService.getRiskAssessment(conversationHistory),
      this.aiService.getEmotionClassification(conversationHistory),
      interventionCount,
    ]);
  }
}
