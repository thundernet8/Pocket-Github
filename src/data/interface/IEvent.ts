import EventType from "../enum/EventType";
import Issue from "../interface/Issue";

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
    action?: "started" | "created"; // TODO more
    issue?: Issue;
    ref?: string;
    ref_type?: "repository" | ""; // TODO more
    master_branch?: string;
    description?: string;
    pusher_type?: "user" | ""; // TODO more
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
