export interface Factory {
    id?: number;
    name: string;
};

export interface Widget {
    id?: number;
    name: string;
    cost: number;
    factory: number;
};

export interface State {
    entities: {
        users: {};
        repos: {};
        widgets: {
            [index: string]: Widget;
        };
    }
    pagination: any;
    routing: any;
}
