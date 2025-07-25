import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	HttpCode
} from '@nestjs/common'
import { ChecklistItemService } from './checklist-item.service'
import { CreateChecklistItemDto } from './dto/create-checklist-item.dto'
import { UpdateChecklistItemDto } from './dto/update-checklist-item.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('user/topics/:topicId/checklist-item')
export class ChecklistItemController {
	constructor(private readonly checklistItemService: ChecklistItemService) {}

	@UsePipes(new ValidationPipe({transform: true}))
	@Auth()
	@Post()
	async create(
		@Body() createChecklistItemDto: CreateChecklistItemDto,
		@Param('topicId') topicId: string
	) {
		return this.checklistItemService.create(createChecklistItemDto, topicId)
	}

	@Auth()
	@HttpCode(200)
	@Get()
	async getAll(
		@Param('topicId') topicId: string,
		@CurrentUser('id') userId: string
	) {
		return this.checklistItemService.getAll(topicId, userId)
	}

	@Auth()
	@UsePipes(new ValidationPipe({transform: true}))
	@HttpCode(200)
	@Patch(':id')
	async update(
		@Param('topicId') topicId: string,
		@Param('id') checkListId: string,
		@CurrentUser('id') userId: string,
		@Body() updateChecklistItemDto: UpdateChecklistItemDto
	) {
		return this.checklistItemService.update(
			topicId,
			checkListId,
			userId,
			updateChecklistItemDto
		)
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async delete(
		@Param('topicId') topicId: string,
		@Param('id') checkListId: string,
		@CurrentUser('id') userId: string
	) {
		return this.checklistItemService.delete(topicId, checkListId, userId)
	}
}
