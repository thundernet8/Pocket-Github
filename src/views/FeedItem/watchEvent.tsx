import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
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
        switch (event.payload.action) {
            case EventAction.STARTED:
                return (
                    <View style={styles.headTitle}>
                        <Text style={{ fontWeight: "600", flexWrap: "wrap" }}>
                            <Text>{event.actor.display_login}</Text>
                            <Text style={{ fontWeight: "200" }}> starred </Text>
                            {event.repo.name}
                        </Text>
                    </View>
                );
            default:
                return <Text>{event.payload.action}</Text>;
        }
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
