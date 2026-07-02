export function seedFromString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return hash
}

export function mulberry32(seed) {
  let t = seed
  return function () {
    t |= 0
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export function seededHistogram(seedStr, length = 14, max = 100) {
  const rand = mulberry32(seedFromString(seedStr))
  const values = []
  for (let i = 0; i < length; i++) {
    values.push(Math.round(rand() * max) + 5)
  }
  return values
}
