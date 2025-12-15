import { visit } from 'unist-util-visit'
import { findAndReplace, defaultIgnore } from 'hast-util-find-and-replace'

const rehypeTextmarker = (options) => {
   if (options !== null) {
      if (!Array.isArray(options)) {
         options = [options]
      }
      return (tree) => {
         for (let option of options) {
            const ignoreSelectors = option.ignore ?? []
            const ignoreFn = (node) => {
               return ignoreSelectors.some((selector) => {
                  if (selector.includes('.')) {
                     const [tag, cls] = selector.split('.')
                     return node.tagName === tag && Array.isArray(node.properties?.className) && node.properties.className.includes(cls)
                  }
                  return node.tagName === selector
               })
            }
            visit(
               tree,
               (node) => {
                  const className = node.properties?.className
                  const tags = className && Array.isArray(className) ? className.map((cls) => `${node.tagName}.${cls}`) : []
                  return option.tags ? option.tags.some((tag) => [node.tagName, ...tags].includes(tag)) : node.tagName === 'p'
               },
               (node) => {
                  findAndReplace(
                     node,
                     [
                        option.textPattern,
                        (value, capture) => ({
                           type: 'element',
                           tagName: option.htmlTag ?? 'mark',
                           properties: option.className ? { className: [option.className] } : {},
                           children: [{ type: 'text', value: capture }],
                        }),
                     ],
                     {
                        ignore: [...defaultIgnore, ignoreFn],
                     }
                  )
               }
            )
         }
      }
   }
}

export default rehypeTextmarker
