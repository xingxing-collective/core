export enum StatusCode {
  Success = 200,
  BadRequest = 400,
  ApiUnauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}

export interface XBootResponse<T = any> {
  code: StatusCode
  msg?: string
  success: boolean
  data?: T
}
export interface XBootPageResponse<T = any> extends XBootResponse<T> {
  total?: number
  pageIndex?: number
  pageCount?: number
}
