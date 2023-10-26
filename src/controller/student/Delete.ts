import { Database } from "../../database/Database";
import Joi, { SchemaLike } from "joi";
import { Request, Response } from "express";
import { BaseController } from "../BaseController";
import { ErrorOperation } from "../../ErrorOperation";

export class Delete extends BaseController
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
	override async handle(req: Request, _: Response, database: Database)
	{
		let id: number = parseInt(req.params.id);

		let result = await database.student.delete(id, null);
		if (result == 0)
			ErrorOperation.throwHTTP(404, "delete failed")
	}
	override async postHandle()
	{ }
}