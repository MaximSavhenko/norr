import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class UserDto {
  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  @MinLength(6,{message: 'Password must be 6 characters'})
  password?: string
}