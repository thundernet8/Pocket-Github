import * as React from "react";
import { observer } from "mobx-react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import {
    Container,
    Header,
    Left,
    Body,
    Button,
    Icon,
    Title,
    Right
} from "native-base";
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
    static navigationOptions = {
        drawerLabel: "Home"
        // drawerIcon: ({ tintColor }) => (
        //   <Image
        //     source={require('./chats-icon.png')}
        //     style={[styles.icon, {tintColor: tintColor}]}
        //   />
        // ),
    };

    private store: FeedsStore;

    constructor(props) {
        super(props);
        this.store = FeedsStore.getInstance();
    }

    componentDidMount() {
        console.log("componentDidMount");
        console.log(this.props);
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
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() =>
                                this.props.navigation.navigate("DrawerOpen")
                            }
                        >
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Feeds</Title>
                    </Body>
                    <Right />
                </Header>
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
                        onEndReachedThreshold={0.1}
                        renderItem={this.renderEventItem}
                        initialNumToRender={30}
                        ListFooterComponent={this.renderListFooter}
                    />
                )}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        margin: 0,
        padding: 0
        // borderWidth: 2,
        // borderColor: "red"
        // height: 600
        // alignItems: "stretch",
        // paddingBottom: 100
    },
    loadingIndicator: {
        paddingVertical: 20
    },
    flatList: {
        // height: 5000
        flex: 1
        // backgroundColor: "blue"
    },
    listFooter: {
        paddingVertical: 20
    },
    listItem: {
        paddingVertical: 10
    }
});
