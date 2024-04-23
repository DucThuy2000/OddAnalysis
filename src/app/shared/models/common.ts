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
