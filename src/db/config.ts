interface IServerConfig {
	mongoDb: {
		connectionString: string;
		dbName: string;
		extPrefix: string;
		sysPrefix: string;
	};
}

const config: { [key: string]: IServerConfig } = {
	dev: {
		mongoDb: {
			connectionString: "mongodb+srv://dbUser:123456789@@bemaster.ymsz3.mongodb.net/test",
			dbName: "Be-Master",
			extPrefix: "",
			sysPrefix: "sys_"
		}
	},

	product: {
		mongoDb: {
			connectionString: "mongodb+srv://dbUser:123456789@@bemaster.ymsz3.mongodb.net/test",
			dbName: "Be-Master",
			extPrefix: "",
			sysPrefix: "sys_"
		}
	}
};

export const dbConfig = config["dev"];