import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TagsService } from './tags.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('user/tags')
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@HttpCode(200)
	@Auth()
	@Get()
	async findAll(@CurrentUser('id') userId: string) {
		return this.tagsService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Post()
	async create(
		@Body() createTagDto: CreateTagDto,
		@CurrentUser('id') userId: string
	) {
		return this.tagsService.create(createTagDto, userId)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	@HttpCode(200)
	async update(
		@Param('id') id: string,
		@Body() updateTagDto: UpdateTagDto,
		@CurrentUser('id') userId: string
	) {
		return this.tagsService.update(userId, id, updateTagDto)
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.tagsService.delete(id)
	}
}
