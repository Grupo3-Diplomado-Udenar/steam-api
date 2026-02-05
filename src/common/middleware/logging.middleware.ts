import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const date = new Date().toISOString();
        const { method, originalUrl } = req;

        console.log(
            `Esta ejecutando un metodo ${method} en la ruta ${originalUrl}, fecha : ${date}`,
        );

        // Log response status when finished
        res.on('finish', () => {
            console.log(
                `Respuesta: ${method} ${originalUrl} - Status: ${res.statusCode}`,
            );
        });

        next();
    }
}
