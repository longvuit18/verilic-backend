import { NextFunction, Request, RequestHandler, Response } from "express";

export const auth = (): RequestHandler => {
	return (req: Request, res: Response, next: NextFunction) => {
		/**
		 * Operations, that don't need authentications
		 */

		if (req.method === "OPTIONS") {
			next();
			return;
		}

		if (req.path === "/login" || req.path === "/register" || req.path === "/login-for-seller") {
			next();
			return;
		}

		/**
		 * public routes, that don't need check authentications
		 *
		 */

		if (!req.path.startsWith("/auth")) {
			next();
			return;
		}
		/**
		 * Check JWT Authentications
		 */
		// const token = req.cookies?.token ?? "";
		// if (token === "") {
		//     res.status(401).send(responseMessage(401, "Invalid AuthCode"));
		//     return;
		// }
		// try {
		//     const decoded = jwt.verify(token, secretKey);
		//     if (decoded === undefined) {
		//         res.status(401).send(responseMessage(401, "Invalid AuthCode"));
		//         return;
		//     }
		// } catch (error) {
		//     res.status(401).send(responseMessage(401, error));
		//     return;
		// }

		next();

	};
};

