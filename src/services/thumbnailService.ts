/* eslint-disable @typescript-eslint/no-explicit-any */
import makeThumbnail from 'image-thumbnail';
// import { Buffer } from 'node:buffer';

const thumbnail = async (image: any) => {
    try {
        console.log(image.Buffer);
        const result: any = await makeThumbnail(new (Buffer.from as any)(image.Buffer));
        console.log('Thumbnail created!');
        const originName = image.originalname.split('.');
        const name = image.originalname + 'thumbnail.' + originName.pop();
        return {
            fieldname: image.fieldname,
            originalname: name,
            encoding: image.encoding,
            mimetype: image.mimetype,
            buffer: result,
            size: result.length,
        };
    } catch (err) {
        console.log((err as Error).message);
    }
};

export default thumbnail;
