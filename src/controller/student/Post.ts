import { Database } from "../../database/Database";
import Joi, { SchemaLike } from "joi";
import { Request, Response } from "express";
import { BaseController } from "../BaseController";
import { ErrorOperation } from "../../ErrorOperation";

export class Post extends BaseController
{
	override getBodySchema(): SchemaLike
	{
		return Joi.object({
			name: Joi.string().required(),
			family: Joi.string().required(),
			birth_date: Joi.date().required(),
			email: Joi.string().email().required(),
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
		let { name, family, birth_date, email } = req.body;

		// Check if the student is at least 10 years old
		{
			const birthDate = new Date(birth_date);
			const today = new Date();
			const age = today.getFullYear() - birthDate.getFullYear();
			if (age < 10)
				ErrorOperation.throwHTTP(403, 'The student must be at least 10 years old.');
		}

		return await database.student.create(name, family, birth_date, email, null);
	}
	override async postHandle()
	{ }
}