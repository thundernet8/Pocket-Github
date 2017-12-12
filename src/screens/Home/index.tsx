import * as React from "react";
import { TabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
import Screen from "../../data/enum/Screen";
import FeedsTabScreen from "./FeedsTab";
import IssuesTabScreen from "./IssuesTab";
import PullRequestsTabScreen from "./PRsTab";
import { INavigation, INavigationState } from "../../data/interface/INavigator";
import GlobalStore from "../../store/GlobalStore";

interface HomeTabBarProps {
    navigation: INavigation;
    navigationState: INavigationState;
}

class HomeTabBar extends React.Component<HomeTabBarProps> {
    navigateTab = (tabScreenId: Screen) => {
        GlobalStore.getInstance().changeScreen(tabScreenId);
        this.props.navigation.navigate(tabScreenId);
    };

    componentDidMount() {
        GlobalStore.getInstance().changeScreen(Screen.HOMEFeedsTab);
    }

    render() {
        const { navigationState } = this.props;
        return (
            <Footer>
                <FooterTab>
                    <Button
                        vertical
                        active={navigationState.index === 0}
                        onPress={this.navigateTab.bind(
                            this,
                            Screen.HOMEFeedsTab
                        )}
                    >
                        <Icon name="logo-rss" />
                        <Text>Feeds</Text>
                    </Button>
                    <Button
                        vertical
                        active={navigationState.index === 1}
                        onPress={this.navigateTab.bind(
                            this,
                            Screen.HOMEIssuesTab
                        )}
                    >
                        <Icon name="md-information-circle" />
                        <Text>Issues</Text>
                    </Button>
                    <Button
                        vertical
                        active={navigationState.index === 2}
                        onPress={this.navigateTab.bind(this, Screen.HOMEPRsTab)}
                    >
                        <Icon name="md-git-pull-request" />
                        <Text>PullRequests</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

const HomeScreenNavigator = TabNavigator(
    {
        [Screen.HOMEFeedsTab]: { screen: FeedsTabScreen },
        [Screen.HOMEIssuesTab]: { screen: IssuesTabScreen },
        [Screen.HOMEPRsTab]: { screen: PullRequestsTabScreen }
    },
    {
        tabBarPosition: "bottom",
        tabBarComponent: HomeTabBar
    }
);

export default HomeScreenNavigator;
