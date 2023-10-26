import { DataTypes, Attributes, ModelAttributes } from "sequelize";
import { StudentModel } from "../model/StudentModel";

export let StudentAttributes: ModelAttributes<
	StudentModel,
	Attributes<StudentModel>
> = {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	name: { type: DataTypes.STRING, allowNull: false },
	family: { type: DataTypes.STRING, allowNull: false },
	birth_date: { type: DataTypes.DATE, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false },
};
