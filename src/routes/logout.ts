import cookie from "cookie";
import { Request, Response } from "express";
import { responseMessage } from "../utils/responseMessage";

export const logout = async (req: Request, res: Response) => {

    res.setHeader("Set-Cookie", cookie.serialize("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    }));

    res.status(200).send(responseMessage(200, "signed out successfully!"));

};