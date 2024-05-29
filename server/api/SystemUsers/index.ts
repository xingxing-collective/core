import { usePrismaClient } from "~/composables/usePrismaClient"
import { XBootPageResponse, ResponseStatusCode } from "~/types"

export default defineEventHandler(async (event): Promise<XBootPageResponse> => {
  const { pageIndex, pageCount } = getQuery(event)
  const client = usePrismaClient()

  try {
    client.$connect()
    const data = await client.xb_users.findMany({
      skip: (Number(pageIndex) - 1) * Number(pageCount),
      take: Number(pageCount)
    })
    const total = await client.xb_users.count()
    return {
      data,
      total,
      code: ResponseStatusCode.Success,
      success: true,
      pageIndex: Number(pageIndex),
      pageCount: Number(pageCount)
    }

  } finally {
    client.$disconnect()
  }
})