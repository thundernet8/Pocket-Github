/* tslint:disable */
//  This file was automatically generated and should not be edited.

// The possible states of an issue.
export enum IssueState {
    OPEN = "OPEN", // An issue that is still open
    CLOSED = "CLOSED" // An issue that has been closed
}

// The possible states of a pull request.
export enum PullRequestState {
    OPEN = "OPEN", // A pull request that is still open.
    CLOSED = "CLOSED", // A pull request that has been closed without being merged.
    MERGED = "MERGED" // A pull request that has been closed by being merged.
}

export type demoQueryVariables = {
    number_of_repos: number;
    name: string;
};

export type demoQuery = {
    // The currently authenticated user.
    viewer: {
        // The user's public profile name.
        name: string | null;
        // A list of public keys associated with this user.
        publicKeys: {
            // A list of nodes.
            nodes: Array<{
                id: string;
                // The public key string
                key: string;
            } | null> | null;
        };
        // The HTTP path for this user
        resourcePath: string;
        // A list of repositories that the user owns.
        repositories: {
            // A list of nodes.
            nodes: Array<{
                // The name of the repository.
                name: string;
            } | null> | null;
        };
    };
    // Look up a topic by name.
    topic: {
        id: string;
        // The topic's name.
        name: string;
        // A list of related topics, including aliases of this topic, sorted with the most relevant
        // first.
        //
        relatedTopics: Array<{
            // The topic's name.
            name: string;
        }>;
    } | null;
};

export type repoProjectsOpenQueryVariables = {
    owner: string;
    name: string;
    page?: string | null;
};

export type repoProjectsOpenQuery = {
    // Lookup a given repository by the owner and repository name.
    repository: {
        // A list of projects under the owner.
        projects: {
            // Identifies the total count of items in the connection.
            totalCount: number;
            // A list of edges.
            edges: Array<{
                // A cursor for use in pagination.
                cursor: string;
            } | null> | null;
            // Information to aid in pagination.
            pageInfo: {
                // When paginating forwards, are there more items?
                hasNextPage: boolean;
                // When paginating backwards, the cursor to continue.
                startCursor: string | null;
                // When paginating forwards, the cursor to continue.
                endCursor: string | null;
            };
            // A list of nodes.
            nodes: Array<{
                // The project's name.
                name: string;
                // The project's number.
                number: number;
                // The project's description body.
                body: string | null;
                // Identifies the date and time when the object was created.
                createdAt: string;
                id: string;
                // Check if the current viewer can update this object.
                viewerCanUpdate: boolean;
                // List of columns in the project
                columns: {
                    // Identifies the total count of items in the connection.
                    totalCount: number;
                };
                // Identifies the primary key from the database.
                databaseId: number | null;
            } | null> | null;
        };
    } | null;
};

export type repoProjectsClosedQueryVariables = {
    owner: string;
    name: string;
    page?: string | null;
};

export type repoProjectsClosedQuery = {
    // Lookup a given repository by the owner and repository name.
    repository: {
        // A list of projects under the owner.
        projects: {
            // Identifies the total count of items in the connection.
            totalCount: number;
            // A list of edges.
            edges: Array<{
                // A cursor for use in pagination.
                cursor: string;
            } | null> | null;
            // Information to aid in pagination.
            pageInfo: {
                // When paginating forwards, are there more items?
                hasNextPage: boolean;
                // When paginating backwards, the cursor to continue.
                startCursor: string | null;
                // When paginating forwards, the cursor to continue.
                endCursor: string | null;
            };
            // A list of nodes.
            nodes: Array<{
                // The project's name.
                name: string;
                // The project's number.
                number: number;
                // The project's description body.
                body: string | null;
                // Identifies the date and time when the object was created.
                createdAt: string;
                id: string;
                // Check if the current viewer can update this object.
                viewerCanUpdate: boolean;
                // List of columns in the project
                columns: {
                    // Identifies the total count of items in the connection.
                    totalCount: number;
                };
                // Identifies the primary key from the database.
                databaseId: number | null;
            } | null> | null;
        };
    } | null;
};

export type orgProjectsOpenQueryVariables = {
    owner: string;
    page?: string | null;
};

export type orgProjectsOpenQuery = {
    // Lookup a organization by login.
    organization: {
        // A list of projects under the owner.
        projects: {
            // Identifies the total count of items in the connection.
            totalCount: number;
            // A list of edges.
            edges: Array<{
                // A cursor for use in pagination.
                cursor: string;
            } | null> | null;
            // Information to aid in pagination.
            pageInfo: {
                // When paginating forwards, are there more items?
                hasNextPage: boolean;
                // When paginating backwards, the cursor to continue.
                startCursor: string | null;
                // When paginating forwards, the cursor to continue.
                endCursor: string | null;
            };
            // A list of nodes.
            nodes: Array<{
                // The project's name.
                name: string;
                // The project's number.
                number: number;
                // The project's description body.
                body: string | null;
                // Identifies the date and time when the object was created.
                createdAt: string;
                id: string;
                // Check if the current viewer can update this object.
                viewerCanUpdate: boolean;
                // List of columns in the project
                columns: {
                    // Identifies the total count of items in the connection.
                    totalCount: number;
                };
                // Identifies the primary key from the database.
                databaseId: number | null;
            } | null> | null;
        };
    } | null;
};

