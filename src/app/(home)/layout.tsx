import Container from "@/components/container";
import Nav from "./nav";
import React from "react";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {


    return (
        <div className="flex flex-col">
            <Nav />
            <div className="flex-grow">
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    )
}