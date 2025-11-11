import { notFound } from 'next/navigation';

// 模拟博客数据
const blogPosts = {
  '1': { title: '第一篇博客', content: '这是第一篇博客的内容' },
  '2': { title: 'Next.js教程', content: '学习Next.js动态路由' },
  '3': { title: 'React最佳实践', content: 'React开发的最佳实践' }
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map(slug => ({ slug }));
}

// 将组件改为异步函数，并使用await params
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  // 使用await获取params
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}