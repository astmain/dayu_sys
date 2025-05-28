import {Injectable, NestMiddleware} from '@nestjs/common';


import {Request, Response, NextFunction} from "express"

// import {Request, Response, NextFunction} from "@types/express"

@Injectable()
export class Config_logger_part_middleware implements NestMiddleware {
    // use(req: TRequest, res: TResponse, next: (error?: any) => void): any;
    // use(req: any, res: any, next: () => void) {
    use(req: Request, res: Response, next: NextFunction) {
        // req.headers
        console.log("请求url:", req.originalUrl, `====================================`)
        console.log(`响应res:`, res.statusCode)

        next();
    }
}
