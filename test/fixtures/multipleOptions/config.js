export const config = [
  {
    textPattern: /≈([^≈]+)≈/g,
    className: 'yellow-marker',
  },
  {
    textPattern: /\b(TODO)\b/,
    className: 'red-marker',
  },
]
