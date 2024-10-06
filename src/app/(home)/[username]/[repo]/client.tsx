"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"



import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { createIssue, getRepoIssues } from "@/actions/github";
import { useParams, useRouter } from "next/navigation";
import useHandleError from "@/hooks/use-handle-error";
import { useEffect, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import NewIssue from "./new-issue";
import { Endpoints } from "@octokit/types";
import IssueList from "./issue-list";
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
    const handleEror = useHandleError();
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
            if (res) {
                setState(state => ({ ...state, data: res.data, loading: false, refresh: false }))
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

    return (
        <div className="m-auto w-11/12 max-w-3xl">
            <div className="flex justify-end mb-10">
                <NewIssue state={state} setState={setState} />
            </div>
            <List loading={state.loading} data={getList()} />
        </div>
    )
}