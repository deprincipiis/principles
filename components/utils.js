export function mod(a, b) {
  return ((a % b) + b) % b
}

export const translate = (x, y) => "translate(" + x + "," + y + ") "
export const scale = (s) => "scale(" + s + ") "
