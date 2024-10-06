import Container from "@/components/container"
import List from "./list"

export default async function Page() {
    return (
        <Container>
            <h1 className="text-4xl font-extrabold">REPOSITORIES</h1>
            <hr />
            <br />

            <List />
        </Container>
    )
}