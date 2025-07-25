import { IsOptional, IsString } from 'class-validator'

export class CreateTopicDto {
	@IsString()
	title: string

  @IsString()
  @IsOptional()
  description?: string
}
