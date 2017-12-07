import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import IEvent from "../../data/interface/IEvent";
import EventAction from "../../data/enum/EventAction";
import { getTimeDiff } from "../../utils/DateTime";

interface PullRequestEventProps {
    event: IEvent;
    style?: any;
}

interface PullRequestEventState {}

export default class PullRequestEvent extends React.PureComponent<
    PullRequestEventProps,
    PullRequestEventState
> {
    constructor(props) {
        super(props);
    }

    renderTitle = (event: IEvent) => {
        let action = "";
        switch (event.payload.action) {
            case EventAction.CLOSED:
                action = "merged";
                break;
            default:
                action = event.payload.action;
        }

        return (
            <View style={styles.headTitle}>
                <Text style={{ fontWeight: "bold" }}>
                    {event.actor.display_login}
                </Text>
                <Text>{` ${action} pull request `}</Text>
                <Text style={{ fontWeight: "bold" }}>{`${event.repo.name}#${
                    event.payload.number
                }`}</Text>
            </View>
        );
    };

    renderMeta = (event: IEvent) => {
        return <Text>{getTimeDiff(moment(event.created_at))}</Text>;
    };

    render() {
        const { event, style } = this.props;

        return (
            <View style={style || {}}>
                {this.renderTitle(event)}
                {this.renderMeta(event)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headTitle: {
        flexDirection: "row"
    }
});