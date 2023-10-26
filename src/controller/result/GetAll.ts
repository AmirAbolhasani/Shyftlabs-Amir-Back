import { Database } from "../../database/Database";
import Joi, { SchemaLike } from "joi";
import { Request, Response } from "express";
import { BaseController } from "../BaseController";

export class GetAll extends BaseController
{
	override getBodySchema(): SchemaLike
	{
		return null;
	}
	override getQuerySchema(): Joi.SchemaLike
	{
		return null;
	}
	override async preHandle()
	{ }
	override async handle(_: Request, __: Response, database: Database)
	{
		return await database.result.getAll(null);
	}
	override async postHandle()
	{ }
}