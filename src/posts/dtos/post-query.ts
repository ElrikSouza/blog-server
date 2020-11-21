import { Transform } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { decodePaginationToken } from '../../pagination/pagination-tokens';
import { PaginationParams } from '../../pagination/pagination-parameters.dto';

export class PostQuery {
  @IsUUID()
  @IsOptional()
  userIdFilter?: string;

  @Transform(decodePaginationToken)
  @ValidateNested()
  @IsOptional()
  params?: PaginationParams;

  @Transform((value) => parseInt(value))
  @IsInt()
  @Max(20)
  @Min(3)
  @IsOptional()
  limit = 10;
}
