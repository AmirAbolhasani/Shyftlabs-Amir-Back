import { Database } from "../Database";
import { Attributes, DestroyOptions, Transaction } from 'sequelize';

import { CourseModel } from '../model/CourseModel';
import { BaseTable } from "./BaseTable";

export class CourseTable extends BaseTable<CourseModel>
{
	constructor(database: Database)
	{
		super(database)
	}
	async getAll(trx: Transaction | null): Promise<CourseModel[]>
	{
		return await this.model.findAll({ transaction: trx });
	}
	async create(name: string, trx: Transaction | null): Promise<CourseModel>
	{
		return await this.model.create(
			{ name },
			{ transaction: trx }
		);
	}
	async delete(id: number, trx: Transaction | null): Promise<number>
	{
		return await this.database.startTransaction<number>(async (trx) =>
		{
			let options: DestroyOptions<Attributes<CourseModel>> = {
				where: { id },
				transaction: trx
			};
			let deleted_course = this.model.destroy(options);

			// delete results belong to this course
			await this.database.result.model.destroy({ where: { course_id: id }, transaction: trx });

			return deleted_course;
		}, trx);
	}
}