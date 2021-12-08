import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { MongoDb } from "../../db/mongo";
import { fromDataEntities, fromDataEntity } from "../../libs/dataEntity";
import { IRequirement } from "../../models/IRequirement";
import { responseMessage } from "../../utils/responseMessage";

export const requirementRouterPublic = Router();

requirementRouterPublic.get("/", async (req: Request<{}, {}, {}, { class?: number, salary?: string, address?: string, method?: string }>, res: Response) => {
	const mongo = MongoDb.getInstance();
	const db = await mongo.db;
	const c = !Number(req.query?.class) ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [Number(req.query.class)];
	const address = req.query?.address;

	const salaries = req.query?.salary ? req.query?.salary.split(",")?.map(item => Number(item)) : [0, 1000000];
	const query = {
		classAddress: {
			$regex: address?.trim() || ""
		},
		fee: {
			$gt: salaries?.[0],
			$lt: salaries?.[1]
		},
		class: {
			$in: [...c]
		}

	};
	try {
		const requirements = await db.requirements.find({ ...query }).toArray();

		res.status(200).send(fromDataEntities(requirements));
	} catch (error) {
		res.status(500).send(responseMessage(500, JSON.stringify(error)));
	}
});
requirementRouterPublic.get("/:id", async (req: Request<{ id: string }>, res: Response) => {

	const mongo = MongoDb.getInstance();
	const db = await mongo.db;
	try {
		const requirement = await db.requirements.findOne({ _id: new ObjectId(req.params.id) });

		if (requirement === null || requirement === undefined) {
			res.status(200).send(responseMessage(400, "requirement not found!"));
			return;
		}
		res.status(200).send(fromDataEntity(requirement));
	} catch (error) {
		res.status(500).send(responseMessage(500, JSON.stringify(error)));
	}
});

requirementRouterPublic.post("/", async (req: Request, res: Response) => {

	const mongo = MongoDb.getInstance();
	const db = await mongo.db;

	const requirement: IRequirement = {
		...req.body
	};
	try {
		const requirements = await db.requirements.insertOne(requirement);

		if (!requirement) {
			res.status(200).send(responseMessage(400, "error!"));
			return;
		}
		res.status(200).send(requirements);
	} catch (error) {
		res.status(500).send(responseMessage(500, JSON.stringify(error)));
	}
});