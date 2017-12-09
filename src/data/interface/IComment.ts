import IUser from "./IUser";

export default interface IComment {
    url: string;
    html_url: string;
    issue_url: string;
    id: number;
    user: IUser;
    created_at: string;
    updated_at: string;
    author_association: "NONE" | "OWNER"; // TODO
    body: string;
}
