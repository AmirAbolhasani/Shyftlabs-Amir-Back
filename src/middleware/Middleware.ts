import { Database } from "../database/Database";
import { BaseMiddleware } from "./BaseMiddleware";

export class Middleware extends BaseMiddleware
{
	override async getDatabase(): Promise<Database>
	{
		let database = new Database();
		await database.init();
		return database;
	}
	override async preHandle()
	{
	}
	override async postHandle()
	{
	}
}