var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as React from "react";
import { observer } from "mobx-react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import FeedsStore from "../../../store/FeedsStore";
import FeedItemView from "../../../views/FeedItem";
let FeedsTabScreen = class FeedsTabScreen extends React.Component {
    constructor(props) {
        super(props);
        this.renderEventItem = ({ item }) => {
            return React.createElement(FeedItemView, { event: item });
        };
        this.renderListHeader = () => {
            const { refreshing } = this.store;
            if (!refreshing) {
                return null;
            }
            return (React.createElement(View, { style: { flex: 1 } },
                React.createElement(ActivityIndicator, { size: "small" })));
        };
        this.renderListFooter = () => {
            const { loadingMore } = this.store;
            if (!loadingMore) {
                return null;
            }
            return (React.createElement(View, { style: styles.listFooter },
                React.createElement(ActivityIndicator, { animating: true, size: "small" })));
        };
        this.store = FeedsStore.getInstance();
    }
    componentDidMount() {
        console.log("componentDidMount");
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
    render() {
        const { store } = this;
        const { events, refreshing, loading } = store;
        return (React.createElement(View, { style: styles.container },
            events.length === 0 &&
                loading && (React.createElement(View, { style: styles.loadingIndicator },
                React.createElement(ActivityIndicator, { size: "large" }))),
            events.length > 0 && (React.createElement(FlatList, { keyExtractor: item => item.id, style: styles.flatList, data: events, refreshing: refreshing, onRefresh: store.refresh, onEndReached: store.loadNextPage, onEndReachedThreshold: 0.1, renderItem: this.renderEventItem, initialNumToRender: 30, ListFooterComponent: this.renderListFooter }))));
    }
};
FeedsTabScreen.navigatorButtons = {};
FeedsTabScreen = __decorate([
    observer,
    __metadata("design:paramtypes", [Object])
], FeedsTabScreen);
export default FeedsTabScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        margin: 0,
        padding: 0,
        borderWidth: 2,
        borderColor: "red"
    },
    loadingIndicator: {
        paddingVertical: 20
    },
    flatList: {
        flex: 1
    },
    listFooter: {
        paddingVertical: 20
    },
    listItem: {
        paddingVertical: 10
    }
});
