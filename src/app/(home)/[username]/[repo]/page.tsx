import Container from "@/components/container"
import IssueList from "./issue-list"
import NewIssue from "./new-issue"

export default function Page({ params }: { params: { username: string, repo: string } }) {
    return (
        <Container>
            <div className="flex justify-center mb-10">
                <h1 className="text-4xl font-extrabold text-center">{params.repo.toUpperCase()} REPOSITORY</h1>
            </div>

            <div className="m-auto w-11/12 max-w-3xl">
                <div className="flex justify-end mb-10">
                    <NewIssue />
                </div>
                <IssueList />
            </div>
        </Container>
    )
}