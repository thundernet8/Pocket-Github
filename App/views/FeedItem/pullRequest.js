import * as React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import EventAction from "../../data/enum/EventAction";
import { getTimeDiff } from "../../utils/DateTime";
export default class PullRequestEvent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.renderTitle = (event) => {
            let action = "";
            switch (event.payload.action) {
                case EventAction.CLOSED:
                    action = "merged";
                    break;
                default:
                    action = event.payload.action;
            }
            return (React.createElement(View, null,
                React.createElement(Text, null, `${event.actor.display_login} ${action} pull request ${event.repo.name}#${event.payload.number}`)));
        };
        this.renderMeta = (event) => {
            return React.createElement(Text, null, getTimeDiff(moment(event.created_at)));
        };
    }
    render() {
        const { event, style } = this.props;
        return (React.createElement(View, { style: style || {} },
            this.renderTitle(event),
            this.renderMeta(event)));
    }
}
