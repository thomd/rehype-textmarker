# rehype-textmarker

![Build][build-badge]

`rehype-textmarker` is a [rehype][rehype] plugin to highlight text pattern like e.g. `TODO`, `FIXME` or to highlight text surrounded by a defined symbol, e.g. `this is ≈highlighted≈ text` by enclosing the text with a `<mark>` tag.

See below example.

## Usage

Say we have the following file `example.md`:

```markdown
# Headline

Paragraph with ≈highlighted≈ text.

Inline code `console.≈log≈();`.

TODO things to do later
```

and a module `example.js`:

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
      textPattern: /≈([^≈]+)≈/g,
      className: 'yellow-marker',
      tags: ['p', 'code'],
    },
    {
      textPattern: /\b(TODO)\b/,
      className: 'red-marker',
    },
  ])
  .use(rehypeStringify)
  .process(await read('example.md'))

console.log(file.value)
```

then running `node example.js` yields:

```html
<h1>Headline</h1>
<p>Paragraph with <mark class="yellow-marker">highlighted</mark> text.</p>
<p>
  Inline code <code>console.<mark class="yellow-marker">log</mark>();</code>.
</p>
<p><mark class="red-marker">TODO</mark> things to do later</p>
```

## Test

    npm run test

## API

The default export is `rehypeTextmarker`.

```js
unified().use(rehypeTextmarker, options)
```

### Options

In order to define **multiple** regular expressions, put options into a list.

```js
unified().use(rehypeTextmarker, options)
unified().use(rehypeTextmarker, [options_1, options_2, ... ])
```

where `options` is an object with at least a `textPattern` property.

The following options are available:

- `textPattern` (`RegExp`, mandatory) — regular expression which must contain a **capturing group**.

- `htmlTag` (`string`, optional) — HTML tag to sourround the captured string. Default is a `mark` tag.

- `className` (`string`, optional) — style class to be added to the html tag. Default is no style class.

- `tags` (`array` of `string`, optional) — list of tags within whose text is highlighted. It is also possible to define tags with class names, e.g. `code.language-js`  which will only highlight wihtin Javascript code blocks . Default is `p` tag.

- `ignore` (`array` of `string`, optional) — list of tags to ignore. Default is `[]`.

[rehype]: https://github.com/rehypejs/rehype
[build-badge]: https://github.com/thomd/rehype-textmarker/workflows/plugin-test/badge.svg
