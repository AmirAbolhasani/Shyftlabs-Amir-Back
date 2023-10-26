import { DataTypes, Attributes, ModelAttributes } from "sequelize";
import { CourseModel } from "../model/CourseModel";

export let CourseAttributes: ModelAttributes<
	CourseModel,
	Attributes<CourseModel>
> = {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	name: { type: DataTypes.STRING, allowNull: false },
};
