import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Put
} from '@nestjs/common'
import { TopicsService } from './topics.service'
import { CreateTopicDto } from './dto/create-topic.dto'
import { UpdateTopicDto } from './dto/update-topic.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('user/topics')
export class TopicsController {
	constructor(private readonly topicsService: TopicsService) {}

	@Get('/progress/:id')
	@Auth()
	async getProgress(@Param('id') id: string) {
		return this.topicsService.getProgress(id)
	}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.topicsService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(
		@Body() createTopicDto: CreateTopicDto,
		@CurrentUser('id') userId: string
	) {
		return this.topicsService.create(createTopicDto, userId)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@Auth()
	@HttpCode(200)
	async update(
		@Param('id') id: string,
		@CurrentUser('id') userId: string,
		@Body() updateTopicDto: UpdateTopicDto
	) {
		return this.topicsService.update(id, userId, updateTopicDto)
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.topicsService.delete(id, userId)
	}
}
