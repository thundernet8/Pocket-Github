import * as React from "react";
import { View, Text } from "react-native";
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
                    <Text>{`${event.actor.display_login} starred ${
                        event.repo.name
                    }`}</Text>
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
