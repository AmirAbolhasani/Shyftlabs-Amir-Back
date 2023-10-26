import { ModelCtor } from "sequelize";
import { Database } from "../Database";
import { BaseSequelizeModel } from "../model/BaseSequelizeModel";

export class BaseTable<Model extends BaseSequelizeModel>
{
    database: Database;
    model!: ModelCtor<Model>;
    constructor(database: Database)
    {
        this.database = database;
    }
}