import sharp from "sharp";

export async function toWebpResized(
  buffer,
  { maxWidth = 1600, quality = 80 } = {}
) {
  return sharp(buffer)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer();
}
