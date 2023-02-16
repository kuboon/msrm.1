import { FileDB, Document } from "../deps.ts";
import { IToken } from "../utils/token.ts";

interface IAsk extends Document {
  username?: string;
  q?: string,
  satoshi?: number,
  created?: Date,
}

interface IAuthenticator extends Document {
    credId: string,
    publicKey: string,
    type: string,
    transports: string[],
    counter: number,
    created: Date,
}

// main.ts
interface IUser extends Document {
    userName?: string;
    name?: string;
    registered?: boolean;
    id?: string;
    authenticators?: IAuthenticator[];
    oneTimeToken?: IToken;
    recoveryEmail?: string;
}

// https://deno.land/x/filedb@0.0.6
const database = new FileDB({ rootDir: "./db/data", isAutosave: true });

// Example
// const users = await database.getCollection<IUser>("users"); // implicitly create and get User collection

export { database };
export type { IAsk, IUser, IAuthenticator };
export const asksCollection = () => database.getCollection<IAsk>("asks");
export const usersCollection = () => database.getCollection<IUser>("users");
