import * as React from "react";
import { observer } from "mobx-react";
import { FlatList, View, Text } from "react-native";
import { Container, Content, Header, List, ListItem } from "native-base";
import IBaseScreenProps from "../../../data/interface/IBaseScreenProps";
// import GlobalStore from "../../../store/GlobalStore";
import FeedsStore from "../../../store/FeedsStore";
import IEvent from "../../../data/interface/IEvent";

interface FeedsTabScreenProps extends IBaseScreenProps {}

interface FeedsTabScreenState {}

@observer
export default class FeedsTabScreen extends React.PureComponent<
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
        return (
            <View key={item.id}>
                <Text>{item.id}></Text>
            </View>
        );
    };

    render() {
        const { events } = this.store;

        return (
            <Container>
                <Header />
                <Content>
                    <List>
                        <FlatList
                            data={events}
                            renderItem={this.renderEventItem}
                        />
                    </List>
                </Content>
            </Container>
        );
    }
}
