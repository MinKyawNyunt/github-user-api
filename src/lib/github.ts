"use server";

import { Octokit as OK } from "octokit";

const octokit = new OK({
  auth: process.env.GITHUB_TOKEN,
});

export const searchUsers = async (q: string) => {
  return await octokit.request("GET /search/users", {
    q: q,
  });
};

export const getUserRepos = async (username: string) => {
  return await octokit.request("GET /users/{username}/repos", {
    username: username,
  });
};

export const getRepoIssues = async (owner: string, repo: string) => {
  return await octokit.request("GET /repos/{owner}/{repo}/issues", {
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
  return await octokit.request("POST /repos/{owner}/{repo}/issues", {
    owner: owner,
    repo: repo,
    title: title,
    body: body,
    // headers: {
    //     'X-GitHub-Api-Version': '2022-11-28',
    //     'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
    // }
  });
};
