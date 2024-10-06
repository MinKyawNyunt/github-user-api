'use client'

import { useEffect, useState } from "react"
import { Endpoints } from "@octokit/types";
// import useApi from "@/hooks/use-api";
import { useParams } from "next/navigation";
import moment from "moment";
import List from "@/components/list";
import { getRepoIssues } from "@/actions/github";
import useHandleError from "@/hooks/use-handle-error";

interface State {
    data: Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]['data'],
    loading: boolean,
}

export default function IssueList() {

    const [state, setState] = useState<State>({
        data: [],
        loading: true,
    })
    // const { getRepoIssues } = useApi();
    const params: { username: string, repo: string } = useParams();
    const handleEror = useHandleError();

    const loadData = async () => {

        try {
            const res = await getRepoIssues(params.username, params.repo)
            if (res) {
                setState(state => ({ ...state, data: res.data, loading: false }))
            }
        } catch (error) {
            handleEror(error)
        }


    }

    const getList = () => {
        return state.data.map(item => {
            return {
                id: item.id, name: item.title, description: `${moment(item.created_at).fromNow()} ${item.user ? 'by ' + item.user.login : null}`
            }
        })
    }

    useEffect(() => {
        loadData();
    }, [])

    return <List loading={state.loading} data={getList()} />
}