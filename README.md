# rehype-textmarker

`rehype-textmarker` is a [rehype][rehype] plugin to highlight text pattern like e.g. `TODO` or `FIXME` or to highlight text surrounded by a defined symbol, e.g. `this is ~~highlingted~~ text` by enclosing the pattern text or the surrounded text with a `<mark>` tag. See below example.

## Usage

```js
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeTextmarker from 'rehype-textmarker'
import rehypeStringify from 'rehype-stringify'
import { read } from 'to-vfile'

const file = await remark()
    .use(remarkRehype)
    .use(rehypeTextmarker, [
        {
            textPattern: /\b(TODO)\b/,
            htmlTag: 'mark',
            className: 'red-marker',
        },
        {
            textPattern: /≈([^≈]+)≈/,
            htmlTag: 'mark',
            className: 'yellow-marker',
        }
    ])
    .use(rehypeStringify)
    .process(await read('example.md'))

console.log(file.value)
```

[rehype]: https://github.com/rehypejs/rehype
