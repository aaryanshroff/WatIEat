import { Pool } from 'pg';
import config from '../config';

const pool = new Pool(config.db);

export const Query = <T = any>(query: string, values?: any) => {
    return new Promise<T[]>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.rows);
            }
        })
    })
}

import users from './queries/users';
import meals from './queries/meals';

export default {
    users,
    meals
}