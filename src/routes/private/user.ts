import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { UserEntity } from "../../db/DataEntities/UserEntity";
import { MongoDb } from "../../db/mongo";
import { fromDataEntity } from "../../libs/dataEntity";
import { sendMail } from "../../libs/sendEmails";
import { secretKey } from "../../secret/secret";
import { responseMessage } from "../../utils/responseMessage";

export const userRouterPrivate = Router();

// check user logged
userRouterPrivate.get("/is-login", async (req: Request, res: Response) => {
	const token = req.cookies?.token ?? "";
	let userId = "";
	try {
		const decoded = jwt.verify(token, secretKey) as any;
		userId = decoded?.id;
		if (userId === undefined || userId === null) {
			res.status(400).send(responseMessage(400, "user not found!"));
			return;
		}
	} catch (error) {
		res.status(500).send(responseMessage(500, JSON.stringify(error)));
		return;
	}

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

userRouterPrivate.get("/send-email/:teacherId", async (req: Request<{ teacherId: string }>, res: Response) => {

	const mongo = MongoDb.getInstance();
	const db = await mongo.db;
	try {
		const user = await db.users.findOne({ _id: new ObjectId(req.params.teacherId) });

		if (user === null || user === undefined) {
			res.status(400).send(responseMessage(400, "user not found!"));
			return;
		}
		const htmlBody = `
		<h2>Xin chào ${user.fullName}</h2>
		<h3>Chúng tôi gửi thông báo cho bạn đến từ BeMASTER!</h3>

		<p>Học sinh <b>${req.query.studentName}</b> đã đăng ký lớp học của bạn. Học
			sinh đang chờ bạn xác nhận lớp trong phần <span style="color:#085191;">Lớp học của tôi đó.</span></p>
		<p>Hãy phản hồi lại trong phần Lớp học của tôi trong vòng 48h.</p>
		<p>Sau 48h, lớp học sẽ bị hủy!</p>
		<h3>Thư này không cần phản hồi. Xin cảm ơn!</h3>`;
		await sendMail(user.email, "Thư yêu cầu dạy", htmlBody);

		res.status(200).send(responseMessage(200, "send email successfully"));
	} catch (error) {
		res.status(500).send(responseMessage(500, JSON.stringify(error)));
	}
});

userRouterPrivate.get("/:userId", async (req: Request<{ userId: string }>, res: Response) => {

	const userId = req.params.userId;
	const mongo = MongoDb.getInstance();
	const db = await mongo.db;

	try {
		const user = await db.users.findOne({ _id: new ObjectId(userId) });

		res.status(200).send(fromDataEntity(user as UserEntity));
	} catch (error) {
		res.status(500).send(responseMessage(500, JSON.stringify(error)));
	}

});

// add notification 
userRouterPrivate.put("/notification/:userId", async (req: Request<{ userId: string }>, res: Response) => {

	const userId = req.params.userId;
	const mongo = MongoDb.getInstance();
	const db = await mongo.db;
	try {
		await db.users.findOneAndUpdate({ _id: new ObjectId(userId) }, { $addToSet: { notifications: req.body.notification } });

		res.status(200).send(responseMessage(200, "updated notification successfully!"));
	} catch (error) {
		res.status(500).send(responseMessage(500, JSON.stringify(error)));
	}

});

// update notification 
userRouterPrivate.put("/notification/:userId/active/:notificationId", async (req: Request<{ userId: string, notificationId: string }>, res: Response) => {

	const userId = req.params.userId;
	const notificationId = req.params.notificationId;
	const mongo = MongoDb.getInstance();
	const db = await mongo.db;
	try {
		await db.users.findOneAndUpdate({ _id: new ObjectId(userId), "notifications.id": notificationId }, { $set: { "notifications.$.active": true } });

		res.status(200).send(responseMessage(200, "updated notification successfully!"));
	} catch (error) {
		res.status(500).send(responseMessage(500, JSON.stringify(error)));
	}

});
