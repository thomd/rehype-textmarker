import { visit } from 'unist-util-visit'
import { findAndReplace } from 'hast-util-find-and-replace'

export const rehypeTextmarker = (options) => {
    if (options == null) {
        throw new Error('Options missing')
    }
    return (tree) => {
        visit(tree, (node) => node.tagName == 'code' || node.tagName == 'p', (node) => {
            findAndReplace(node, [/≈([^≈]+)≈/, (value, capture, match) => {
                const markNode = {
                    type: 'element',
                    tagName: 'mark',
                    properties: { className: 'yellow-mark' },
                    children: [ { type: 'text', value: capture } ]
                }
                return markNode
            }])
        })
    }
}

