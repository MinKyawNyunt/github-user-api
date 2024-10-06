'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Nav() {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("q") ?? '');
    const router = useTransitionRouter();

    return (
        <div className="flex items-center justify-center h-20 border-b border-gray-300 shadow-md">
            <div className="flex space-x-1 w-11/12 max-w-2xl">
                <Input value={search} type="Search" placeholder="Search User" onChange={(e) => setSearch(e.target.value)} />

                <Button onClick={() => router.push(`/?q=${search}`)} >Search</Button>
            </div>
        </div>
    )
}