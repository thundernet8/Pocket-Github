import * as React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import { getTimeDiff } from "../../utils/DateTime";
export default class CreateEvent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.renderTitle = (event) => {
            return (React.createElement(Text, null, `${event.actor.display_login} created a repository ${event.repo.name}`));
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
