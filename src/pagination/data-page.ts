import { createPaginationToken } from './pagination-tokens';

export interface CanBePaginated {
  created_at: Date;
  _id: string;
}

export interface DataPage<T extends CanBePaginated> {
  next?: string;
  page: T[];
}

export const createDataPage = <T extends CanBePaginated>(
  data: T[],
  pageSize: number,
): DataPage<T> => {
  if (data.length < pageSize) {
    return { page: data };
  }

  const { created_at, _id } = data[data.length - 1];
  const paginationToken = createPaginationToken(created_at.toISOString(), _id);

  data.pop();
  return { next: paginationToken, page: data };
};
