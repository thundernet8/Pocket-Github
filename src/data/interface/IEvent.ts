import EventType from "../enum/EventType";
import EventAction from "../enum/EventAction";
import Issue from "../interface/Issue";
import ICommit from "../interface/ICommit";
import IPullRequest from "../interface/IPullRequest";
import IMember from "../interface/IMember";

interface IRepo {
    id: number;
    name: string;
    url: string;
}

interface IActor {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
}

interface IOrg {
    id: number;
    login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
}

interface IPayload {
    action?: EventAction;
    issue?: Issue;
    ref?: string;
    ref_type?: "repository" | ""; // TODO more
    master_branch?: string;
    description?: string;
    pusher_type?: "user" | ""; // TODO more
    commits: ICommit[];
    pull_request?: IPullRequest;
    number?: number;
    member?: IMember;
}

export default interface IEvent {
    id: string;
    type: EventType;
    payload: IPayload;
    repo: IRepo;
    actor: IActor;
    // "public": true,
    created_at: string;
    org: IOrg;
};
