import Socket from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { v4 as uuid } from "uuid";
import { INotification } from "../models/IUser";

const userIds: Array<string> = [];

export const notificationMiddleware = (socket: Socket.Socket, next: (err?: ExtendedError | undefined) => void) => {
	next();
};

export const notificationListener = (socket: Socket.Socket) => {

	socket.on("joinNamespace", (id: string) => {
		if (!id || userIds.indexOf(id) > -1) {
			return;
		}
		console.log("new user join", id);
		userIds.push(id);
		socket.on("disconnectNamespace", () => {
			console.log("disconnect", id);
			userIds.splice(userIds.indexOf(id), 1);
		});
	});

	socket.on("sendNotification", async ({ message, url }) => {
		const notification: INotification = {
			id: uuid(),
			message,
			url,
			createdAt: new Date(),
			active: false
		};
		// console.log(notification);
		// const mongo = MongoDb.getInstance();
		// const db = await mongo.db;

		// await db.users.findOneAndUpdate(
		//     { _id: new ObjectId(socket.handshake.auth.userId) },
		//     {
		//         $addToSet: { notifications: notification }
		//     });

		socket.broadcast.emit("broadcastNotification", notification);
	});
};