export type orgProjectsClosedQueryVariables = {
    owner: string;
    page?: string | null;
};

export type orgProjectsClosedQuery = {
    // Lookup a organization by login.
    organization: {
        // A list of projects under the owner.
        projects: {
            // Identifies the total count of items in the connection.
            totalCount: number;
            // A list of edges.
            edges: Array<{
                // A cursor for use in pagination.
                cursor: string;
            } | null> | null;
            // Information to aid in pagination.
            pageInfo: {
                // When paginating forwards, are there more items?
                hasNextPage: boolean;
                // When paginating backwards, the cursor to continue.
                startCursor: string | null;
                // When paginating forwards, the cursor to continue.
                endCursor: string | null;
            };
            // A list of nodes.
            nodes: Array<{
                // The project's name.
                name: string;
                // The project's number.
                number: number;
                // The project's description body.
                body: string | null;
                // Identifies the date and time when the object was created.
                createdAt: string;
                id: string;
                // Check if the current viewer can update this object.
                viewerCanUpdate: boolean;
                // List of columns in the project
                columns: {
                    // Identifies the total count of items in the connection.
                    totalCount: number;
                };
                // Identifies the primary key from the database.
                databaseId: number | null;
            } | null> | null;
        };
    } | null;
};

export type getColumnsQueryVariables = {
    owner: string;
    name: string;
    number: number;
};

export type getColumnsQuery = {
    // Lookup a given repository by the owner and repository name.
    repository: {
        // Find project by number.
        project: {
            // The project's name.
            name: string;
            // Check if the current viewer can update this object.
            viewerCanUpdate: boolean;
            // List of columns in the project
            columns: {
                // A list of nodes.
                nodes: Array<{
                    // The project column's name.
                    name: string;
                    // Identifies the date and time when the object was created.
                    createdAt: string;
                    id: string;
                    // List of cards in the column
                    cards: {
                        // A list of nodes.
                        nodes: Array<{
                            // The card note
                            note: string | null;
                            // Identifies the date and time when the object was created.
                            createdAt: string;
                            // The HTTP URL for this card
                            url: string;
                            // The card content item
                            content:
                                | (
                                      | {
                                            __typename: "Issue";
                                            // Identifies the issue title.
                                            title: string;
                                            // The HTTP URL for this issue
                                            url: string;
                                            // Identifies the issue number.
                                            number: number;
                                            // Identifies the state of the issue.
                                            issueState: IssueState;
                                            // Identifies the body of the issue.
                                            body: string;
                                            // The actor who authored the comment.
                                            author:
                                                | (
                                                      | {
                                                            // The username of the actor.
                                                            login: string;
                                                            // A URL pointing to the actor's public avatar.
                                                            avatarUrl: string;
                                                            // The HTTP URL for this actor.
                                                            url: string;
                                                        }
                                                      | {
                                                            // The username of the actor.
                                                            login: string;
                                                            // A URL pointing to the actor's public avatar.
                                                            avatarUrl: string;
                                                            // The HTTP URL for this actor.
                                                            url: string;
                                                        }
                                                      | {
                                                            // The username of the actor.
                                                            login: string;
                                                            // A URL pointing to the actor's public avatar.
                                                            avatarUrl: string;
                                                            // The HTTP URL for this actor.
                                                            url: string;
                                                        })
                                                | null;
                                        }
                                      | {
                                            __typename: "PullRequest";
                                            // Identifies the pull request title.
                                            title: string;
                                            // The HTTP URL for this pull request.
                                            url: string;
                                            // Identifies the pull request number.
                                            number: number;
                                            // Identifies the state of the pull request.
                                            PrState: PullRequestState;
                                            // Identifies the body of the pull request.
                                            body: string;
                                            // The actor who authored the comment.
                                            author:
                                                | (
                                                      | {
                                                            // The username of the actor.
                                                            login: string;
                                                            // A URL pointing to the actor's public avatar.
                                                            avatarUrl: string;
                                                            // The HTTP URL for this actor.
                                                            url: string;
                                                        }
                                                      | {
                                                            // The username of the actor.
                                                            login: string;
                                                            // A URL pointing to the actor's public avatar.
                                                            avatarUrl: string;
                                                            // The HTTP URL for this actor.
                                                            url: string;
                                                        }
                                                      | {
                                                            // The username of the actor.
                                                            login: string;
                                                            // A URL pointing to the actor's public avatar.
                                                            avatarUrl: string;
                                                            // The HTTP URL for this actor.
                                                            url: string;
                                                        })
                                                | null;
                                        })
                                | null;
                        } | null> | null;
                    };
                } | null> | null;
            };
        } | null;
    } | null;
};
