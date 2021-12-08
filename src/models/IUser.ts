import { v4 as uuid } from "uuid";
export enum Role {
	student,
	teacher,
	parent
}

export interface ICredentials {
	passHash: string;
	salt: string;
}

export interface INotification {
	id: string;
	message: string;
	url: string;
	createdAt: Date;
	active: boolean;
}

export enum Sex {
	male,
	female
}

export interface IUser {
	/**
	 * Basic info
	 * @id not init in here, _id will initialize when it added in mongodb
	 */
	role: Role;
	fullName: string;
	dateOfBirth: Date;
	sex: Sex;
	email: string;
	address: string;
	phoneNumber: string;

	avatar: string;
	backgroundImage: string;

	createdAt: Date;
	notifications?: Array<INotification>;
	description: string;
	// teacher
	achievements: Array<string>;
	subjects: Array<string>;
	classes: Array<number>;
	rate: number;
	salary: number;

	// student
	class: number;
	// số buổi trong tuần
	sessions: Array<number>;
	// thời gian học/ buổi
	timeASession: number;

	// start Time
	startTime: number;

}

export class User implements IUser {
	id = uuid();
	role = Role.student;
	fullName = "";
	dateOfBirth = new Date();
	sex = Sex.male;
	email = "";
	address = "";
	phoneNumber = "";

	avatar = "";
	backgroundImage = "";

	createdAt = new Date();
	notifications = [];

	// teacher
	achievements = [];
	subjects = [];
	rate = 0;
	classes = [];
	salary = 100000;

	// student
	class = 1;
	// số buổi trong tuần
	sessions = [];
	// thời gian học/ buổi
	timeASession = 1.5;

	// start Time
	startTime = 18;
	description = "";
}
