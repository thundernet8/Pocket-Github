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
import { FlatList, View, Text } from "react-native";
import FeedsStore from "../../../store/FeedsStore";
let FeedsTabScreen = class FeedsTabScreen extends React.Component {
    constructor(props) {
        super(props);
        this.renderEventItem = ({ item }) => {
            return (React.createElement(View, null,
                React.createElement(Text, null,
                    item.id,
                    ">")));
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
        const { events } = this.store;
        return React.createElement(FlatList, { data: events, renderItem: this.renderEventItem });
    }
};
FeedsTabScreen.navigatorButtons = {};
FeedsTabScreen = __decorate([
    observer,
    __metadata("design:paramtypes", [Object])
], FeedsTabScreen);
export default FeedsTabScreen;
