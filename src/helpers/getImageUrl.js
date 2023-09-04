export default function getImageUrl(dir, name, extenstion = 'png') {
    return new URL(`/src/assets/${dir}/${name}.${extenstion}`, import.meta.url).href
}