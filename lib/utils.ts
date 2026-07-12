export function createImageURL(uuid: string) {
  return `${process.env.NEXT_PUBLIC_UPLOADCARE_CDN_CNAME}${uuid}/`;
}
