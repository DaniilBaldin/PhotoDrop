import { Request } from 'express';

export default interface InfoRequest extends Request {
    user?: string;
}
