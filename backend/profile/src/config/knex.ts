import Knex from 'knex';
import {Model} from 'objection';
import {numberOrDefault} from "../utils/common";
import {migrateAll} from "../changelog";

const DATABASE_MIGRATION_TABLE = "database_migration";
const DATABASE_MIGRATION_COLUMN_ID = "id";
const DATABASE_MIGRATION_COLUMN_SCRIPT = "script";
const DATABASE_MIGRATION_COLUMN_EXECUTED_AT = "executed_at";


export const knex: Knex = Knex({
    client: 'pg',
    connection: {
        database: process.env.DB_NAME || 'pss_calc',
        user: process.env.DB_USER || 'pss_calc',
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: numberOrDefault(process.env.DB_PORT, 5432)
    },
    pool: {
        min: numberOrDefault(process.env.DB_POOL_MIN, 3),
        max: numberOrDefault(process.env.DB_POOL_MAX, 30)
    }
});

Model.knex(knex);

export async function createSchema() {
    try {
        console.info("Starting database migration");
        await createMigrationTable();
        await migrateAll();
        console.info("Database migration scripts executed.");
    } catch (e) {
        console.error("Failed migrating database.", e);
        throw e;
    }
}

export function migrate(script: string) {
    return async () => {
        await knex.transaction(async tx => {
            try {
                let countScripts: Record<string, any> = await tx(DATABASE_MIGRATION_TABLE).where(DATABASE_MIGRATION_COLUMN_SCRIPT, script.toLowerCase()).count({count: '*'});
                if (countScripts[0]['count'] == 0) {
                    let module = await import(`../changelog/${script}`);
                    let moduleObj =  new module.default();
                    console.info(`Running migration script ${script}...`);
                    await moduleObj.migrate(knex, tx);
                    await tx(DATABASE_MIGRATION_TABLE).insert({[DATABASE_MIGRATION_COLUMN_SCRIPT]: script});
                }
                return tx.commit();
            } catch (e) {
                console.error(`Failed applying changeset ${script}.`, e);
                return tx.rollback(`Failed applying changeset ${script}.`);
            }
        });
    }
}

async function createMigrationTable() {
    await knex.transaction(async tx => {
        try {
            if (!await tx.schema.hasTable(DATABASE_MIGRATION_TABLE)) {
                await tx.schema.createTable(DATABASE_MIGRATION_TABLE, table => {
                    table.increments(DATABASE_MIGRATION_COLUMN_ID);
                    table.string(DATABASE_MIGRATION_COLUMN_SCRIPT, 255).notNullable();
                    table.timestamp(DATABASE_MIGRATION_COLUMN_EXECUTED_AT).notNullable().defaultTo(knex.fn.now());
                });
                return tx.commit();
            }
        } catch (e) {
            tx.rollback(e);
        }
    });
}
