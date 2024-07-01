# rehype-textmarker

`rehype-textmarker` is a [rehype][rehype] plugin to highlight text pattern like e.g. `TODO` or `FIXME` or to highlight text surrounded by a defined symbol, e.g. `this is ≈highlingted≈ text` by enclosing the pattern text or the surrounded text with a `<mark>` tag. See below example.

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
      className: 'red-marker',
    },
    {
      textPattern: /≈([^≈]+)≈/g,
      className: 'yellow-marker',
    },
  ])
  .use(rehypeStringify)
  .process(await read('example.md'))

console.log(file.value)
```

## API

The default export is `rehypeTextmarker`.

```js
unified().use(rehypeTextmarker, options)
```

### Options

In order to define multiple regular expressions, put options into a list.

```js
unified().use(rehypeTextmarker, {...})
unified().use(rehypeTextmarker, [{...}, {...}])
```

A list of options `[options, ...]` is mandatory. See example above.

- `textPattern` (`RegExp`, mandatory) — regular expression which must contain a capturing group.

- `htmlTag` (`string`, optional) — HTML tag to sourround the captured string. Default is a `mark` tag.

- `className` (`string`, optional) — style class to be added to the html tag.

[rehype]: https://github.com/rehypejs/rehype
