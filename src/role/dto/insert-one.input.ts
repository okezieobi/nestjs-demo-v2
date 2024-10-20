import { ApiProperty } from '@nestjs/swagger';
import { IsIn, ArrayUnique } from 'class-validator';

export class WriteRole {
  @ApiProperty()
  @IsIn(['Admin', 'User'])
  name: string;

  @ApiProperty()
  @IsIn(['READ', 'INSERT', 'UPDATE', 'DELETE'], { each: true })
  @ArrayUnique()
  permissions: string[];
}
