import { MongoDb } from "./mongo";
import { users } from "./seeds/users";

export const migrate = async (dropCollections = true, createIndexes = true): Promise<void> => {
	const mongo = MongoDb.getInstance();
	const db = await mongo.db;

	try {
		if (dropCollections === true) {
			console.info("--dropCollections found!");
			try {
				await db.__db.dropCollection(db.users.collectionName);

				// TODO: add other collections;
			}
			catch (err) {
				console.warn("Could not delete collections.", err);
				console.info("We will try to proceed...");
			}
		}

		const usersResult = await db.users.insertMany(users);
		console.info(`${usersResult.insertedCount} entries added to users!`);

		console.info("createIndexes: " + createIndexes);

		if (createIndexes === true) {

			const usersIndexes = await db.users.createIndex({ address: "text" });
			console.log("usersIndexes: ", usersIndexes);
		}
	} catch (e) {
		console.error(e);
	} finally {
		// If client connection is not closed, node will not exit.
		db.__client.close();
	}
};

(() => {
	const dropCollections = process.argv.findIndex((x) => x === "--dropCollections") > -1;
	const createIndexes = process.argv.findIndex((x) => x === "--createIndexes") > -1;

	console.info("Starting migration:");
	migrate(dropCollections, createIndexes)
		.then(() => console.info("completed!"))
		.catch(reason => console.error(reason));
})();
