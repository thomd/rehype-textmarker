import { visit } from 'unist-util-visit'
import { findAndReplace } from 'hast-util-find-and-replace'

export const rehypeTextmarker = (optionsList = []) => {
  if (optionsList.length == 0) {
    throw new Error('Options missing')
  }
  return (tree) => {
    visit(
      tree,
      (node) => node.tagName == 'code' || node.tagName == 'p',
      (node) => {
        for (let options of optionsList) {
          findAndReplace(node, [
            options.textPattern,
            (value, capture, match) => {
              const markNode = {
                type: 'element',
                tagName: options.htmlTag,
                properties: options.className != null ? { className: options.className } : {},
                children: [{ type: 'text', value: capture }],
              }
              return markNode
            },
          ])
        }
      }
    )
  }
}
