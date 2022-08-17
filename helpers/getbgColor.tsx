export default function getBgColor(count: number) {
  return `rgb(${(90 * (17 * count)) % 255}, ${(43 * count * 8) % 255},  ${
    (15 * (19 * count)) % 255
  })`;
}
