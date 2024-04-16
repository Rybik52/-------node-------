import { v4 as uuidv4 } from "uuid";
// import fs from "fs";
// import { join, resolve } from "path";
import connection from "../databaseConn.js";

class User {
	constructor(username, password) {
		this.username = username;
		this.password = password;
		this.id = uuidv4();
	}

	toJSON() {
		return {
			id: this.id,
			username: this.username,
			password: this.password,
		};
	}

	static getAllUsers() {
		// return new Promise((res, rej) => {
		// 	fs.readFile(
		// 		join(resolve(process.cwd()), "data", "users.json"),
		// 		"utf-8",
		// 		(err, content) => {
		// 			if (err) {
		// 				rej(err);
		// 			} else {
		// 				res(JSON.parse(content));
		// 			}
		// 		}
		// 	);
		// });

		try {
			return new Promise((res, rej) => {
				connection.query("SELECT * FROM users", (err, rows) => {
					if (err) {
						rej(err);
					} else {
						res(rows);
					}
				});
			});
		} catch (error) {
			console.error(`Ошибка при получении пользователей: ${error}`);
			return [];
		}
	}

	async save() {
		// const users = await User.getAllUsers();
		// users.push(this.toJSON());

		// console.log(users);

		// return new Promise((res, rej) => {
		// 	fs.writeFile(
		// 		join(resolve(process.cwd()), "data", "users.json"),
		// 		JSON.stringify(users),

		// 		(err) => {
		// 			if (err) {
		// 				rej(err);
		// 			} else {
		// 				res();
		// 			}
		// 		}
		// 	);
		// });

		const query = `INSERT INTO users (id, username, password) VALUES ('${this.id}', '${this.username}', '${this.password}')`;

		try {
			return new Promise((res, rej) => {
				connection.query(query, (err) => {
					if (err) {
						rej(err);
					} else {
						res();
					}
				});
			});
		} catch (error) {
			console.error(`Ошибка при сохранении пользователя: ${error}`);
		}
	}
}

export default User;
