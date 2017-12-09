import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
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
        const { repo, payload, actor } = event;
        return (
            <View>
                <Text style={styles.headTitle}>
                    {`${actor.display_login} `}
                    <Text style={{ fontWeight: "bold" }}>pushed</Text>
                    <Text style={{ fontWeight: "bold" }}>
                        {` to ${payload.ref.replace("refs/heads/", "")} in ${
                            repo.name
                        }`}
                    </Text>
                </Text>
                {payload.commits.map(commit => {
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
        return (
            <View style={styles.meta}>
                <Icon
                    style={{ fontSize: 15, color: "#aaa", marginRight: 10 }}
                    name="md-git-commit"
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
