import { remark } from 'remark'
import remarkTextmarker from '../index.js'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { read } from 'to-vfile'

const file = await remark()
    .use(remarkTextmarker, {
        markupSymbolOpen: '≈',
        markupSymbolClose: '≈',
        htmlTag: 'mark',
        className: 'yellow-marker'
    })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(await read('example.md'))

console.log(file.value)

