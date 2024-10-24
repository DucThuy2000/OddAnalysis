export enum EResponseMessage {
  OK = 'OK',
}

export interface ICommonResponse<T> {
  data: T;
  message: EResponseMessage;
}

export interface ICommonSelection {
  value: string;
  label: string;
}

export interface IPageAble {
  pageNumber: number;
  pageSize: number;
}

export interface ICommonPaginationResponse {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  pageable: IPageAble;
}
