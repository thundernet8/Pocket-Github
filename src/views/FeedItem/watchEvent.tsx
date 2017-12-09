import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import moment from "moment";
import EventAction from "../../data/enum/EventAction";
import IEvent from "../../data/interface/IEvent";
import { getTimeDiff } from "../../utils/DateTime";

interface WatchEventProps {
    event: IEvent;
    style?: any;
}

interface WatchEventState {}

export default class WatchEvent extends React.PureComponent<
    WatchEventProps,
    WatchEventState
> {
    constructor(props) {
        super(props);
    }

    renderTitle = (event: IEvent) => {
        const { payload, actor, repo } = event;
        switch (payload.action) {
            case EventAction.STARTED:
                return (
                    <View style={styles.headTitle}>
                        <Text style={{ flexWrap: "wrap" }}>
                            {`${actor.display_login} `}
                            <Text style={{ fontWeight: "bold" }}>starred</Text>
                            {` ${repo.name}`}
                        </Text>
                    </View>
                );
            default:
                return <Text>{payload.action}</Text>;
        }
    };

    renderMeta = (event: IEvent) => {
        let icon = "";
        switch (event.payload.action) {
            case EventAction.STARTED:
                icon = "md-star";
                break;
            default:
                return;
        }
        return (
            <View style={styles.meta}>
                {icon && (
                    <Icon
                        style={{ fontSize: 15, color: "#aaa", marginRight: 10 }}
                        name={icon}
                    />
                )}
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
