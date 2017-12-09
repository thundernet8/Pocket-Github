import IUser from "./IUser";

export default interface IPullRequest {
    url: string;
    id: number;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    user: IUser;
    body: string;
    // TODO
}
