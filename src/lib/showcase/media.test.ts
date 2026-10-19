import { expect, test } from "vitest";
import { mediaKind, mediaLabel, sortMedia } from "./media";

test("sorts named files and carousel", () => {
  expect(
    sortMedia([
      "project-en.md",
      "10-end.mp4",
      "cover.webp",
      "2-mid.png",
      "portfolio-highlight.PNG",
      "portfolio-big-highlight.webm",
      "notes.txt",
    ]),
  ).toEqual({
    cover: "cover.webp",
    highlight: "portfolio-highlight.PNG",
    bigHighlight: "portfolio-big-highlight.webm",
    carousel: ["2-mid.png", "10-end.mp4"],
  });
});

test("card media missing is undefined", () => {
  expect(sortMedia(["project-en.md"]).highlight).toBeUndefined();
});

test("detects kind", () => {
  expect(mediaKind("a.MP4")).toBe("video");
  expect(mediaKind("a.avif")).toBe("image");
  expect(mediaKind("a.md")).toBeUndefined();
});

test("labels media from the file name", () => {
  expect(mediaLabel("01-login-screen.png")).toBe("login screen");
  expect(mediaLabel("shots/2_home_page.webm")).toBe("home page");
  expect(mediaLabel("03.png")).toBeUndefined();
});
