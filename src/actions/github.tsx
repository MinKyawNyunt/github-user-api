"use server";

import { Octokit as OK, RequestError } from "octokit";

const octokit = new OK({
    auth: process.env.GITHUB_TOKEN,
    // auth: 'test',
});

const request = async (url: string, payload: Record<string, string> = {}) => {
    try {
        const data = await octokit.request(url, payload);

        if ("data" in data) {
            return { status: true, data: data.data, message: '' }
        }

        return { status: true, data: data, message: '' }

    } catch (error) {

        if (error instanceof RequestError) {
            if (error.status === 401) {
                return { status: false, message: "Invalid Github Token" }
            }

            if (error.message === 'Issues are disabled for this repo - https://docs.github.com/v3/issues/') {
                return { status: false, message: 'Issues are disabled for this repo by repo owner', data: [] }
            }
        }

        throw error;

    }
}

export const getUsers = async () => {
    return await request("GET /users");
};

export const searchUsers = async (q: string) => {
    return await request("GET /search/users", {
        q: q,
    });
};

export const getUserRepos = async (username: string) => {
    return await request("GET /users/{username}/repos", {
        username: username,
    });
};

export const getRepoIssues = async (owner: string, repo: string) => {
    return await request("GET /repos/{owner}/{repo}/issues", {
        owner: owner,
        repo: repo,
    });
};

export const createIssue = async (
    owner: string,
    repo: string,
    title: string,
    body: string
) => {
    return await request("POST /repos/{owner}/{repo}/issues", {
        owner: owner,
        repo: repo,
        title: title,
        body: body,
    });
};
