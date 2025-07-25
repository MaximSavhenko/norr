import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { TopicsModule } from './topics/topics.module';
import { NotesModule } from './notes/notes.module';
import { TagsModule } from './tags/tags.module';
import { TopicProgresModule } from './topic-progres/topic-progres.module';
import { ChecklistItemModule } from './checklist-item/checklist-item.module';

@Module({
	imports: [ConfigModule.forRoot(), UserModule, AuthModule, TopicsModule, NotesModule, TagsModule, TopicProgresModule, ChecklistItemModule]
})
export class AppModule {}
