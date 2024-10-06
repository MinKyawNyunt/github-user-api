import { octokit } from "@/lib/github";
import { useToast } from "./use-toast";
import { useTransitionRouter } from "next-view-transitions";

export default function useApi() {
    const { toast } = useToast();
    const router = useTransitionRouter();

    const request = async (url: string, payload: Record<string, any> = {}) => {

        try {
            // console.log(`calling ${url}`)
            const res = await octokit.request(url, payload);
            return res;
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "An Error Occurred",
                    description: error.message,
                });

            } else {
                toast({
                    variant: "destructive",
                    title: "Unknown Error",
                    description: "Something went wrong!",
                });
            }

            console.error("Error details:", error);
            router.push('/error')
        }

        return false;
    };

    const searchUsers = async (q) => {
        return await request('GET /search/users', {
            q: q
        })
    }

    const getUserRepos = async (username: string) => {
        return await request('GET /users/{username}/repos', {
            username: username
        })
    }

    const getRepoIssues = async (owner: string, repo: string) => {
        return await request('GET /repos/{owner}/{repo}/issues', {
            owner: owner,
            repo: repo
        })
    }

    return { request, searchUsers, getUserRepos, getRepoIssues };
}