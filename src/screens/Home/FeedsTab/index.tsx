import * as React from "react";
import { View, Text, Image } from "react-native";
import { observer } from "mobx-react";
import IBaseScreenProps from "../../../data/interface/IBaseScreenProps";
import GlobalStore from "../../../store/GlobalStore";
// import FeedsStore from "../../../store/FeedsStore";

interface FeedsTabScreenProps extends IBaseScreenProps {}

interface FeedsTabScreenState {}

@observer
export default class FeedsTabScreen extends React.Component<
    FeedsTabScreenProps,
    FeedsTabScreenState
> {
    static navigatorButtons = {};

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        const globalStore = GlobalStore.getInstance();
        const { me } = globalStore;

        return (
            <View>
                <Text>FeedsTabScreen - {me && me.bio}</Text>
                {me && (
                    <Image
                        source={{ uri: me.avatarUrl }}
                        style={{ width: 400, height: 400 }}
                    />
                )}
            </View>
        );
    }
}
