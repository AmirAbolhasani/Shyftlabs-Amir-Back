import { BaseSequelizeModel } from "./BaseSequelizeModel";

export class StudentModel extends BaseSequelizeModel
{
	id!: number;
	name!: string;
	family!: string;
	birth_date!: Date;
	email!: string;
}