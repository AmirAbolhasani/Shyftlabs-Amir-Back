import { Sequelize, Dialect } from "sequelize";
import { Model, ModelCtor, Transaction, ModelAttributes, Attributes, ModelOptions } from 'sequelize';

export abstract class BaseSequelizeDatabase 
{
    protected sequelize: Sequelize;
    constructor(dialect: Dialect, name: string, user: string, pass: string, host: string, port: number, logging: boolean = false)
    {
        this.sequelize = new Sequelize(
            name,
            user,
            pass,
            {
                dialect,
                host,
                port,
                logging
            });
    }
    define<M extends Model, TAttributes = Attributes<M>>(
        modelName: string,
        attributes: ModelAttributes<M, TAttributes>,
        options?: ModelOptions<M>
    ): ModelCtor<M>
    {
        if (!options)
            options = {};
        if (options.name == undefined)
            options.name = {
                plural: modelName,
                singular: modelName
            };
        if (options.paranoid == undefined)
            options.paranoid = true;
        if (options.freezeTableName == undefined)
            options.freezeTableName = true;
        if (options.tableName == undefined)
            options.tableName = modelName;
        if (options.underscored == undefined)
            options.underscored = true;
        if (options.timestamps == undefined)
            options.timestamps = true;
        if (options.paranoid == undefined)
            options.paranoid = true;
        if (options.createdAt == undefined)
            options.createdAt = true;
        if (options.updatedAt == undefined)
            options.updatedAt = true;

        return this.sequelize.define(modelName, attributes, options);
    }
    async startTransaction<T>(handler: (trx: Transaction) => Promise<T>, trx: Transaction | null): Promise<T>
    {
        if (trx)
            return await handler(trx);
        trx = await this.sequelize.transaction();
        try
        {
            let result = await handler(trx);
            await trx.commit();
            return result;
        }
        catch (error)
        {
            await trx.rollback();
            throw error;
        }
    }
}