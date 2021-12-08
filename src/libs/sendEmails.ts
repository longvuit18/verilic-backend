import nodeMailer from "nodemailer";
import { serverConfigPrivate } from "../serverConfig";
export const sendMail = async (receiver: string, subject: string, htmlBody: string, host?: string): Promise<void> => {

	try {
		const transporter = nodeMailer.createTransport({
			host: host || "smtp.gmail.com",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: serverConfigPrivate.user, // generated ethereal user
				pass: serverConfigPrivate.password, // generated ethereal password
			},
		});

		await transporter.sendMail({
			from: `BeMaster ${serverConfigPrivate.user}`, // sender address
			to: receiver, // list of receivers
			subject: subject, // Subject line
			html: htmlBody, // html body
		});
	} catch (error) {
		console.error(error);
	}

};