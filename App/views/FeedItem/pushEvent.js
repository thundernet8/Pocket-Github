import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { getTimeDiff } from "../../utils/DateTime";
export default class PushEvent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.renderTitle = (event) => {
            return (React.createElement(View, null,
                React.createElement(Text, { style: styles.headTitle },
                    React.createElement(Text, { style: { fontWeight: "bold" } }, event.actor.display_login),
                    React.createElement(Text, null, " pushed to "),
                    React.createElement(Text, { style: { fontWeight: "bold" } }, event.payload.ref.replace("refs/heads/", "")),
                    React.createElement(Text, null, " in "),
                    React.createElement(Text, { style: { fontWeight: "bold" } }, event.repo.name)),
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
const styles = StyleSheet.create({
    headTitle: {
        flexDirection: "row"
    }
});
