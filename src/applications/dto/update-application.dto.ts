import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../../common/enums';

export class UpdateApplicationDto {
  @ApiProperty({
    example: ApplicationStatus.ACCEPTED,
    description: 'Application Status',
    enum: ApplicationStatus,
  })
  @IsNotEmpty()
  @IsEnum(ApplicationStatus)
  estado: ApplicationStatus;
}
