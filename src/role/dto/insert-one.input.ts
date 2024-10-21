import { ApiProperty } from '@nestjs/swagger';
import { IsIn, ArrayUnique } from 'class-validator';

export class WriteRole {
  @ApiProperty()
  @IsIn(['admin', 'user'])
  name: string;

  @ApiProperty()
  @IsIn(['read', 'insert', 'update', 'delete'], { each: true })
  @ArrayUnique()
  permissions: string[];
}
