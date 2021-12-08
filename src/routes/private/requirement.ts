import { Request, Response, Router } from "express";
import { MongoDb } from "../../db/mongo";
import { IRequirement } from "../../models/IRequirement";
import { responseMessage } from "../../utils/responseMessage";

export const requirementRouterPrivate = Router();

requirementRouterPrivate.post("/", async (req: Request, res: Response) => {

	const mongo = MongoDb.getInstance();
	const db = await mongo.db;

	const requirement: IRequirement = {
		...req.body
	};
	try {
		const requirementMongo = await db.requirements.insertOne(requirement);

		if (requirementMongo.insertedCount !== 1 || requirementMongo.result.ok !== 1) {
			res.status(200).send(responseMessage(400, "user not found!"));
		}
		res.status(200).send(responseMessage(200, "Add a requirement successfully"));
	} catch (error) {
		res.status(500).send(responseMessage(500, JSON.stringify(error)));
	}
});