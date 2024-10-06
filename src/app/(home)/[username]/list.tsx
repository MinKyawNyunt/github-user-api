'use client'

import { useEffect, useState } from "react"
import { Endpoints } from "@octokit/types";
import ListComponent from "@/components/list";
import { useParams } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { getUserRepos } from "@/actions/github";
import useHandleError from "@/hooks/use-handle-error";

interface State {
    data: Endpoints["GET /users/{username}/repos"]["response"]['data'],
    loading: boolean,
}

export default function List() {

    const [state, setState] = useState<State>({
        data: [],
        loading: true,
    })

    const params: { username: string } = useParams();
    const router = useTransitionRouter();
    const { showErrorMessage, handleError } = useHandleError();


    const loadData = async () => {
        setState(state => ({ ...state, loading: true }))

        try {
            const res = await getUserRepos(params.username)

            if (res.status) {
                setState(state => ({ ...state, data: res.data, loading: false }))
            } else {
                showErrorMessage(res.message);
                setState(state => ({ ...state, loading: false }))

            }
        } catch (error) {
            handleError(error)
        }


    }

    const getList = () => {
        return state.data.map(item => {
            return { id: item.name, name: item.name, description: `${item.stargazers_count} stars / ${item.watchers_count} watchers` }
        })
    }

    const handleClick = (id: string | number) => {
        router.push(`/${params.username}/${id}`)
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <div className="flex justify-center mb-10">
                <h1 className="text-4xl font-extrabold text-center">{params.username.toUpperCase()} REPOSITORIES</h1>
            </div>

            <div className="m-auto w-11/12 max-w-3xl">
                <ListComponent loading={state.loading} onClick={handleClick} data={getList()} />
            </div>


        </>

    )
}