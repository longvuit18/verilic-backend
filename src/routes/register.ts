import { Request, Response } from "express";
import { Base64 } from "js-base64";
import { MongoDb } from "../db/mongo";
import { buySalt, hashPassword } from "../libs/hash";
import { ICredentials, IUser, User } from "../models/IUser";
import { responseMessage } from "../utils/responseMessage";

type RequestBody = IUser & { password: string };
export const registerForUser = async (req: Request<{}, {}, RequestBody>, res: Response) => {

	try {
		const salt = buySalt();
		const passHash = hashPassword(Base64.decode(req.body.password), salt);
		const mongo = MongoDb.getInstance();
		const db = await mongo.db;

		const userR = await db.users.findOne({ email: req.body.email });
		if (userR) {
			res.status(400).send(responseMessage(400, "Email này đã được đăng kí trước đó!"));
			return;
		}
		const credentials: ICredentials = {
			salt,
			passHash
		};
		const user: IUser & { credentials?: ICredentials; } = {
			... new User(),
			email: req.body.email,
			fullName: req.body.fullName.trim(),
			credentials,

			role: req.body.role

		};

		const userMongo = await db.users.insertOne(user);

		if (userMongo.insertedCount !== 1 || userMongo.result.ok !== 1) {
			console.error(userMongo);
			res.status(400).send(responseMessage(400, "The operation fails to create a document"));
		}

		res.status(200).send(responseMessage(200, "Add a user successfully"));
	} catch (error) {
		res.status(500).send(responseMessage(500, error));
	}

};