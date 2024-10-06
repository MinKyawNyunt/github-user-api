'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname } from 'next/navigation'
import { ChevronLeftIcon } from "@radix-ui/react-icons";


export default function Nav() {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("q") ?? '');
    const router = useTransitionRouter();
    const pathname = usePathname()

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            router.push(`/?q=${search}`)
        }
    }


    return (
        <div className="flex items-center justify-between h-20 border-b border-gray-300 shadow-md px-5">
            <div>
                {pathname !== '/' && <Button onClick={() => router.back()}> <ChevronLeftIcon /> Go Back</Button>}
            </div>

            <div className="flex flex-grow max-w-3xl space-x-1">
                <Input value={search} type="Search" placeholder="Search User" onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />

                <Button onClick={() => router.push(`/?q=${search}`)} >Search</Button>
            </div>

            <div></div>
        </div>
    )
}