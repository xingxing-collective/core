import { Prisma, PrismaClient } from '@prisma/client'

export const usePrismaClient = () => new PrismaClient()

export const useQuery = (strings: TemplateStringsArray | Prisma.Sql) => {
  const client = usePrismaClient()
  try {
    client.$connect()
    return client.$queryRaw(strings)
  } finally {
    client.$disconnect()
  }
}

export const useExecute = (strings: TemplateStringsArray | Prisma.Sql) => {
  const client = usePrismaClient()
  try {
    client.$connect()
    return client.$executeRaw(strings)
  } finally {
    client.$disconnect()
  }
}