export function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export function chunk(alpha, pattern) {
  const matrix = []
  const sum = pattern.reduce((acc, current) => {
    matrix.push([acc, acc + current])
    return acc + current
  }, 0)

  if (sum > alpha.length) return alpha

  return matrix.map(([start, end]) => alpha.slice(start, end))
}

export function getRandomWord(arr, length) {
  const filtred = arr.filter((word) => word.length === length)
  const randomIndex = Math.floor(Math.random() * filtred.length)
  return filtred[randomIndex]
}

export function loadStorage(key, init) {
  try {
    const value = localStorage.getItem(key)

    if (value) {
      return JSON.parse(value)
    } else {
      localStorage.setItem(key, JSON.stringify(init))
      return init
    }
  } catch (err) {
    return init
  }
}
