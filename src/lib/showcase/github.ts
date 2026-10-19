import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export const SHOWCASE_OWNER = "AyanoNK";
export const SHOWCASE_DIR = "docs/showcase";

export type ShowcaseRepo = {
  name: string;
  createdAt: Date;
  isPrivate: boolean;
  url: string;
  defaultBranch: string;
  highlight: boolean;
  bigHighlight: boolean;
};

type Fetch = typeof fetch;

type ApiRepo = {
  name: string;
  topics?: string[];
  owner: { login: string };
  private: boolean;
  html_url: string;
  created_at: string;
  default_branch: string;
};

type ApiContent = { type: "file" | "dir" | string; path: string };

const API = "https://api.github.com";

async function get(
  token: string,
  url: string,
  fetchFn: Fetch,
  accept = "application/vnd.github+json",
): Promise<Response> {
  const response = await fetchFn(url, {
    headers: {
      Accept: accept,
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!response.ok) {
    throw new Error(`GitHub ${response.status} for ${url}`);
  }
  return response;
}

function nextPage(response: Response): string | undefined {
  return response.headers.get("link")?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
}

export async function listShowcaseRepos(
  token: string,
  fetchFn: Fetch = fetch,
): Promise<ShowcaseRepo[]> {
  const repos: ShowcaseRepo[] = [];
  let url: string | undefined =
    `${API}/user/repos?affiliation=owner&per_page=100`;
  while (url) {
    const response = await get(token, url, fetchFn);
    for (const repo of (await response.json()) as ApiRepo[]) {
      const topics = repo.topics ?? [];
      if (repo.owner.login !== SHOWCASE_OWNER) continue;
      repos.push({
        name: repo.name,
        createdAt: new Date(repo.created_at),
        isPrivate: repo.private,
        url: repo.html_url,
        defaultBranch: repo.default_branch,
        highlight: topics.includes("portfolio-highlight"),
        bigHighlight: topics.includes("portfolio-big-highlight"),
      });
    }
    url = nextPage(response);
  }
  return repos;
}

function contentsUrl(repo: ShowcaseRepo, path: string): string {
  const encoded = path.split("/").map(encodeURIComponent).join("/");
  return `${API}/repos/${SHOWCASE_OWNER}/${repo.name}/contents/${encoded}?ref=${encodeURIComponent(repo.defaultBranch)}`;
}

export async function downloadShowcase(
  token: string,
  repo: ShowcaseRepo,
  destDir: string,
  fetchFn: Fetch = fetch,
): Promise<string[] | undefined> {
  const files: string[] = [];

  async function walk(path: string): Promise<boolean> {
    let response: Response;
    try {
      response = await get(token, contentsUrl(repo, path), fetchFn);
    } catch (error) {
      // 451: GitHub blocks the repo (for example after a DMCA notice).
      if (path === SHOWCASE_DIR && /GitHub (404|451) /.test(String(error))) {
        return false;
      }
      throw error;
    }
    for (const entry of (await response.json()) as ApiContent[]) {
      if (entry.type === "dir") {
        await walk(entry.path);
      } else if (entry.type === "file") {
        const raw = await get(
          token,
          contentsUrl(repo, entry.path),
          fetchFn,
          "application/vnd.github.raw",
        );
        const relative = entry.path.slice(SHOWCASE_DIR.length + 1);
        const target = join(destDir, relative);
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, Buffer.from(await raw.arrayBuffer()));
        files.push(relative);
      }
    }
    return true;
  }

  return (await walk(SHOWCASE_DIR)) ? files : undefined;
}
