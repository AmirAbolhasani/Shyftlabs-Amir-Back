import { ResultScore } from "../../ResultScore";
import { BaseSequelizeModel } from "./BaseSequelizeModel";

export class ResultModel extends BaseSequelizeModel
{
	id!: number;
	student_id!: number;
	course_id!: number;
	score!: ResultScore;
}