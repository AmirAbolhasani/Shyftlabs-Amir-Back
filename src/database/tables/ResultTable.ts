import { Database } from "../Database";
import { Transaction } from 'sequelize';

import { ResultModel } from '../model/ResultModel';
import { BaseTable } from "./BaseTable";

export class ResultTable extends BaseTable<ResultModel>
{
	constructor(database: Database)
	{
		super(database)
	}
	async getAll(trx: Transaction | null): Promise<ResultModel[]>
	{
		let options = {
			include: [
				{
					model: this.database.student.model,
					as: "student",
					required: true
				}, {
					model: this.database.course.model,
					as: "course",
					required: true
				}
			],
			transaction: trx
		};
		return await this.model.findAll(options);
	}
	async create(student_id: number, course_id: number, score: string, trx: Transaction | null): Promise<ResultModel>
	{
		return await this.model.create(
			{
				student_id,
				course_id,
				score
			},
			{ transaction: trx }
		);
	}
}