import { IsIn, ArrayUnique } from 'class-validator';

export class InsertRole {
  @IsIn(['Admin', 'User'])
  name: string;

  @IsIn(['READ', 'INSERT', 'UPDATE', 'DELETE'], { each: true })
  @ArrayUnique()
  permissions: string[];
}
