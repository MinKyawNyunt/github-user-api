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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { createIssue } from "@/actions/github";
import { useParams } from "next/navigation";
import useHandleError from "@/hooks/use-handle-error";
import { State } from "./client";

interface NewIssueProps {
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
}

export default function NewIssue({ state, setState }: NewIssueProps) {

    const formSchema = z.object({
        title: z.string().min(1, { message: "Title is required!" }),
        description: z.string().min(1, { message: "Description is required!" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })
    const params: { username: string, repo: string } = useParams();
    const { showErrorMessage, handleError } = useHandleError();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setState(state => ({ ...state, disabled: true }))
        try {
            const res = await createIssue(params.username, params.repo, values.title, values.description)

            if (res.status) {
                setState(state => ({ ...state, disabled: false, open: false, refresh: true }))
            } else {
                showErrorMessage(res.message)
                setState(state => ({ ...state, disabled: false }))
            }


        } catch (error) {

            handleError(error, false)
            setState(state => ({ ...state, disabled: false }))
        }

    }

    return (
        <Dialog open={state.open} onOpenChange={() => setState(state => ({ ...state, open: !state.open }))}>
            <DialogTrigger asChild>
                <Button >New Issue</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Issue</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={state.disabled} placeholder="Title" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={state.disabled} placeholder="Description" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <DialogFooter>
                            <DialogClose asChild>
                                <Button disabled={state.disabled} variant="outline" className="mb-1">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={state.disabled} className="mb-1">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>


            </DialogContent>
        </Dialog>
    )
}