import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import moment from "moment";
import IEvent from "../../data/interface/IEvent";
import { getTimeDiff } from "../../utils/DateTime";

interface FormEventProps {
    event: IEvent;
    style?: any;
}

interface FormEventState {}

export default class FormEvent extends React.PureComponent<
    FormEventProps,
    FormEventState
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
                    <Text style={{ fontWeight: "bold" }}>forked</Text>
                    {` ${repo.name}`}
                </Text>
            </View>
        );
    };

    renderMeta = (event: IEvent) => {
        return (
            <View style={styles.meta}>
                <Icon
                    style={{ fontSize: 15, color: "#aaa", marginRight: 10 }}
                    name="md-git-branch"
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
