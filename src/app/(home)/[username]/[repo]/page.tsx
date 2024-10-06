import Container from "@/components/container"
import Client from "./client"

export default function Page({ params }: { params: { username: string, repo: string } }) {
    return (
        <Container>
            <div className="flex justify-center mb-10">
                <h1 className="text-4xl font-extrabold text-center">{params.repo.toUpperCase()} REPOSITORY</h1>
            </div>

            <Client />
        </Container>
    )
}