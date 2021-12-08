import { json } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { auth } from "./middleware/auth";
import { login } from "./routes/login";
import { logout } from "./routes/logout";
import { userRouterPrivate } from "./routes/private/user";
import { userRouterPublic } from "./routes/public/user";
import { registerForUser } from "./routes/register";

export const app = express();
const port = process.env.PORT || 3000;

/**
 * Middleware
 */
app.enable("trust proxy");
app.use(cors({ credentials: true, origin: ["http://localhost:8080", "http://localhost:3000", "https://bemaster.vercel.app", "https://www.bemaster.edu.vn"], }));
app.use(cookieParser());
app.use(auth());
app.use(json());

/**
 * socket connection
 */

export const server = http.createServer(app);
// export const io = new Socket.Server(server, {
// 	cors: {
// 		origin: ["http://localhost:8080", "http://localhost:3000"],
// 		credentials: true,
// 		methods: ["GET", "POST"],
// 	},
// });

// // comment namespace
// export const CommentNamespace = new MySocket(io, "/comment", commentListener, commentMiddleware);
// CommentNamespace.connection();

// const NotificationNamespace = new MySocket(io, "/notification", notificationListener, notificationMiddleware);
// NotificationNamespace.connection();
/**
 * Private routes
 * 
 */

app.use("/auth/user", userRouterPrivate);
/**
 * Public routes
 * 
 */
app.use("/public", express.static("public"));

app.use("/user", userRouterPublic);

app.post("/login", login);
app.get("/logout", logout);
app.post("/register", registerForUser);
app.get("/", (req, res) => {
	res.send("hello world!!");
});
/**
 * server listen to port 5000
 */
server.listen(port, () => {
	console.info(`App started at: ${port}`);
});