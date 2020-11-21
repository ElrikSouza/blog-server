import { plainToClass } from 'class-transformer';
import { PaginationParams } from './pagination-parameters.dto';

export const decodePaginationToken = (token: string) => {
  const decoded = Buffer.from(token, 'base64').toString('ascii').split('/');
  return plainToClass(PaginationParams, {
    timestamp: decoded[0],
    initial_id: decoded[1],
  });
};

export const createPaginationToken = (timestamp: string, id: string) => {
  const token = `${timestamp}/${id}`;
  const encoded = Buffer.from(token, 'ascii').toString('base64');

  return encoded;
};
