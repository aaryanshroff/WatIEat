import { Query } from "../";
import { UserTable } from "../models";

const find = (column: string, value: string | number) =>
  Query<UserTable>(`SELECT * FROM users WHERE ${column}=$1`, [value]);
const insert = (newUser: UserTable) =>
  Query<UserTable>(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
    [newUser.email, newUser.password]
  );

export default {
  find,
  insert
};
