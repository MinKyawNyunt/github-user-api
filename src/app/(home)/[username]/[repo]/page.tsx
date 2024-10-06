import Container from "@/components/container"
import IssueList from "./issue-list"
import NewIssue from "./new-issue"
import GoBackBtn from "@/components/go-back-btn"

export default function Page({ params }: { params: { username: string, repo: string } }) {
    return (
        <Container>
            <div className="flex justify-center mb-10">
                <h1 className="text-4xl font-extrabold text-center">{params.repo.toUpperCase()} REPOSITORY</h1>
            </div>

            <div className="max-w-3xl m-auto">
                <div className="flex justify-end mb-10">
                    <NewIssue />
                </div>
                <IssueList />

                <GoBackBtn />
            </div>
        </Container>
    )
}