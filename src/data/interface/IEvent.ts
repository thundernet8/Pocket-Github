import EventType from "../enum/EventType";
import Issue from "../interface/Issue";

interface Repo {
    id: number;
    name: string;
    url: string;
}

interface Actor {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
}

interface Org {
    id: number;
    login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
}

interface Payload {
    action?: "started" | "created"; // TODO more
    issue?: Issue;
    ref?: string;
    ref_type?: "repository" | ""; // TODO more
    master_branch?: string;
    description?: string;
    pusher_type?: "user" | ""; // TODO more
}

export default interface Event {
    type: EventType;
    payload: Payload;
    repo: Repo;
    actor: Actor;
    // "public": true,
    created_at: string;
    org: Org;
}
