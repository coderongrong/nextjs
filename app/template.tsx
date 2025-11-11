'use client'
import { useState } from "react";
export default function Template({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [count, setCount] = useState(0);
    console.log('template 页面', count);
    return (
        <div style={{ color: 'blue' }} key={11}>
            <div> template --- ------------------
                <div>
                    {children}
                </div>
                template --- ------------------
            </div>
        </div>
    );
}

// RRqw157120