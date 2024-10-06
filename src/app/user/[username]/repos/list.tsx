'use client'

import { useEffect, useState } from "react"
import { Endpoints } from "@octokit/types";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table"
import useApi from "@/hooks/use-api";
import ListComponent from "@/components/list";
import { useParams } from "next/navigation";

interface State {
    data: Endpoints["GET /users/{username}/repos"]["response"]['data'],
    loading: boolean,
}

export default function List() {

    const [state, setState] = useState<State>({
        data: [],
        loading: true,
    })
    const { getUserRepos } = useApi();
    const params: { username: string } = useParams();


    const loadData = async () => {
        const res = await getUserRepos(params.username)

        if (res) {
            setState(state => ({ ...state, data: res.data, loading: false }))
        }

    }

    const getList = () => {
        return state.data.map(item => {
            return { name: item.name, description: `${item.stargazers_count} stars / ${item.watchers_count} watchers` }
        })
    }

    useEffect(() => {
        loadData();
    }, [])

    console.log(state)

    return (
        <>
            <h1 className="text-4xl font-extrabold">REPOSITORIES</h1>
            <hr />
            <br />

            <ListComponent data={getList()} />

        </>

    )
}