import { getUsers } from '../actions/userActions'
import { createUser } from '../actions/userActions'

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">用户列表</h1>
      
      {/* 创建用户表单 */}
      <form action={createUser as any} className="mb-6">
        <input 
          type="email" 
          name="email" 
          placeholder="邮箱" 
          className="border p-2 mr-2"
          required
        />
        <input 
          type="text" 
          name="name" 
          placeholder="姓名" 
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          创建用户
        </button>
      </form>

      {/* 用户列表 */}
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">
              文章数: {user.posts.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}