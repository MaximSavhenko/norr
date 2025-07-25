import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateChecklistItemDto } from './dto/create-checklist-item.dto'
import { UpdateChecklistItemDto } from './dto/update-checklist-item.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ChecklistItemService {
	constructor(private prisma: PrismaService) {}
  
	async getAll(topicId: string, userId: string) {
		return this.prisma.checklistItem.findMany({
			where: { topic: { id: topicId, userId } }
		})
	}

	async create(
		createChecklistItemDto: CreateChecklistItemDto,
		topicId: string
	) {
		return this.prisma.checklistItem.create({
			data: {
				content: createChecklistItemDto.content,
				done: createChecklistItemDto.done ?? false,
				topic: {
					connect: {
						id: topicId
					}
				}
			}
		})
	}

	async update(
		topicId: string,
		checkListId: string,
		userId: string,
		updateChecklistItemDto: UpdateChecklistItemDto
	) {
		const checklistItem = await this.prisma.checklistItem.findFirst({
			where: { id: checkListId, topicId }
		})
		if (!checklistItem) throw new NotFoundException('Checklist item not found!')

		return this.prisma.checklistItem.update({
			where: { id: checkListId },
			data: updateChecklistItemDto
		})
	}

	async delete(topicId: string, checkListId: string, userId: string) {
		const checklistItem = await this.prisma.checklistItem.findFirst({
			where: { id: checkListId, topicId, topic: { userId } }
		})
		if (!checklistItem) throw new NotFoundException('Checklist item not found!')
		return this.prisma.checklistItem.delete({
			where: { id: checkListId }
		})
	}
}
