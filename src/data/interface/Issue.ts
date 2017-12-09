import IUser from "./IUser";

export default interface Issue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    number: number;
    title: string;
    user: IUser;
    labels: IssueLabel[];
    state: "open" | "close"; // TODO
    locked: boolean;
    assignee: string;
    assignees: string[];
    milestone: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: string;
    author_association: "OWNER" | "NONE" | ""; // TODO
    body: string;
}

export interface IssueLabel {
    id: number;
    url: string;
    name: string;
    color: string; // e.g. 006b75
    default: boolean;
}
