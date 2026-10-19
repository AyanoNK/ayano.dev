export type MediaKind = "image" | "video";

export type ShowcaseMedia = {
  cover?: string;
  highlight?: string;
  bigHighlight?: string;
  carousel: string[];
};

const IMAGES = ["png", "jpg", "jpeg", "webp", "gif", "avif"];
const VIDEOS = ["webm", "mp4"];

function splitName(fileName: string): { base: string; ext: string } {
  const name = fileName.split("/").pop() ?? fileName;
  const dot = name.lastIndexOf(".");
  if (dot <= 0) return { base: name, ext: "" };
  return { base: name.slice(0, dot), ext: name.slice(dot + 1).toLowerCase() };
}

export function mediaKind(fileName: string): MediaKind | undefined {
  const { ext } = splitName(fileName);
  if (IMAGES.includes(ext)) return "image";
  if (VIDEOS.includes(ext)) return "video";
  return undefined;
}

export function sortMedia(fileNames: string[]): ShowcaseMedia {
  const media: ShowcaseMedia = { carousel: [] };
  for (const fileName of fileNames) {
    if (!mediaKind(fileName)) continue;
    const { base } = splitName(fileName);
    if (base === "cover") media.cover = fileName;
    else if (base === "portfolio-highlight") media.highlight = fileName;
    else if (base === "portfolio-big-highlight") media.bigHighlight = fileName;
    else media.carousel.push(fileName);
  }
  media.carousel.sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  return media;
}
