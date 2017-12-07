import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import EventType from "../../data/enum/EventType";
import IEvent from "../../data/interface/IEvent";
import WatchEvent from "./watchEvent";
import CreateEvent from "./createEvent";
import PushEvent from "./pushEvent";
import PullRequestEvent from "./pullRequest";
import ForkEvent from "./forkEvent";

interface FeedItemProps {
    event: IEvent;
}

interface FeedItemState {}

export default class FeedItem extends React.Component<
    FeedItemProps,
    FeedItemState
> {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { event } = this.props;
        return event.id !== nextProps.event.id;
    }

    renderEvent = (event: IEvent) => {
        switch (event.type) {
            case EventType.Watch:
                return <WatchEvent event={event} style={styles.text} />;
            case EventType.Create:
                return <CreateEvent event={event} style={styles.text} />;
            case EventType.Push:
                return <PushEvent event={event} style={styles.text} />;
            case EventType.PullRequest:
                return <PullRequestEvent event={event} style={styles.text} />;
            case EventType.Fork:
                return <ForkEvent event={event} style={styles.text} />;
            default:
                return null;
        }
    };

    render() {
        const { event } = this.props;
        console.log("render feed item");
        return (
            <View style={styles.listItem}>
                {event.actor &&
                    event.actor.avatar_url && (
                        <Avatar
                            source={{ uri: event.actor.avatar_url }}
                            rounded
                            medium
                            width={36}
                            height={36}
                        />
                    )}
                <View style={styles.text}>{this.renderEvent(event)}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        display: "flex",
        flexDirection: "row"
    },
    avatar: {
        flex: 0
    },
    text: {
        flex: 1,
        paddingHorizontal: 10
    }
});
