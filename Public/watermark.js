import sharp from 'sharp';
import { Buffer } from 'buffer';

export async function addWatermark(imageBuffer) {
    try {
        const width = 750;
        const height = 450;
        const text = 'Watermark';

        const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
      .title { fill: #002; font-size: 80px; font-weight: normal;}
      </style>
      <text x="70%" y="70%" text-anchor="middle" class="title">${text}</text>
    </svg>
    `;
        const svgBuffer = Buffer.from(svgImage);
        const image = await sharp(imageBuffer)
            .composite([
                {
                    input: svgBuffer,
                    top: 0,
                    left: 0,
                },
            ])
            // .toFile('file.jpg');
            .toBuffer();
        return image;
    } catch (err) {
        console.log(err);
    }
}
