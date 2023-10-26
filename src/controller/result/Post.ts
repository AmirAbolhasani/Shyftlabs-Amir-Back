import { Database } from "../../database/Database";
import Joi, { SchemaLike } from "joi";
import { Request, Response } from "express";
import { BaseController } from "../BaseController";

export class Post extends BaseController
{
	override getBodySchema(): SchemaLike
	{
		return Joi.object({
			student_id: Joi.number().required(),
			course_id: Joi.number().required(),
			score: Joi.string().valid("A", "B", "C", "D", "E", "F").required(),
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
		let { student_id, course_id, score } = req.body;

		return await database.result.create(student_id, course_id, score, null);
	}
	override async postHandle()
	{ }
}