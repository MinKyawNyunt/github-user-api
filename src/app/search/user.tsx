'use client'
import { useEffect, useState } from "react";
import UserCard from "../../components/user-card";
import Loader from "./user/loader";
import Image from "next/image";
import Grid from "@/components/grid";
import { useTransitionRouter } from "next-view-transitions";
// import useApi from "@/hooks/use-api";
import { useParams, useSearchParams } from "next/navigation";
import { searchUsers } from "@/lib/github";
// import { SearchUsersResponse } from '@octokit/types';

interface User {
    login: string;
    avatar_url: string;
    repos_url: string;
}

interface State {
    loading: boolean,
    data: User[],
}

export default function Users() {

    const [state, setState] = useState<State>({
        loading: true,
        data: [],
    })
    const router = useTransitionRouter();
    // const { searchUsers } = useApi();
    const searchParams = useSearchParams();
    const q = searchParams.get('q');

    useEffect(() => {
        async function init() {
            setState(state => ({ ...state, loading: true }))

            const res = await searchUsers(q)

            if (res) {
                setState(state => ({ ...state, data: res.data.items, loading: false }))
            }
        }

        init();
    }, [])

    const handleClick = (id: string) => {
        router.push(`/user/${encodeURIComponent(id)}`)
    }

    if (state.loading) {
        return <Loader />
    }

    return (
        <Grid>
            {state.data.map((item, i) => {
                return <UserCard
                    key={i}
                    id={item.login}
                    onClick={handleClick}
                    content={<Image src={item.avatar_url} alt={item.login} width={361} height={361} />}
                    footer={<h2>{item.login}</h2>}
                />
            })}
        </Grid>

    )
}