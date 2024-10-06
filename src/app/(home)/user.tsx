'use client'
import { useEffect, useState } from "react";
import UserCard from "../../components/user-card";
import Loader from "./loader";
import Image from "next/image";
import Grid from "@/components/grid";
import { useTransitionRouter } from "next-view-transitions";
// import useApi from "@/hooks/use-api";
import { useParams, useSearchParams } from "next/navigation";
import { getUsers, searchUsers } from "@/lib/github";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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

    console.log(q)
    useEffect(() => {
        async function init() {

            setState(state => ({ ...state, loading: true }))

            if (q) {
                const res = await searchUsers(q);

                if (res) {
                    setState(state => ({ ...state, data: res.data.items, loading: false }))
                }
            } else {
                const res = await getUsers();

                if (res) {
                    setState(state => ({ ...state, data: res.data, loading: false }))
                }
            }

        }

        init();
    }, [q])

    const handleClick = (id: string) => {
        router.push(`/${encodeURIComponent(id)}`)
    }

    if (state.loading) {
        return <Loader />
    }

    return (
        <Grid>
            {state.data.map((item, i) => {
                return (
                    <Card key={i} className="w-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400" onClick={() => handleClick(item.login)}>
                        <CardHeader>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center">
                            <Image src={item.avatar_url} alt={item.login} width={361} height={361} />
                        </CardContent>
                        <CardFooter className="flex justify-center items-center">
                            <h2>{item.login}</h2>
                        </CardFooter>
                    </Card>
                )
            })}
        </Grid>

    )
}