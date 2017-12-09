/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type meQueryVariables = {
    avatar_size: number;
};

export type meQuery = {
    // The currently authenticated user.
    viewer: {
        // The username used to login.
        login: string;
        // A URL pointing to the user's public avatar.
        avatarUrl: string;
        // The user's public profile bio.
        bio: string | null;
        // The user's public profile bio as HTML.
        bioHTML: string;
        // The user's public profile company.
        company: string | null;
        // The user's public profile company as HTML.
        companyHTML: string;
        // Identifies the date and time when the object was created.
        createdAt: string;
        // The user's publicly visible profile email.
        email: string;
        id: string;
        // Whether or not this user is a participant in the GitHub Security Bug Bounty.
        isBountyHunter: boolean;
        // Whether or not this user is a participant in the GitHub Campus Experts Program.
        isCampusExpert: boolean;
        // Whether or not this user is a GitHub Developer Program member.
        isDeveloperProgramMember: boolean;
        // Whether or not this user is a GitHub employee.
        isEmployee: boolean;
        // Whether or not the user has marked themselves as for hire.
        isHireable: boolean;
        // Whether or not this user is a site administrator.
        isSiteAdmin: boolean;
        // Whether or not this user is the viewing user.
        isViewer: boolean;
        // The user's public profile location.
        location: string | null;
        // The user's public profile name.
        name: string | null;
        // The HTTP path for this user
        resourcePath: string;
        // The HTTP URL for this user
        url: string;
        // Whether or not the viewer is able to follow the user.
        viewerCanFollow: boolean;
        // Whether or not this user is followed by the viewer.
        viewerIsFollowing: boolean;
        // A URL pointing to the user's public website/blog.
        websiteUrl: string | null;
    };
};
