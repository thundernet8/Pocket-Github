import * as React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import { getTimeDiff } from "../../utils/DateTime";
export default class PushEvent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.renderTitle = (event) => {
            return (React.createElement(View, null,
                React.createElement(Text, null, `${event.actor.display_login} pushed to ${event.payload.ref.replace("refs/heads/", "")} in ${event.repo.name}`),
                event.payload.commits.map(commit => {
                    return (React.createElement(Text, { key: commit.sha }, `${commit.sha.substr(0, 7)} ${commit.message}`));
                })));
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
