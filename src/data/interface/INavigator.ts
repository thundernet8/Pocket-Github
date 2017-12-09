export interface INavigator {
    dispatch: (navigateAction: any) => void;
    state: {
        nav: {
            index: number;
            routes: any[];
        };
    };
    subs: {
        remove: Function;
    };
}

export interface INavigation {
    state: { key: string; routeName: string };
    dispatch: (navigateAction: any) => void;
    navigate: (id: string) => void;
    goBack: (routeName: null | string) => void;
    setParams: (params: any) => void;
}

export interface INavigationState {
    index: number; // identifies which route in the routes array is active
    routes: {
        // Each route needs a name, which routers will use to associate each route
        // with a react component
        routeName: string;

        // A unique id for this route, used to keep order in the routes array:
        key: string;

        // Routes can have any additional data. The included routers have `params`
        [prop: string]: any;
    }[];
}
