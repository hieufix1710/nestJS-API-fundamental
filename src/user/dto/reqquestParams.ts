import { IsNotEmpty, IsString } from 'class-validator';

export class GetMeDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
