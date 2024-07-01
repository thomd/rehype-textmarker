export const config = [
  {
    textPattern: /≈([^≈]+)≈/g,
    className: 'yellow-marker',
    tags: ['p', 'code'],
  },
  {
    textPattern: /\b(TODO)\b/,
    className: 'red-marker',
  },
]
