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
import { NotesService } from './notes.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('user/notes')
export class NotesController {
	constructor(private readonly notesService: NotesService) {}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Post()
	async create(
		@Body() createNoteDto: CreateNoteDto,
		@CurrentUser('id') userId: string
	) {
		return this.notesService.create(createNoteDto, userId)
	}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.notesService.getAll(userId)
	}

	@Auth()
	@Get(':id')
	async getOne(@Param('id') noteId: string, @CurrentUser('id') userId: string) {
		return this.notesService.getOne(noteId, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateNoteDto: UpdateNoteDto,
		@CurrentUser('id') userId: string
	) {
		return this.notesService.update(id, userId, updateNoteDto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.notesService.delete(id)
	}
}
