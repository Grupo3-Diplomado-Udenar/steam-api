import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ApplicationsModule } from './applications/applications.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [StudentsModule, ApplicationsModule, OrganizationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
