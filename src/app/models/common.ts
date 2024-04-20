export enum EResponseMessage {
  OK = 'OK',
}

export interface ICommonResponse<T> {
  data: T;
  message: EResponseMessage;
}
