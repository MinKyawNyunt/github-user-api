import Container from "@/components/container"
import IssueList from "./issue-list"
import NewIssue from "./new-issue"

export default function Page() {
    return (
        <Container>
            <h1 className="text-4xl font-extrabold">Open Issues</h1>
            <hr />
            <br />
            <div className="flex justify-end">
                <NewIssue />
            </div>
            <IssueList />
        </Container>
    )
}