import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateNoteDto {
  @IsString()
  content: string

  @IsString()
  topicId: string

  @IsArray()
  @IsOptional()
  tagIds?: string[]
}
