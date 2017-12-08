import * as React from "react";
import { TabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
import Screen from "../../data/enum/Screen";
import FeedsTabScreen from "./FeedsTab";
import IssuesTabScreen from "./IssuesTab";
import PullRequestsTabScreen from "./PRsTab";

const HomeScreenNavigator = TabNavigator(
    {
        [Screen.HOMEFeedsTab]: { screen: FeedsTabScreen },
        [Screen.HOMEIssuesTab]: { screen: IssuesTabScreen },
        [Screen.HOMEPRsTab]: { screen: PullRequestsTabScreen }
    },
    {
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            active={props.navigationState.index === 0}
                            onPress={() =>
                                props.navigation.navigate(Screen.HOMEFeedsTab)
                            }
                        >
                            <Icon name="bowtie" />
                            <Text>Feeds</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 1}
                            onPress={() =>
                                props.navigation.navigate(Screen.HOMEIssuesTab)
                            }
                        >
                            <Icon name="briefcase" />
                            <Text>Issues</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 2}
                            onPress={() =>
                                props.navigation.navigate(Screen.HOMEPRsTab)
                            }
                        >
                            <Icon name="headset" />
                            <Text>PullRequests</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    }
);

export default HomeScreenNavigator;
