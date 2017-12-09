import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import moment from "moment";
import IEvent from "../../data/interface/IEvent";
import { getTimeDiff } from "../../utils/DateTime";

interface MemberEventProps {
    event: IEvent;
    style?: any;
}

interface MemberEventState {}

export default class MemberEvent extends React.PureComponent<
    MemberEventProps,
    MemberEventState
> {
    constructor(props) {
        super(props);
    }

    renderTitle = (event: IEvent) => {
        const { payload, actor, repo } = event;
        return (
            <View style={styles.headTitle}>
                <Text style={{ flexWrap: "wrap" }}>
                    {actor.login}
                    <Text style={{ fontWeight: "bold" }}>{` ${
                        payload.action
                    } `}</Text>
                    {` ${payload.member.login} as a collaborator to `}
                    <Text style={{ fontWeight: "bold" }}>{repo.name}</Text>
                </Text>
            </View>
        );
    };

    renderMeta = (event: IEvent) => {
        return (
            <View style={styles.meta}>
                <Icon
                    style={{ fontSize: 15, color: "#aaa", marginRight: 10 }}
                    name="md-add"
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
