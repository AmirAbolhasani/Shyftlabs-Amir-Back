import { StudentAttributes } from './attributes/StudentAttributes';
import { CourseAttributes } from './attributes/CourseAttributes';
import { ResultAttributes } from './attributes/ResultAttributes';

import { StudentTable } from './tables/StudentTable';
import { CourseTable } from './tables/CourseTable';
import { ResultTable } from './tables/ResultTable';
import { BaseSequelizeDatabase } from './BaseSequelizeDatabase';

export class Database extends BaseSequelizeDatabase
{
	student: StudentTable;
	course: CourseTable;
	result: ResultTable;

	constructor()
	{
		let database_name: string = process.env.DATABASE_NAME ?? "";
		let database_user: string = process.env.DATABASE_USER ?? "";
		let database_pass: string = process.env.DATABASE_PASS ?? "";
		let database_host: string = process.env.DATABASE_HOST ?? "";
		let database_port: number = parseInt(process.env.DATABASE_PORT ?? "3306");

		super("mysql", database_name, database_user, database_pass, database_host, database_port, false);

		this.student = new StudentTable(this);
		this.course = new CourseTable(this);
		this.result = new ResultTable(this);
	}
	async init()
	{
		// Tables
		this.student.model = this.define("student", StudentAttributes);
		this.course.model = this.define("course", CourseAttributes);
		this.result.model = this.define("result", ResultAttributes);

		// set foreignKeys
		this.result.model.belongsTo(this.student.model, {
			foreignKey: { name: "student_id", allowNull: false },
		});
		this.result.model.belongsTo(this.course.model, {
			foreignKey: { name: "course_id", allowNull: false },
		});
	}
	sync(force: boolean)
	{
		this.sequelize.sync({ force });
	}
};