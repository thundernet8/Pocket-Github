import * as React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import IEvent from "../../data/interface/IEvent";
import { getTimeDiff } from "../../utils/DateTime";

interface CreateEventProps {
    event: IEvent;
    style?: any;
}

interface CreateEventState {}

export default class CreateEvent extends React.PureComponent<
    CreateEventProps,
    CreateEventState
> {
    constructor(props) {
        super(props);
    }

    renderTitle = (event: IEvent) => {
        return (
            <Text>{`${event.actor.display_login} created a repository ${
                event.repo.name
            }`}</Text>
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
