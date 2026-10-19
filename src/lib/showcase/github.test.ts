import { expect, test } from "vitest";
import { downloadShowcase, listShowcaseRepos } from "./github";

function repo(name: string, topics: string[], owner = "AyanoNK") {
  return {
    name,
    topics,
    owner: { login: owner },
    private: false,
    html_url: `https://github.com/${owner}/${name}`,
    created_at: "2026-01-01T00:00:00Z",
    default_branch: "main",
  };
}

function fakeFetch(pages: unknown[][], seen: Request[] = []) {
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    seen.push(request);
    const page = Number(new URL(request.url).searchParams.get("page") ?? "1");
    const headers = new Headers({ "content-type": "application/json" });
    if (page < pages.length) {
      headers.set(
        "link",
        `<https://api.github.com/user/repos?affiliation=owner&per_page=100&page=${page + 1}>; rel="next"`,
      );
    }
    return new Response(JSON.stringify(pages[page - 1]), { headers });
  };
}

test("keeps every owned repo the token can see", async () => {
  const fetchFn = fakeFetch([
    [
      repo("a", ["portfolio-highlight"]),
      repo("b", []),
      repo("c", ["portfolio-highlight"], "someone-else"),
    ],
  ]);
  const repos = await listShowcaseRepos("t", fetchFn);
  expect(repos.map((x) => [x.name, x.highlight, x.bigHighlight])).toEqual([
    ["a", true, false],
    ["b", false, false],
  ]);
});

test("missing showcase folder gives undefined", async () => {
  const [tracked] = await listShowcaseRepos("t", fakeFetch([[repo("a", [])]]));
  const notFound = async () => new Response("", { status: 404 });
  expect(await downloadShowcase("t", tracked, "unused", notFound)).toBe(
    undefined,
  );
});

test("blocked repo counts as no showcase folder", async () => {
  const [tracked] = await listShowcaseRepos("t", fakeFetch([[repo("a", [])]]));
  const blocked = async () => new Response("", { status: 451 });
  expect(await downloadShowcase("t", tracked, "unused", blocked)).toBe(
    undefined,
  );
});

test("follows pagination", async () => {
  const fetchFn = fakeFetch([[repo("a", [])], [repo("b", [])]]);
  expect((await listShowcaseRepos("t", fetchFn)).map((x) => x.name)).toEqual([
    "a",
    "b",
  ]);
});

test("throws on http error", async () => {
  await expect(
    listShowcaseRepos("t", async () => new Response("", { status: 401 })),
  ).rejects.toThrow(/401/);
});

test("sends the token", async () => {
  const seen: Request[] = [];
  await listShowcaseRepos("t", fakeFetch([[]], seen));
  expect(seen[0].headers.get("authorization")).toBe("Bearer t");
});

test("maps repo fields", async () => {
  const [mapped] = await listShowcaseRepos(
    "t",
    fakeFetch([
      [
        {
          ...repo("a", ["portfolio-big-highlight"]),
          private: true,
        },
      ],
    ]),
  );
  expect(mapped).toEqual({
    name: "a",
    createdAt: new Date("2026-01-01T00:00:00Z"),
    isPrivate: true,
    url: "https://github.com/AyanoNK/a",
    defaultBranch: "main",
    highlight: false,
    bigHighlight: true,
  });
});
