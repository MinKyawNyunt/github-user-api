import Container from "@/components/container";
import Nav from "./nav";
import React from "react";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {


    return (
        <>
            <Nav />
            <Container>
                {children}
            </Container>
        </>
    )
}