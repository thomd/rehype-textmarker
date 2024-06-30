import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import { rehypeTextmarker } from '../index.js'
import rehypeStringify from 'rehype-stringify'
import { read } from 'to-vfile'

const file = await remark()
  .use(remarkRehype)
  .use(rehypeTextmarker, {
    textPattern: /≈([^≈]+)≈/,
    htmlTag: 'mark',
    className: 'yellow-marker',
  })
  .use(rehypeStringify)
  .process(await read('example.md'))

console.log(file.value)
