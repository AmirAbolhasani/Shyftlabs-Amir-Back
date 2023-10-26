import { Database } from "../Database";
import { Transaction } from 'sequelize';

import { StudentModel } from '../model/StudentModel';
import { BaseTable } from "./BaseTable";

export class StudentTable extends BaseTable<StudentModel>
{
	constructor(database: Database)
	{
		super(database)
	}
	async getAll(trx: Transaction | null): Promise<StudentModel[]>
	{
		return await this.model.findAll({ transaction: trx });
	}
	async create(name: string, family: string, birth_date: Date, email: string, trx: Transaction | null): Promise<StudentModel>
	{
		return await this.model.create(
			{
				name,
				family,
				birth_date,
				email
			},
			{ transaction: trx }
		);
	}
	async delete(id: number, trx: Transaction | null): Promise<void>
	{
		await this.database.startTransaction<void>(async (trx) =>
		{
			let options = {
				where: { id },
				transaction: trx
			};
			this.model.destroy(options);
			await this.database.result.model.destroy({ where: { student_id: id }, transaction: trx });
		}, trx);
	}
}