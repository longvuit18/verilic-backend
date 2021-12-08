/* eslint-disable max-len */
import { buySalt, hashPassword } from "../../libs/hash";
import { ICredentials, IUser, Role, Sex, User } from "../../models/IUser";

const salt = buySalt();
export const users: Array<Omit<IUser, "id"> & { credentials?: ICredentials; }> = [
	{
		... new User(),
		fullName: "Ngô Thị Hồng Hạnh",
		sex: Sex.female,
		email: "test1@bemaster.com",
		role: Role.teacher,
		avatar: "https://scontent.fhan4-3.fna.fbcdn.net/v/t1.6435-9/240048811_2994246090860105_6131145023123663609_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=LfzAE_CHx0cAX97n_DK&_nc_ht=scontent.fhan4-3.fna&oh=61e9b7480aeef8bbd906443d931a7696&oe=614DDF6F",
		backgroundImage: "https://kenh14cdn.com/2019/7/9/6575069912907021277727421136490664834367488o-1562670352058565980013.jpg",
		address: "Quận 8 - Hồ Chí Minh",
		classes: [10, 11, 12],
		subjects: ["Anh", "Văn"],
		description: "Có kinh nghiệm 2 năm là gia sư môn văn và anh",
		phoneNumber: "0834258452",
		dateOfBirth: new Date("04-12-2000"),
		salary: 120000,

		credentials: {
			salt,
			passHash: hashPassword("123456", salt)
		}
	},

	{
		... new User(),
		fullName: "Nguyễn Vân Anh",
		sex: Sex.female,
		email: "test2@bemaster.com",
		role: Role.teacher,
		avatar: "https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-1/s320x320/106177516_1158859234474623_4658873139697947654_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=RlXApcalSqgAX-w6Uny&_nc_ht=scontent.fhan3-2.fna&oh=4147104fb870c2d165f8fc0bedee51f7&oe=614FE412",
		backgroundImage: "https://kenh14cdn.com/2019/7/9/6575069912907021277727421136490664834367488o-1562670352058565980013.jpg",
		address: "Thanh Xuân - Hà Nội",
		classes: [8, 9],
		subjects: ["Toán", "Lý", "Anh"],
		description: "Đạt Ielts 6.5, Có kinh nghiệm ôn thi chuyên cấp 3",
		phoneNumber: "0834254450",
		dateOfBirth: new Date("05-08-1999"),
		salary: 130000,

		credentials: {
			salt,
			passHash: hashPassword("123456", salt)
		}
	},

	{
		...new User(),
		credentials: {
			salt,
			passHash: hashPassword("123456", salt)

		},
		fullName: "Nguyễn Phương Linh ",
		sex: Sex.female, email: "anhha112000@gmail.com",
		role: Role.teacher,
		avatar: "https://scontent.fhan3-4.fna.fbcdn.net/v/t1.6435-9/46518665_703867970013311_1715862279683047424_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=GwlXMon-IbcAX_m9JCw&_nc_ht=scontent.fhan3-4.fna&oh=e7789542b36f0f37e4ac9a8157ab7a80&oe=6153DB6A",
		backgroundImage: "https://scontent.fhan4-1.fna.fbcdn.net/v/t1.15752-9/240682782_1268379126943112_2683387194577898087_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=BK3kK_NNpHcAX9-yd7H&_nc_ht=scontent.fhan4-1.fna&oh=97f11950bf423e0c06f9810ad4bfe68e&oe=61531511",
		address: "Hoàn Kiếm - Hà Nội",
		salary: 250000,
		classes: [10, 11, 12],
		subjects: ["Toán", "Tiếng Anh"],
		description: "Có kinh nghiệm 2 năm là gia sư ",
		phoneNumber: "e8342688078",
		dateOfBirth: new Date("06-21-2000"),

	},

	{
		...new User(),
		credentials: {
			salt,
			passHash: hashPassword("123456", salt)

		},
		salary: 150000,
		fullName: "Đặng Tuấn Hoàng",
		sex: Sex.male, email: "nthonghue81@gmail.com",
		role: Role.teacher,
		avatar: "https://scontent.fhan4-1.fna.fbcdn.net/v/t1.15752-9/240771910_542990983687191_684679418280492391_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=xglKa8kt3YcAX8A0tjI&tn=jJeX-tvYaIXwX6Bs&_nc_ht=scontent.fhan4-1.fna&oh=e072f94252515e7e3be8083b534d3b35&oe=61503053",
		backgroundImage: "https://scontent.fhan4-1.fna.fbcdn.net/v/t1.15752-9/240682782_1268379126943112_2683387194577898087_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=BK3kK_NNpHcAX9-yd7H&_nc_ht=scontent.fhan4-1.fna&oh=97f11950bf423e0c06f9810ad4bfe68e&oe=61531511",
		address: "Hà Đông - Hà Nội",
		classes: [10, 11],
		subjects: ["Toán", "Hóa"],
		description: "Có kinh nghiệm 2 năm là gia sư Toán và Hóa, điểm thi đại học 26 ",
		phoneNumber: "083464728",
		dateOfBirth: new Date("9-29-2000"),

	},

	{
		...new User(),
		credentials: {
			salt,
			passHash: hashPassword("123456", salt)

		},
		salary: 180000,
		fullName: "Chu Anh Tuấn",
		sex: Sex.male, email: "18a10010210@students.hou.edu.vn",
		role: Role.teacher,
		avatar: "https://scontent.fhan3-3.fna.fbcdn.net/v/t1.6435-9/127242389_952782068582101_3101824989543541534_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=BoWQVRxO6BcAX8nlBIV&_nc_ht=scontent.fhan3-3.fna&oh=200884eed35b7f4fde64b686eb6af1e4&oe=6150F07E",
		backgroundImage: "https://scontent.fhan4-1.fna.fbcdn.net/v/t1.15752-9/240682782_1268379126943112_2683387194577898087_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=BK3kK_NNpHcAX9-yd7H&_nc_ht=scontent.fhan4-1.fna&oh=97f11950bf423e0c06f9810ad4bfe68e&oe=61531511",
		address: "Quận 2 - Hồ Chí Minh",
		classes: [7, 8, 9],
		subjects: ["Toán", "Tiếng Anh"],
		description: "Sinh viên năm 3 học viện Ngân Hàng- Khoa Quản Trị Kinh Doanh",
		phoneNumber: "e8342655581",
		dateOfBirth: new Date("06-11-2000"),

	},

	{
		...new User(),
		credentials: {
			salt,
			passHash: hashPassword("123456", salt)

		},
		salary: 80000,
		fullName: "Nguyễn Trần Thảo Anh ",
		sex: Sex.female, email: "dogiael249@gmail.com",
		role: Role.teacher,
		avatar: "https://scontent.fhan3-5.fna.fbcdn.net/v/t1.15752-9/236395073_967798660620373_844577538544044068_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=ae9488&_nc_ohc=GGOA8JfgL5QAX-kuz8Q&_nc_oc=AQljxcG4m4HwuZwnqxHGZV32uIutl0SYW1mC7LW0_60EcvIcR9e-CYZORGPDGekgtVE&tn=jJeX-tvYaIXwX6Bs&_nc_ht=scontent.fhan3-5.fna&oh=25b40f86eec8e849fc19f02aa2c4684d&oe=61516E2B",
		backgroundImage: "https://scontent.fhan4-1.fna.fbcdn.net/v/t1.15752-9/240682782_1268379126943112_2683387194577898087_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=BK3kK_NNpHcAX9-yd7H&_nc_ht=scontent.fhan4-1.fna&oh=97f11950bf423e0c06f9810ad4bfe68e&oe=61531511",
		address: "Số 118- Đống Đa - Hà Nội",
		classes: [8, 9, 10, 11],
		subjects: ["Toán", "Hóa",],
		description: "Có kinh nghiệm 2 năm là gia sư Toán, Hóa, Sinh",
		phoneNumber: "e8342685786",
		dateOfBirth: new Date("03-08-2002"),

	},

	{
		...new User(),
		credentials: {
			salt,
			passHash: hashPassword("123456", salt)

		},
		salary: 120000,
		fullName: "Trần Phương Anh ",
		sex: Sex.female, email: "vanh1612000@gmail.com",
		role: Role.teacher,
		avatar: "https://scontent.fhan4-3.fna.fbcdn.net/v/t1.15752-9/149622690_2960717610817681_5608297231858103231_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=ADSPZ99AZGMAX8XELte&tn=jJeX-tvYaIXwX6Bs&_nc_ht=scontent.fhan4-3.fna&oh=ceffc392200ca4cc2b708edb885443fc&oe=6151D88D",
		backgroundImage: "https://scontent.fhan4-1.fna.fbcdn.net/v/t1.15752-9/240682782_1268379126943112_2683387194577898087_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=BK3kK_NNpHcAX9-yd7H&_nc_ht=scontent.fhan4-1.fna&oh=97f11950bf423e0c06f9810ad4bfe68e&oe=61531511",
		address: "Hai Bà Trưng - Hà Nội",
		classes: [10, 11, 12],
		subjects: ["Toán", "Hóa"],
		description: "Đạt 27 điểm thi đại học, là học sinh năm 1 trường ĐH Kinh tế Quốc Dân",
		phoneNumber: "e8342678210",
		dateOfBirth: new Date("07-22-2001"),

	},

	{
		...new User(),
		credentials: {
			salt,
			passHash: hashPassword("123456", salt)

		},
		salary: 120000,
		fullName: "Lương Bích Thảo ",
		sex: Sex.female, email: "dohuonggiang139@gmail.com",
		role: Role.teacher,
		avatar: "https://scontent.fhan4-3.fna.fbcdn.net/v/t1.15752-9/240539381_433219354688283_8928570892695674558_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=ETrNKhKuCoUAX9wMAlh&_nc_ht=scontent.fhan4-3.fna&oh=e502227425bb69eba2b2989ec72c24ad&oe=6153CE74",
		backgroundImage: "https://scontent.fhan4-1.fna.fbcdn.net/v/t1.15752-9/240682782_1268379126943112_2683387194577898087_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=BK3kK_NNpHcAX9-yd7H&_nc_ht=scontent.fhan4-1.fna&oh=97f11950bf423e0c06f9810ad4bfe68e&oe=61531511",
		address: "Thanh Xuân - Hà Nội",
		classes: [3, 4, 5],
		subjects: ["Toán", "Tiếng Anh"],
		description: "Là sinh viên năm 2 trường đại học Kinh tế Quốc Dân",
		phoneNumber: "e8342645678",
		dateOfBirth: new Date("11-28-2001"),

	},

];