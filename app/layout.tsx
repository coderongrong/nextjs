'use client'
import { Geist, Geist_Mono, Comforter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { Button } from 'antd';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comforter = Comforter({
  weight: "400",
  variable: "--font-comforter",
  subsets: ["latin"],
});




export default function RootLayout({
  children,
  hello,
  slotpage
}: Readonly<{
  children: React.ReactNode;
  hello: React.ReactNode;
  slotpage: React.ReactNode;
}>) {
  const [count, setCount] = useState(0);
  const pathname = usePathname();
  // console.log(count, pathname, hello);
  console.log('layout0----->', count);
  useEffect(() => {
    // fetch('/api/home', {
    //   method: 'GET',
    //   // body: JSON.stringify({ hello: 'worldasdasda' }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // }).then(res => res.json()).then(data => console.log(data));
  }, [count]);
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${geistMono.variable} antialiased comforter`}
      >
        {/* <div key={123}>
          ---- {hello} ---
        </div> */}


        <div>主应用</div>
        <div key="hello-slot">{children}</div>
        {/* {hello && <div >{hello}</div>} */}
        {/* {slotpage && <div >{slotpage}</div>} */}
        <Link rel="stylesheet" href="/abc">404</Link>

        <div>
          <Button onClick={() => setCount(count + 1)}>add count {count}</Button>
        </div>

        

        <Link href="/aboutData" className={pathname === '/aboutData' ? 'text-purple-500 font-bold' : ''}>aboutData</Link>
        <Link href="/about" className={pathname === '/about' ? 'text-purple-500 ml-10 font-bold' : 'ml-10'}>about</Link>
        <Link href="/blog/2" className={pathname === '/blog' ? 'text-purple-500 ml-10 font-bold' : 'ml-10'}>blog</Link>
        {/* <Button type="primary" className="mb-5" onClick={() => setCount(count + 1)}>hello</Button> */}
        {/* <div style={{ color: 'blue' }} className="border border-blue-500">
          <Link href="/home" className={pathname === '/home' ? 'text-purple-500 font-bold' : ''}>home</Link>
          <Link href="/about" className={pathname === '/about' ? 'text-purple-500 ml-10 font-bold' : 'ml-10'}>about</Link>
          <Link href="/test" className={pathname === '/test' ? 'text-purple-500 ml-10 font-bold' : 'ml-10'}>test</Link>
          <div>count: {count}</div>
          <button onClick={() => setCount(count + 1)}>add count</button>
          <div>根 </div>
          <div >
            {children}
          </div>
          <div>根 </div>
          <div>
          </div>
        </div> */}

      </body>
    </html>
  );
}
