import {remark} from 'remark'
import html from 'remark-html'

export default async function markdownToHtml(markdown) {
    const res = await remark().use(html).process(markdown)
    return res.toString();
}