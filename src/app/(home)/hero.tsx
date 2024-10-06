'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTransitionRouter } from 'next-view-transitions'
import { useState } from "react"

interface State {
    search: string,
    message: string,
    disabled: boolean,
}
export default function Hero() {
    const [state, setState] = useState<State>({
        search: '',
        message: '',
        disabled: false,
    })

    const router = useTransitionRouter();

    const handleSearch = () => {
        router.push(`/search?q=${encodeURIComponent(state.search)}`)
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">

            <div className="w-11/12 max-w-2xl flex space-x-2">
                <Input onChange={(e) => { setState(state => ({ ...state, search: e.target.value })) }} type="Search" placeholder="Search User" />

                <Button onClick={handleSearch} >Search</Button>
            </div>

            <div className="h-10 flex items-center justify-center">
                {state.message && <span>{state.message}</span>}
            </div>

        </div>
    )
}