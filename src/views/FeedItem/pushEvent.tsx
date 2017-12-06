import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import IEvent from "../../data/interface/IEvent";
import { getTimeDiff } from "../../utils/DateTime";

interface PushEventProps {
    event: IEvent;
    style?: any;
}

interface PushEventState {}

export default class PushEvent extends React.PureComponent<
    PushEventProps,
    PushEventState
> {
    constructor(props) {
        super(props);
    }

    renderTitle = (event: IEvent) => {
        return (
            <View>
                <Text style={styles.headTitle}>
                    <Text style={{ fontWeight: "bold" }}>
                        {event.actor.display_login}
                    </Text>
                    <Text> pushed to </Text>
                    <Text style={{ fontWeight: "bold" }}>
                        {event.payload.ref.replace("refs/heads/", "")}
                    </Text>
                    <Text> in </Text>
                    <Text style={{ fontWeight: "bold" }}>
                        {event.repo.name}
                    </Text>
                </Text>
                {event.payload.commits.map(commit => {
                    return (
                        <Text key={commit.sha}>{`${commit.sha.substr(0, 7)} ${
                            commit.message
                        }`}</Text>
                    );
                })}
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
