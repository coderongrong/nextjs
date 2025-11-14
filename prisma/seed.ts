import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 创建测试用户
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: '测试用户',
      posts: {
        create: [
          {
            title: '第一篇博客文章',
            content: '这是我的第一篇博客文章内容',
            published: true,
          },
        ],
      },
    },
  })
  
  console.log('种子数据创建成功:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })