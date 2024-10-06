'use client'

import { useTransitionRouter } from "next-view-transitions";
import { Button } from "./ui/button";

export default function GoBackBtn() {
    const router = useTransitionRouter();

    return (
        <Button onClick={() => router.back()} className="absolute bottom-7 left-1/2 transform -translate-x-1/2">
            Go Back
        </Button>

    )
}