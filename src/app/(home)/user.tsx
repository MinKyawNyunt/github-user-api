'use client'
import { useEffect, useState } from "react";
import Loader from "./loader";
import Image from "next/image";
import Grid from "@/components/grid";
import { useTransitionRouter } from "next-view-transitions";
import { getUsers, searchUsers } from "@/actions/github";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import useHandleError from "@/hooks/use-handle-error";

interface User {
    login: string;
    avatar_url: string;
    repos_url: string;
}

interface State {
    loading: boolean,
    data: User[],
}

export default function Users({ q }: { q: string }) {

    const [state, setState] = useState<State>({
        loading: true,
        data: [],
    })
    const router = useTransitionRouter();
    const { showErrorMessage, handleError } = useHandleError();

    useEffect(() => {
        async function init() {

            setState(state => ({ ...state, loading: true }))

            try {
                if (q) {
                    const res = await searchUsers(q);

                    if (res.status) {
                        setState(state => ({ ...state, data: res.data.items, loading: false }))
                    } else {
                        showErrorMessage(res.message)
                    }
                } else {
                    const res = await getUsers();
                    if (res.status) {
                        setState(state => ({ ...state, data: res.data, loading: false }))
                    } else {
                        showErrorMessage(res.message)
                    }
                }
            } catch (error) {
                handleError(error)
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