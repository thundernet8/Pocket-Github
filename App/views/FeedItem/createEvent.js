import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { getTimeDiff } from "../../utils/DateTime";
export default class CreateEvent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.renderTitle = (event) => {
            return (React.createElement(View, { style: styles.headTitle },
                React.createElement(Text, { style: { fontWeight: "bold" } }, event.actor.display_login),
                React.createElement(Text, null, " created a repository "),
                React.createElement(Text, { style: { fontWeight: "bold" } }, event.repo.name)));
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
