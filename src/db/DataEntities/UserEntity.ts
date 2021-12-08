import { ICredentials, IUser } from "../../models/IUser";
import { IDataEntity } from "../IDataEntity";

export type UserEntity = IDataEntity<IUser & { credentials?: ICredentials; }>;