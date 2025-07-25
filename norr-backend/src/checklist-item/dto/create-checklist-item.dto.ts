import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateChecklistItemDto {
	@IsString()
	content: string

	@Transform(({ value }) => value === 'true' || value === true)
	@IsBoolean()
	@IsOptional()
	done: boolean
}
