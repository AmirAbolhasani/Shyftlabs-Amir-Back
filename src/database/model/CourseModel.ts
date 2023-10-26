import { BaseSequelizeModel } from "./BaseSequelizeModel";

export class CourseModel extends BaseSequelizeModel
{
	id!: number;
	name!: string;
}