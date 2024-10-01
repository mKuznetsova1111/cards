export default function baseUrl(url, isStory) {
  return `${process.env.assetPrefix ?? `${isStory ? "" : "/"}`}${url}`;
}

export function image(url, isStory) {
  return baseUrl(`images/${url}`, isStory)
}
