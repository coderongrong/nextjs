export default function EnvTestPage() {
  const databaseUrl = process.env.DATABASE_URL
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">环境变量测试</h1>
      <p>DATABASE_URL: {databaseUrl || '未找到'}</p>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
    </div>
  )
}