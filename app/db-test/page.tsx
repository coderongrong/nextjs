import { prisma } from '@/lib/db'

export default async function DbTestPage() {
  try {
    const users = await prisma.user.findMany()
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">数据库连接测试</h1>
        <p className="text-green-600">✅ 数据库连接成功</p>
        <p>用户数量: {users.length}</p>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">数据库连接测试</h1>
        <p className="text-red-600">❌ 数据库连接失败</p>
        <pre>{error instanceof Error ? error.message : '未知错误'}</pre>
      </div>
    )
  }
}