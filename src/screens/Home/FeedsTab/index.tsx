import * as React from "react";
import { observer } from "mobx-react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import IBaseScreenProps from "../../../data/interface/IBaseScreenProps";
// import GlobalStore from "../../../store/GlobalStore";
import FeedsStore from "../../../store/FeedsStore";
import IEvent from "../../../data/interface/IEvent";
import FeedItemView from "../../../views/FeedItem";

interface FeedsTabScreenProps extends IBaseScreenProps {}

interface FeedsTabScreenState {}

@observer
export default class FeedsTabScreen extends React.Component<
    FeedsTabScreenProps,
    FeedsTabScreenState
> {
    static navigatorButtons = {};

    private store: FeedsStore;

    constructor(props) {
        super(props);
        this.store = FeedsStore.getInstance();
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    renderEventItem = ({ item }: { item: IEvent }) => {
        return <FeedItemView event={item} />;
    };

    renderListHeader = () => {
        const { refreshing } = this.store;
        if (!refreshing) {
            return null;
        }
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator size="small" />
            </View>
        );
    };

    renderListFooter = () => {
        const { loadingMore } = this.store;
        if (!loadingMore) {
            return null;
        }
        return (
            <View style={styles.listFooter}>
                <ActivityIndicator animating size="small" />
            </View>
        );
    };

    render() {
        const { store } = this;
        const { events, refreshing, loading } = store;

        return (
            <View style={styles.container}>
                {events.length === 0 &&
                    loading && (
                        <View style={styles.loadingIndicator}>
                            <ActivityIndicator size="large" />
                        </View>
                    )}
                {events.length > 0 && (
                    <FlatList
                        keyExtractor={item => item.id}
                        style={styles.flatList}
                        data={events}
                        refreshing={refreshing}
                        onRefresh={store.refresh}
                        onEndReached={store.loadNextPage}
                        onEndReachedThreshold={0}
                        renderItem={this.renderEventItem}
                        initialNumToRender={30}
                        // ListFooterComponent={this.renderListFooter}
                    />
                )}
                {this.renderListFooter()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        marginBottom: 0,
        padding: 0
        // alignItems: "stretch",
        // paddingBottom: 100
    },
    loadingIndicator: {
        paddingVertical: 20
    },
    flatList: {
        // height: 5000
        // backgroundColor: "blue"
    },
    listFooter: {
        paddingVertical: 20
    },
    listItem: {
        paddingVertical: 10
    }
});
