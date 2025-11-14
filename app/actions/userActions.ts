'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string
  const name = formData.get('name') as string
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    })
    
    revalidatePath('/users')
    return { success: true, user }
  } catch (error) {
    return { success: false, error: '创建用户失败' }
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    })
    return users
  } catch (error) {
    throw new Error('获取用户列表失败')
  }
}