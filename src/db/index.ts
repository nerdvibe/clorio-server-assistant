import Knex, {Knex as KnexTypes} from 'knex';

const config: KnexTypes.Config = {
    client: 'pg',
    connection: process.env.POSTGRES_URI
}

export const db = Knex(config);
export { Knex };
