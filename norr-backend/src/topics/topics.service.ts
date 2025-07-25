import { Injectable } from '@nestjs/common'
import { CreateTopicDto } from './dto/create-topic.dto'
import { UpdateTopicDto } from './dto/update-topic.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TopicsService {
	constructor(private prisma: PrismaService) {}

	async getProgress(topicId: string) {
		const total = await this.prisma.checklistItem.count({ where: { topicId } })
		const done = await this.prisma.checklistItem.count({
			where: { topicId, done: true }
		})

		return total === 0 ? 0 : Math.round((done / total) * 100)
	}

	async getAll(userId: string) {
		return this.prisma.topic.findMany({
			where: { userId }
		})
	}

	async create(dto: CreateTopicDto, userId: string) {
		return this.prisma.topic.create({
			data: {
				...dto,
				user: {
					connect: { id: userId }
				}
			}
		})
	}

	async update(topicId: string, userId: string, updateDto: UpdateTopicDto) {
		return this.prisma.topic.update({
			where: {
				userId,
				id: topicId
			},
			data: updateDto
		})
	}

	async delete(topicId: string, userId: string) {
		return this.prisma.topic.delete({
			where: { id: topicId, userId }
		})
	}
}
