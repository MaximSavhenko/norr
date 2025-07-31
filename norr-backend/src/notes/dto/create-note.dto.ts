import { Prisma } from "@prisma/client";
import { IsArray, IsJSON, IsObject, IsOptional, IsString } from "class-validator";

export class CreateNoteDto {
  @IsObject()
  content: Prisma.InputJsonValue

  @IsString()
  topicId: string

  @IsArray()
  @IsOptional()
  tagIds?: string[]
}
