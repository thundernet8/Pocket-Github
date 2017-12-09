import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
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
        const { actor, repo } = event;
        return (
            <View style={styles.headTitle}>
                <Text style={{ flexWrap: "wrap" }}>
                    {`${actor.display_login} `}
                    <Text style={{ fontWeight: "bold" }}>created</Text>
                    {` a repository ${repo.name}`}
                </Text>
            </View>
        );
    };

    renderMeta = (event: IEvent) => {
        return (
            <View style={styles.meta}>
                <Icon
                    style={{ fontSize: 15, color: "#aaa", marginRight: 10 }}
                    name="md-albums"
                />
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
