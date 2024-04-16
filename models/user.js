import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { join, resolve } from "path";

class User {
	constructor(name, password) {
		this.name = name;
		this.password = password;
		this.id = uuidv4();
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			password: this.password,
		};
	}

	static getAllUsers() {
		return new Promise((res, rej) => {
			fs.readFile(
				join(resolve(process.cwd()), "data", "users.json"),
				"utf-8",
				(err, content) => {
					if (err) {
						rej(err);
					} else {
						res(JSON.parse(content));
					}
				}
			);
		});
	}

	async save() {
		const users = await User.getAllUsers();
		users.push(this.toJSON());

		console.log(users);

		return new Promise((res, rej) => {
			fs.writeFile(
				join(resolve(process.cwd()), "data", "users.json"),
				JSON.stringify(users),

				(err) => {
					if (err) {
						rej(err);
					} else {
						res();
					}
				}
			);
		});
	}
}

export default User;
