import { Body, JsonController, Post } from 'routing-controllers';
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
    const conversationHistory = await this.redisService.addToChatHistory(role, name, newMessage);
    const responseContent = await this.aiService.relaySendMessage(conversationHistory);
    this.redisService.addToChatHistory(Role.assistant, name, responseContent);
    this.aiService.relayInterventionCheck({ role, content: newMessage, name });
    return responseContent;
  }
}
