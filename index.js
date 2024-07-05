import { visit } from 'unist-util-visit'
import { findAndReplace } from 'hast-util-find-and-replace'

const rehypeTextmarker = (options) => {
   if (options !== null) {
      if (!Array.isArray(options)) {
         options = [options]
      }
      return (tree) => {
         for (let option of options) {
            visit(
               tree,
               (node) => {
                  return option.tags ? option.tags.includes(node.tagName) : node.tagName == 'p'
               },
               (node) => {
                  findAndReplace(node, [
                     option.textPattern,
                     (value, capture, match) => {
                        const markNode = {
                           type: 'element',
                           tagName: option.htmlTag != null ? option.htmlTag : 'mark',
                           properties: option.className != null ? { className: option.className } : {},
                           children: [{ type: 'text', value: capture }],
                        }
                        return markNode
                     },
                  ])
               }
            )
         }
      }
   }
}
export default rehypeTextmarker
