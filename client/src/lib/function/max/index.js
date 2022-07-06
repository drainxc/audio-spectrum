export function max(arr) {
  return arr.reduce(function (a, b) {
    return Math.max(a, b);
  });
}
