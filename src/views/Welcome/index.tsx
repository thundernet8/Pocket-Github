import * as React from "react";

interface WelcomePageProps {}

interface WelcomePageState {}

export default class WelcomePage extends React.Component<
    WelcomePageProps,
    WelcomePageState
> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>WelcomePage</div>;
    }
}
