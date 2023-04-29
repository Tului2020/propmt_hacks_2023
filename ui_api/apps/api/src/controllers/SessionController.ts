import { Body, JsonController, Post } from 'routing-controllers';
import RedisService from '../services/RedisService';
import { SendMessageBody } from '../helpers/validators';

@JsonController('/session')
export default class SessionController {
  private redisService = new RedisService();

  @Post('/message')
  public async sendMessage(@Body() { role, newMessage }: SendMessageBody): Promise<string> {
    const conversationHistory = await this.redisService.addToChatHistory(role, newMessage);
    console.log(conversationHistory);
    const responseContent = 'NOTE: ADD API CALL HERE!!!';
    this.redisService.addToChatHistory('system', responseContent);
    return responseContent;
  }
}
