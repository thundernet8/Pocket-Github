/**
 * @see https://developer.github.com/v3/activity/events/types/
 */
enum EventType {
    CommitComment = "CommitCommentEvent",
    Create = "CreateEvent",
    Delete = "DeleteEvent",
    Deployment = "DeploymentEvent",
    DeploymentStatus = "DeploymentStatusEvent",
    Download = "DownloadEvent",
    Follow = "FollowEvent",
    Fork = "ForkEvent",
    ForkApply = "ForkApplyEvent",
    Gist = "GistEvent",
    Gollum = "GollumEvent",
    Installation = "InstallationEvent",
    InstallationRepositories = "InstallationRepositoriesEvent",
    IssueComment = "IssueCommentEvent",
    Issue = "IssueEvent",
    Label = "LabelEvent",
    MarketplacePurchase = "MarketplacePurchaseEvent",
    Member = "MemberEvent",
    Membership = "MembershipEvent",
    Milstone = "MilstoneEvent",
    Organization = "OrganizationEvent",
    OrgBlock = "OrgBlockEvent",
    PageBuild = "PageBuildEvent",
    ProjectCard = "ProjectCardEvent",
    ProjectColumn = "ProjectColumnEvent",
    Project = "ProjectEvent",
    Public = "PublicEvent",
    PullRequest = "PullRequestEvent",
    PullRequestReview = "PullRequestReviewEvent",
    PullRequestReviewComment = "PullRequestReviewCommentEvent",
    Push = "PushEvent",
    Release = "ReleaseEvent",
    Repository = "RepositoryEvent",
    Status = "StatusEvent",
    Team = "TeamEvent",
    TeamAdd = "TeamAddEvent",
    Watch = "WatchEvent"
}

export default EventType;
