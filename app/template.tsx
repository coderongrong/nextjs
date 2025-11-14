'use client'
import { useState } from "react";
import { Button } from "antd";
export default function Template({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div key={11}>
            {children}
        </div>
    );
}

// RRqw157120