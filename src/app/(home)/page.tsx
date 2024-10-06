import Users from "./user"

export default function Page({ searchParams }: { searchParams: { q: string } }) {
    return (
        <>
            <Users q={searchParams.q} />
        </>
    )
}