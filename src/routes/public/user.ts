import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { UserEntity } from "../../db/DataEntities/UserEntity";
import { MongoDb } from "../../db/mongo";
import { fromDataEntities, fromDataEntity } from "../../libs/dataEntity";
import { Role } from "../../models/IUser";
import { responseMessage } from "../../utils/responseMessage";

export const userRouterPublic = Router();

userRouterPublic.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
	const userId = req.params.id;

	const mongo = MongoDb.getInstance();
	const db = await mongo.db;
	try {
		const user = await db.users.findOne({ _id: new ObjectId(userId) });

		if (user === null || user === undefined) {
			res.status(400).send(responseMessage(400, "user not found!"));
			return;
		}
		res.status(200).send({ ...fromDataEntity(user as UserEntity) });
	} catch (error) {
		res.status(500).send(responseMessage(500, JSON.stringify(error)));
	}
});

userRouterPublic.get("/", async (req: Request<{}, {}, {}, { role: Role, class?: number, salary?: string, address?: string, method?: string }>, res: Response) => {
	const mongo = MongoDb.getInstance();
	const db = await mongo.db;
	const role = Number(req.query.role);
	const c = !Number(req.query?.class) ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [Number(req.query.class)];
	const address = req.query?.address;

	const salaries = req.query?.salary ? req.query?.salary.split(",")?.map(item => Number(item)) : [0, 1000000];
	const query = {
		role,
		address: {
			$regex: address?.trim() || ""
		},
		salary: {
			$gt: salaries?.[0],
			$lt: salaries?.[1]
		},
		classes: {
			$in: [...c]
		}

	};
	try {
		const teachers = await db.users.find({ ...query }).toArray();
		if (teachers === null || teachers === undefined) {
			res.status(400).send(responseMessage(400, "user not found!"));
			return;
		}
		res.status(200).send(fromDataEntities(teachers as Array<UserEntity>));
	} catch (error) {
		res.status(500).send(responseMessage(500, JSON.stringify(error)));
	}
});