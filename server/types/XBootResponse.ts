export enum ResponseStatusCode {
  Error = 0,
  Success = 200,
  BadRequest = 400,
  ApiUnauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
  NonAuthoritativeInformation = 5001,
  RequiredError = 1001
}

export interface XBootResponse<T = any> {
  code: ResponseStatusCode
  msg?: string
  success: boolean
  data: T
}
export interface XBootPageResponse<T = any> extends XBootResponse<T> {
  total: number
  pageIndex: number
  pageCount: number
}
