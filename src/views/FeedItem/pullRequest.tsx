import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
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
        const { actor, payload, repo } = event;

        let action = "";
        switch (payload.action) {
            case EventAction.CLOSED:
                action = "merged";
                break;
            default:
                action = payload.action;
        }

        return (
            <View style={styles.headTitle}>
                {actor.display_login}
                <Text style={{ fontWeight: "bold" }}>{action}</Text>
                {`pull request ${repo.name}#${payload.number}`}
            </View>
        );
    };

    renderMeta = (event: IEvent) => {
        return (
            <View style={styles.meta}>
                <Icon name="md-git-pull-request" />
                <Text>{getTimeDiff(moment(event.created_at))}</Text>
            </View>
        );
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
    },
    meta: {
        flexDirection: "row",
        marginTop: 5
    }
});
