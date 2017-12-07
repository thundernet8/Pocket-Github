import * as React from "react";
import { View, Text } from "react-native";
export default class LeftMenuScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(View, { style: { flex: 1, backgroundColor: "blue", width: 280 } },
            React.createElement(Text, { style: { color: "red" } }, "LeftMenuScreen")));
    }
}
