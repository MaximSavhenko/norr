import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class NotesService {
	constructor(private prisma: PrismaService) {}

	async create(createNoteDto: CreateNoteDto, userId: string) {
		return this.prisma.note.create({
			data: {
				content: createNoteDto.content,
				topic: { connect: { id: createNoteDto.topicId } },
				user: { connect: { id: userId } },
				tags: createNoteDto.tagIds
					? { connect: createNoteDto.tagIds.map(tagId => ({ id: tagId })) }
					: undefined
			},
			include: { tags: true }
		})
	}

	async getAll(userId: string) {
		return this.prisma.note.findMany({
			where: { userId },
			include: { tags: true }
		})
	}

	async getOne(noteId: string, userId: string) {
		return this.prisma.note.findFirst({
			where: { id: noteId, userId },
			include: { tags: true }
		})
	}

	async update(noteId: string, userId: string, updateNoteDto: UpdateNoteDto) {
		const note = await this.prisma.note.findFirst({
			where: { id: noteId, userId }
		})
		if (!note) throw new NotFoundException('Note not found!')

		return this.prisma.note.update({
			where: { id: noteId, userId },
			data: {
				content: updateNoteDto.content,
				tags: updateNoteDto.tagIds
					? { set: updateNoteDto.tagIds.map(id => ({ id })) }
					: undefined
			},
			include: { tags: true }
		})
	}

	async delete(noteId: string) {
		return this.prisma.note.delete({
			where: { id: noteId }
		})
	}
}
