"use strict";
exports.__esModule = true;
/**
 * @see https://developer.github.com/v3/activity/events/types/
 */
var EventType;
(function (EventType) {
    EventType["CommitComment"] = "CommitCommentEvent";
    EventType["Create"] = "CreateEvent";
    EventType["Delete"] = "DeleteEvent";
    EventType["Deployment"] = "DeploymentEvent";
    EventType["DeploymentStatus"] = "DeploymentStatusEvent";
    EventType["Download"] = "DownloadEvent";
    EventType["Follow"] = "FollowEvent";
    EventType["Fork"] = "ForkEvent";
    EventType["ForkApply"] = "ForkApplyEvent";
    EventType["Gist"] = "GistEvent";
    EventType["Gollum"] = "GollumEvent";
    EventType["Installation"] = "InstallationEvent";
    EventType["InstallationRepositories"] = "InstallationRepositoriesEvent";
    EventType["IssueComment"] = "IssueCommentEvent";
    EventType["Issue"] = "IssueEvent";
    EventType["Label"] = "LabelEvent";
    EventType["MarketplacePurchase"] = "MarketplacePurchaseEvent";
    EventType["Member"] = "MemberEvent";
    EventType["Membership"] = "MembershipEvent";
    EventType["Milstone"] = "MilstoneEvent";
    EventType["Organization"] = "OrganizationEvent";
    EventType["OrgBlock"] = "OrgBlockEvent";
    EventType["PageBuild"] = "PageBuildEvent";
    EventType["ProjectCard"] = "ProjectCardEvent";
    EventType["ProjectColumn"] = "ProjectColumnEvent";
    EventType["Project"] = "ProjectEvent";
    EventType["Public"] = "PublicEvent";
    EventType["PullRequest"] = "PullRequestEvent";
    EventType["PullRequestReview"] = "PullRequestReviewEvent";
    EventType["PullRequestReviewComment"] = "PullRequestReviewCommentEvent";
    EventType["Push"] = "PushEvent";
    EventType["Release"] = "ReleaseEvent";
    EventType["Repository"] = "RepositoryEvent";
    EventType["Status"] = "StatusEvent";
    EventType["Team"] = "TeamEvent";
    EventType["TeamAdd"] = "TeamAddEvent";
    EventType["Watch"] = "WatchEvent";
})(EventType || (EventType = {}));
exports["default"] = EventType;
