'use client'
import { useState } from "react";
export default function Template({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [count, setCount] = useState(0);
    return (
        <div style={{color: 'blue'}} key={11}>
            <div>根 template --- {children}</div>
            {/* <div>
                {children} -- count 根 template {count}
                <button onClick={() => setCount(count + 1)}>add count</button>
            </div>
            <div>根 template</div>
            <div>
            </div> */}
        </div>
    );
}

// RRqw157120