// Custom image loader that bypasses Sharp completely
export default function imageLoader({ src }: { src: string }) {
  return src
}
