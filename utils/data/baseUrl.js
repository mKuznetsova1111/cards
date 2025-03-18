export default function baseUrl(url) {
  // return `${process.env.assetPrefix ?? "/"}${url}`;
  return `${url}`;
}

export function image(url) {
  return baseUrl(`images/${url}`)
}
