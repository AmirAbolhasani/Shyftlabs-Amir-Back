import { Database } from "../../database/Database";
import Joi, { SchemaLike } from "joi";
import { Request, Response } from "express";
import { BaseController } from "../BaseController";

export class Post extends BaseController
{
	override getBodySchema(): SchemaLike
	{
		return Joi.object({
			name: Joi.string().required(),
		});
	}
	override getQuerySchema(): Joi.SchemaLike
	{
		return null;
	}
	override async preHandle()
	{ }
	override async handle(req: Request, _: Response, database: Database)
	{
		let { name } = req.body;

		return await database.course.create(name, null);
	}
	override async postHandle()
	{ }
}