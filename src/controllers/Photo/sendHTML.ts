import path from 'path';

import { RequestHandler } from 'express';

const sendHTML: RequestHandler = (req, res) => {
    res.sendFile(path.join(__dirname, '../', '../', '../', '/views', '/uploadPhoto.html'));
};

export default sendHTML;
