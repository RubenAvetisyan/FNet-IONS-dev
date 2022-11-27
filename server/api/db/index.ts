import Prisma from '@prisma/client'
import chalk from 'chalk'

const { PrismaClient } = Prisma

const prisma = new PrismaClient()

prisma.$on('beforeExit', () => {
  console.info(chalk.underline.green('prisma has been disconnected'))
})

export { prisma }
