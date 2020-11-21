import { IsDateString, IsUUID } from 'class-validator';

export class PaginationParams {
  @IsDateString()
  timestamp: string;

  @IsUUID()
  initial_id: string;
}
