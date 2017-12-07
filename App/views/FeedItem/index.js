import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import EventType from "../../data/enum/EventType";
import WatchEvent from "./watchEvent";
import CreateEvent from "./createEvent";
import PushEvent from "./pushEvent";
import PullRequestEvent from "./pullRequest";
import ForkEvent from "./forkEvent";
export default class FeedItem extends React.Component {
    constructor(props) {
        super(props);
        this.renderEvent = (event) => {
            switch (event.type) {
                case EventType.Watch:
                    return React.createElement(WatchEvent, { event: event, style: styles.text });
                case EventType.Create:
                    return React.createElement(CreateEvent, { event: event, style: styles.text });
                case EventType.Push:
                    return React.createElement(PushEvent, { event: event, style: styles.text });
                case EventType.PullRequest:
                    return React.createElement(PullRequestEvent, { event: event, style: styles.text });
                case EventType.Fork:
                    return React.createElement(ForkEvent, { event: event, style: styles.text });
                default:
                    return null;
            }
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { event } = this.props;
        return event.id !== nextProps.event.id;
    }
    render() {
        const { event } = this.props;
        console.log("render feed item");
        return (React.createElement(View, { style: styles.listItem },
            event.actor &&
                event.actor.avatar_url && (React.createElement(Avatar, { source: { uri: event.actor.avatar_url }, rounded: true, medium: true, width: 36, height: 36 })),
            React.createElement(View, { style: styles.text }, this.renderEvent(event))));
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
