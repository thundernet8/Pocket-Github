import * as React from "react";
import { observer } from "mobx-react";
import { StyleSheet, ActivityIndicator, FlatList, View } from "react-native";
import {
    Container,
    Header,
    Left,
    Body,
    Button,
    Icon,
    Title,
    Right,
    Content,
    Text,
    Tab,
    Tabs,
    ScrollableTab
} from "native-base";
import IBaseScreenProps from "../../../data/interface/IBaseScreenProps";
import IssuesStore from "../../../store/IssuesStore";
import Issue from "../../../data/interface/Issue";
import { IssueFilter } from "../../../data/enum/Issue";

interface IssuesTabScreenProps extends IBaseScreenProps {}

interface IssuesTabScreenState {}

@observer
export default class IssuesTabScreen extends React.Component<
    IssuesTabScreenProps,
    IssuesTabScreenState
> {
    private store: IssuesStore;

    constructor(props) {
        super(props);
        this.store = IssuesStore.getInstance();
    }

    onChangeTab = ({ i, ref, from }) => {
        this.store.changeFilter(i);
    };

    componentDidMount() {
        console.log("IssuesTabScreen - componentDidMount");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    renderIssueItem = ({ item }: { item: Issue }) => {
        return (
            <View>
                <Text>{item.title}</Text>
            </View>
        );
    };

    renderListFooter = () => {
        const { isLoadingMore } = this.store;
        if (!isLoadingMore) {
            return null;
        }
        return (
            <View style={styles.listFooter}>
                <ActivityIndicator animating size="small" />
            </View>
        );
    };

    renderTabContent = (tab: IssueFilter) => {
        const { store } = this;
        const { issues, loading, refreshing } = store;
        const issueList = issues[tab];
        const isLoading = loading[tab];
        const isRefreshing = refreshing[tab];

        return (
            <Content>
                {issueList.length === 0 &&
                    isLoading && (
                        <View style={styles.loadingIndicator}>
                            <ActivityIndicator size="large" />
                        </View>
                    )}
                {issueList.length > 0 && (
                    <FlatList
                        keyExtractor={item => item.id}
                        style={styles.flatList}
                        data={issueList}
                        refreshing={isRefreshing}
                        onRefresh={store.refresh}
                        onEndReached={store.loadNextPage}
                        onEndReachedThreshold={0.1}
                        renderItem={this.renderIssueItem}
                        initialNumToRender={10}
                        ListFooterComponent={this.renderListFooter}
                    />
                )}
            </Content>
        );
    };

    render() {
        return (
            <Container style={styles.container}>
                <Header hasTabs>
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
                        <Title>PocketGithub</Title>
                    </Body>
                    <Right />
                </Header>
                <Tabs
                    onChangeTab={this.onChangeTab}
                    initialPage={0}
                    renderTabBar={() => <ScrollableTab />}
                >
                    <Tab heading={"CREATED" as any}>
                        {this.renderTabContent(IssueFilter.CREATED)}
                    </Tab>
                    <Tab heading={"ASSIGNED" as any}>
                        {this.renderTabContent(IssueFilter.ASSIGNED)}
                    </Tab>
                    <Tab heading={"MENTIONED" as any}>
                        {this.renderTabContent(IssueFilter.MENTIONED)}
                    </Tab>
                    <Tab heading={"SUBSCRIBED" as any}>
                        {this.renderTabContent(IssueFilter.SUBSCRIBED)}
                    </Tab>
                </Tabs>
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
