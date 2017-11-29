import React from "react";

interface HomePageProps {}

interface HomePageState {}

export default class HomePage extends React.Component<
    HomePageProps,
    HomePageState
> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>HomePage</div>;
    }
}
