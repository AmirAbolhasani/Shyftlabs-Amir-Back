import * as express from 'express';
import Joi from 'joi';
import { Database } from '../database/Database';
import { BaseController } from '../controller/BaseController';
import { ErrorOperation } from '../ErrorOperation';
import { HTTPError } from '../HTTPError';

export abstract class BaseMiddleware
{
    abstract getDatabase(): Promise<Database>;
    abstract preHandle(req: express.Request, res: express.Response, database: Database): Promise<void>;
    abstract postHandle(req: express.Request, res: express.Response, database: Database): Promise<void>;
    constructor()
    {
    }
    getHandler(controller: BaseController)
    {
        return async (req: express.Request, res: express.Response) =>
        {
            let code = 200;
            // result
            let result = {};
            try
            {
                // init controller
                let database = await this.getDatabase();

                // preHandle
                await this.preHandle(req, res, database);
                await controller.preHandle(req, res, database);

                // check body validation
                let bodySchema = controller.getBodySchema();
                if (bodySchema != null)
                {
                    const validation = await Joi.compile(bodySchema)
                        .prefs({ errors: { label: 'key' } })
                        .validate(req.body);
                    if (validation.error)
                    {
                        let message = validation.error.details.map((details) => details.message).join(', ');
                        ErrorOperation.throwHTTP(400, message);
                    }
                }
                // check query validation
                let querySchema = controller.getQuerySchema();
                if (querySchema != null)
                {
                    const validation = await Joi.compile(querySchema)
                        .prefs({ errors: { label: 'key' } })
                        .validate(req.query);
                    if (validation.error)
                    {
                        let message = validation.error.details.map((details) => details.message).join(', ');
                        ErrorOperation.throwHTTP(400, message);
                    }
                }

                // call controller
                if (controller.handle)
                    result = await controller.handle(req, res, database);
                if (result == null)
                    result = "Success";

                // postHandle
                await controller.postHandle(req, res, database);
                await this.postHandle(req, res, database);
            } catch (error)
            {
                if (error instanceof HTTPError)
                {
                    code = error.code;
                    result = error.message;
                }
                else
                {
                    code = 500;
                    result = error + "";
                }
            }
            return res.status(code).send(result);
        };
    }
}