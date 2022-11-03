import sharp from 'sharp';
import { Buffer } from 'buffer';
import logo from './PhotoDropLogo';

export async function addWatermark(imageBuffer) {
    try {
        const svgBuffer = Buffer.from(logo);
        console.log(svgBuffer);
        const image = await sharp(imageBuffer)
            .composite([
                {
                    input: svgBuffer,
                    gravity: 'centre',
                    density: 80,
                },
            ])
            .toBuffer();
        return image;
    } catch (err) {
        console.log(err);
    }
}
