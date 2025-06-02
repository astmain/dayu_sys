import {NextFunction, Request, Response} from "express";

export function Config_logger_global_middleware(req: Request, res: Response, next: NextFunction) {
    console.log("请求url:", req.originalUrl, `====================================`)

    next()
    console.log(`响应res:`, res.statusCode)
}
