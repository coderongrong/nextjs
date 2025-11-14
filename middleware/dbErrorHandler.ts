export function handleDatabaseError(error: any) {
  console.error('数据库错误:', error)
  
  if (error.code === '23505') { // 唯一约束违反
    return { success: false, message: '数据已存在' }
  }
  
  if (error.code === '23503') { // 外键约束违反
    return { success: false, message: '关联数据不存在' }
  }
  
  return { success: false, message: '数据库操作失败' }
}