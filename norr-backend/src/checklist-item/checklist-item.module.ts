import { Module } from '@nestjs/common'
import { ChecklistItemService } from './checklist-item.service'
import { ChecklistItemController } from './checklist-item.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [ChecklistItemController],
	providers: [ChecklistItemService, PrismaService],
	exports: [ChecklistItemService]
})
export class ChecklistItemModule {}
