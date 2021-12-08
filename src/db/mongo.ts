import { Collection, Db, MongoClient } from "mongodb";
import { dbConfig } from "./config";
import { UserEntity } from "./DataEntities/UserEntity";

interface IDataStore {
	__client: MongoClient;
	__db: Db;

	users: Collection<UserEntity>;
}

// singleton pattern for mongodb with typescript
export class MongoDb {

	private static instance: MongoDb;
	db: Promise<IDataStore>;
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {
		this.db = this.connectDb();
	}

	private connectDb = async (): Promise<IDataStore> => {
		const client = await MongoClient.connect(dbConfig.mongoDb.connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		try {
			const db = client.db(dbConfig.mongoDb.dbName);

			const users = db.collection<UserEntity>(`${dbConfig.mongoDb.sysPrefix}users`);
			return {
				__client: client,
				__db: db,

				users,
			};
		} finally {
			// ensures that the client will close when you finish or error
			// client.close();
		}

	}

	public static getInstance = (): MongoDb => {
		if (MongoDb.instance === null || MongoDb.instance === undefined) {
			MongoDb.instance = new MongoDb();
		}

		return MongoDb.instance;
	}
}