import { IsEnum, IsString } from 'class-validator';
import { Role } from './types';

export class SendMessageBody {
  @IsEnum(Role)
  public role: Role;

  @IsString()
  public newMessage: string;

  @IsString()
  public name: string;
}
