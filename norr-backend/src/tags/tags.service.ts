import { Injectable } from '@nestjs/common'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TagsService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.tag.findMany({
			where: { userId }
		})
	}

	async create(createTagDto: CreateTagDto, userId: string) {
		return this.prisma.tag.create({
			data: {
				name: createTagDto.name,
				user: { connect: { id: userId } }
			}
		})
	}

	async update(userId: string, tagId: string, updateTagDto: UpdateTagDto) {
		return this.prisma.tag.update({
			where: { userId, id: tagId },
			data: { name: updateTagDto.name }
		})
	}

	async delete(tagId: string) {
		return this.prisma.tag.delete({
			where: {
				id: tagId
			}
		})
	}
}
