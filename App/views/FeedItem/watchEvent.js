import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import EventAction from "../../data/enum/EventAction";
import { getTimeDiff } from "../../utils/DateTime";
export default class WatchEvent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.renderTitle = (event) => {
            switch (event.payload.action) {
                case EventAction.STARTED:
                    return (React.createElement(View, { style: styles.headTitle },
                        React.createElement(Text, { style: { fontWeight: "bold" } }, event.actor.display_login),
                        React.createElement(Text, null, " starred "),
                        React.createElement(Text, { style: { fontWeight: "bold" } }, event.repo.name)));
                default:
                    return React.createElement(Text, null, event.payload.action);
            }
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
