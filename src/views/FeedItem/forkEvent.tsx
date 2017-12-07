import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
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
        return (
            <View style={styles.headTitle}>
                <Text style={{ fontWeight: "600", flexWrap: "wrap" }}>
                    <Text>{event.actor.display_login}</Text>
                    <Text style={{ fontWeight: "200" }}> forked </Text>
                    {event.repo.name}
                </Text>
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
