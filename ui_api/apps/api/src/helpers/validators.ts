import { IsOptional, IsString } from 'class-validator';

export class SendMessageBody {
  @IsOptional()
  @IsString()
  role: string;

  @IsString()
  public newMessage: string;
}
