export interface INavigator {
    push: (params: any) => void;
    pop: (
        params: {
            animated: boolean;
            animationType: "fade" | "slide-horizontal";
        }
    ) => void;
    popToRoot: (
        params: {
            animated: boolean;
            animationType: "fade" | "slide-horizontal";
        }
    ) => void;
    resetTo: (params: any) => void;
    showModal: (
        params: {
            screen: string;
            title: string;
            passProps: any;
            navigatorStyle: any;
            animationType: "slide-up" | "none";
        }
    ) => void;
    dismissModal: (params: { animationType: "slide-down" | "none" }) => void;
    dismissAllModals: (
        params: { animationType: "slide-down" | "none" }
    ) => void;
    showLightBox: (
        params: {
            screen: string;
            passProps: any;
            style: any;
            adjustSoftInput: "resize" | "nothing" | "pan" | "unspecified";
        }
    ) => void;
    dismissLightBox: () => void;
    showInAppNotification: (
        params: {
            screen: string;
            passProps: any;
            autoDismissTimerSec: number;
        }
    ) => void;
    handleDeepLink: (params: { link: string }) => void;
    setButtons: (
        params: {
            leftButtons?: any[];
            rightButtons?: any[];
            animated?: boolean;
        }
    ) => void;
    setTitle: (params: { title: string }) => void;
    setSubTitle: (params: { subtitle: string }) => void;
    toggleDrawer: (
        params?: {
            side: "left" | "right";
            animated?: boolean;
            to?: "open" | "closed" | "missing";
        }
    ) => void;
    setDrawerEnabled: (
        params: { side: "left" | "right"; enabled: boolean }
    ) => void;
    toggleTabs: (params: { to: "hidden" | "shown"; animated: boolean }) => void;
    setTabBadge: (
        params: { tabIndex: number; badge: number; badgeColor: string }
    ) => void;
    setTabButton: (
        params: {
            tabIndex: number;
            icon: string;
            selectedIcon: string;
            label: string;
        }
    ) => void;
    switchToTab: (params: { tabIndex: number }) => void;
    toggleNavBar: (
        params: { to: "hidden" | "shown"; animated: boolean }
    ) => void;
    setOnNavigatorEvent: (callback: Function) => void;
    addOnNavigatorEvent: (callback: Function) => void;
}
