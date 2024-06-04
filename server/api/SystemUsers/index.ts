import { usePrismaClient } from "~/composables/usePrismaClient"
import { XBootPageResponse, StatusCode, XBootResponse } from "~/types"

export default defineEventHandler(async (event): Promise<XBootPageResponse | XBootResponse> => {
  const { pageIndex, pageCount } = getQuery(event)
  const client = usePrismaClient()

  try {
    client.$connect()
    if (!pageIndex || !pageCount) {
      return {
        code: StatusCode.Success,
        success: true,
        data: await client.xb_users.findMany()
      }
    }
    return {
      data: await client.xb_users.findMany({
        skip: (Number(pageIndex) - 1) * Number(pageCount),
        take: Number(pageCount)
      }),
      total: await client.xb_users.count(),
      code: StatusCode.Success,
      success: true,
      pageIndex: Number(pageIndex),
      pageCount: Number(pageCount)
    }
  }
  catch (error) {
    return { code: StatusCode.InternalServerError, success: false, msg: error }
  }
  finally {
    client.$disconnect()
  }
})