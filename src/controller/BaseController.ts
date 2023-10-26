import * as express from 'express';
import { SchemaLike } from 'joi';
import { Database } from '../database/Database';
export abstract class BaseController
{
    abstract getBodySchema(): SchemaLike | null;
    abstract getQuerySchema(): SchemaLike | null;
    abstract preHandle(req: express.Request, res: express.Response, database: Database): Promise<void>;
    abstract handle(req: express.Request, res: express.Response, database: Database): Promise<any>;
    abstract postHandle(req: express.Request, res: express.Response, database: Database): Promise<void>;
}