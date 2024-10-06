'use client'

import { useEffect, useState } from "react"
import { Endpoints } from "@octokit/types";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table"
import useApi from "@/hooks/use-api";
import ListComponent from "@/components/list";
import { useParams } from "next/navigation";

interface State {
    data: Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]['data'],
    loading: boolean,
}

export default function IssueList() {

    const [state, setState] = useState<State>({
        data: [],
        loading: true,
    })
    const { getRepoIssues } = useApi();
    const params: { username: string, repo: string } = useParams();

    const loadData = async () => {
        const res = await getRepoIssues(params.username, params.repo)
        console.log(res)
        if (res) {
            setState(state => ({ ...state, data: res.data, loading: false }))
        }

    }

    // const getList = () => {
    //     return state.data.map(item => {
    //         return { name: item.name, description: `${item.stargazers_count} stars / ${item.watchers_count} watchers` }
    //     })
    // }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <h1 className="text-4xl font-extrabold">Open Issues</h1>
            <hr />
            <br />

            {/* <ListComponent data={getList()} /> */}

        </>

    )
}