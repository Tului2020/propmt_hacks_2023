import { JsonController, Get } from 'routing-controllers';

@JsonController('/session')
export default class SessionController {
  @Get('/account')
  public async fetchAccount(): Promise<string> {
    return 'works!!!';
  }
}
