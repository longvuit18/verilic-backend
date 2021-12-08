import cookie from "cookie";
import { Request, Response } from "express";
import { Base64 } from "js-base64";
import jwt from "jsonwebtoken";
import { MongoDb } from "../db/mongo";
import { fromDataEntity } from "../libs/dataEntity";
import { hashPassword } from "../libs/hash";
import { secretKey } from "../secret/secret";
import { responseMessage } from "../utils/responseMessage";

export const login = async (req: Request<{}, {}, { email: string, password: string }>, res: Response) => {
	const email = req.body.email;
	const password = Base64.decode(req.body.password);

	const mongo = MongoDb.getInstance();
	const db = await mongo.db;

	const user = await db.users.findOne({ email });

	if (user === undefined || user === null) {
		res.status(404).send(responseMessage(404, "Email does not exist!"));
		return;
	}

	if (user.credentials?.passHash !== hashPassword(password, user.credentials?.salt as string)) {
		res.status(404).send(responseMessage(404, "You entered wrong the password!"));
		return;
	}
	const payload = { sub: user._id, id: user._id, name: user.fullName };
	const token = jwt.sign(payload, secretKey, { expiresIn: "2d" });

	res.setHeader("Set-Cookie", cookie.serialize("token", token, {
		httpOnly: true,
		secure: true,

	}));

	res.status(200).send(fromDataEntity(user));

};

// export const loginForSeller = async (req: Request<{}, {}, { email: string, password: string }>, res: Response) => {
//     const email = req.body.email;
//     const password = Base64.decode(req.body.password);

//     const mongo = MongoDb.getInstance();
//     const db = await mongo.db;

//     const user = await db.sellers.findOne({ email });

//     if (user === undefined || user === null) {
//         res.status(404).send(responseMessage(404, "Email does not exist!"));
//         return;
//     }

//     if (user.credentials?.passHash !== hashPassword(password, user.credentials?.salt as string)) {
//         res.status(404).send(responseMessage(404, "You entered wrong the password!"));
//         return;
//     }
//     const payload = { sub: user._id, id: user._id, name: user.fullName };
//     const token = jwt.sign(payload, secretKey, { expiresIn: "2d" });

//     res.setHeader("Set-Cookie", cookie.serialize("token", token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "strict"
//     }));

//     res.status(200).send(fromDataEntity(user));

// };

