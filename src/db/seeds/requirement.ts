import { IRequirement, Method } from "../../models/IRequirement";
import { Sex } from "../../models/IUser";

export const requirements: Array<IRequirement> = [
	{
		userId: "",
		fullName: "Trần Văn Khánh",
		classAddress: "295 Bạch Mai - Hai Bà Trưng - Hà Nội",
		classCode: "BM-2353",
		class: 10,
		phone: "0834521758",
		fee: 120000,
		genderTeacher: Sex.male,
		method: Method.offline,
		startDay: new Date(),
		startTime: 18,
		timeOnDay: 1.5,
		subject: "Toán",
		description: "Yêu cầu gia sư Nam Bách Khoa đạt năm 3"
	},
	{
		userId: "",
		fullName: "Phạm Hồng Thắng",
		classAddress: "Quan Nhân - Thanh Xuân - Hà Nội",
		classCode: "BM-2323",
		class: 12,
		phone: "0834521728",
		fee: 130000,
		genderTeacher: Sex.male,
		method: Method.offline,
		startDay: new Date(),
		startTime: 18,
		timeOnDay: 2,
		subject: "Lý",
		description: "Có kinh nghiệm ôn lý thi đại học"
	},
];