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
import MemberEvent from "./memberEvent";

interface FeedItemProps {
    event: IEvent;
    pushUserScreen: () => void;
    pushRepoScreen: () => void;
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
            case EventType.Member:
                return <MemberEvent event={event} style={styles.text} />;
            default:
                return null;
        }
    };

    render() {
        const { event, pushUserScreen, pushRepoScreen } = this.props;
        const showEventTypes = [
            EventType.Watch,
            EventType.Create,
            EventType.Push,
            EventType.PullRequest,
            EventType.Fork,
            EventType.Member
        ];
        if (!showEventTypes.includes(event.type)) {
            return null;
        }

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
                            onPress={pushUserScreen}
                        />
                    )}
                <View style={styles.text} onTouchEnd={pushRepoScreen}>
                    {this.renderEvent(event)}
                </View>
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
