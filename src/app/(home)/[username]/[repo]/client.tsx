"use client"
import { getRepoIssues } from "@/actions/github";
import { useParams } from "next/navigation";
import useHandleError from "@/hooks/use-handle-error";
import { useEffect, useState } from "react";
import NewIssue from "./new-issue";
import { Endpoints } from "@octokit/types";
import List from "@/components/list";
import moment from "moment";

export interface State {
    disabled: boolean,
    open: boolean,
    data: Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]['data'],
    loading: boolean,
    refresh: boolean,
}

export default function Client() {
    const [state, setState] = useState<State>({
        disabled: false,
        open: false,
        data: [],
        loading: true,
        refresh: true,
    })
    const { showErrorMessage, handleError } = useHandleError();
    const params: { username: string, repo: string } = useParams();

    useEffect(() => {
        if (state.refresh) {
            loadData();
        }

    }, [state.refresh])

    const loadData = async () => {
        setState(state => ({ ...state, loading: true }))
        try {
            const res = await getRepoIssues(params.username, params.repo)
            if (res.status) {
                setState(state => ({ ...state, data: res.data, loading: false, refresh: false }))
            } else {
                showErrorMessage(res.message)
                setState(state => ({ ...state, loading: false, refresh: false }))
            }
        } catch (error) {
            handleError(error)
        }
    }

    const getList = () => {
        return state.data.map(item => {
            return {
                id: item.id, name: item.title, description: `${moment(item.created_at).fromNow()} ${item.user ? 'by ' + item.user.login : null}`
            }
        })
    }

    return (
        <div className="m-auto w-11/12 max-w-3xl">
            <div className="flex justify-end mb-10">
                <NewIssue state={state} setState={setState} />
            </div>
            <List loading={state.loading} data={getList()} />
        </div>
    )
}