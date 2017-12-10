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
    Text
} from "native-base";
import IBaseScreenProps from "../../../data/interface/IBaseScreenProps";
import IssuesStore from "../../../store/IssuesStore";
import Issue from "../../../data/interface/Issue";

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

    componentDidMount() {
        console.log("IssuesTabScreen - componentDidMount");
        console.log(this.props.navigation.state);
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

    render() {
        const { store } = this;
        const { issueList, isLoading, isRefreshing } = store;
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
                        <Title>PocketGithub</Title>
                    </Body>
                    <Right />
                </Header>
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
