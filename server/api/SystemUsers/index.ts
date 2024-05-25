import { useQuery } from "~/composables/usePrismaClient"

export default defineEventHandler(async (event) => {
  return await useQuery`SELECT * FROM xb_users`
})