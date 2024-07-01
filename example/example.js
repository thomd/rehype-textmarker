import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeTextmarker from '../index.js'
import rehypeStringify from 'rehype-stringify'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import { read } from 'to-vfile'

const file = await remark()
  .use(remarkRehype)
  .use(rehypeTextmarker, [
    { textPattern: /≈([^≈]+)≈/g, className: 'yellow-marker' },
    { textPattern: /\b(TODO)\b/, className: 'red-marker' },
  ])
  .use(rehypeDocument)
  .use(rehypeFormat, { indent: '\t' })
  .use(rehypeStringify)
  //.process(await read('example.md'))
  .process(await read('../test/fixtures/oneOption/input.md'))

console.log(file.value)
