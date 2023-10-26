import { DataTypes, Attributes, ModelAttributes } from "sequelize";
import { ResultModel } from "../model/ResultModel";

export let ResultAttributes: ModelAttributes<
	ResultModel,
	Attributes<ResultModel>
> = {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	student_id: { type: DataTypes.INTEGER, allowNull: false },
	course_id: { type: DataTypes.INTEGER, allowNull: false },
	score: {
		type: DataTypes.ENUM(
			"A",
			"B",
			"C",
			"D",
			"E",
			"F",
		),
		allowNull: false,
	},
};
