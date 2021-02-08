export declare type HookFn<HookValue = any> = () => HookValue;
export declare type StoreValueChangeCallback<HookValue> = (value: HookValue) => void;
export declare type StoresChangeCallback = () => void;
export declare class Store<HookValue = any> {
    private fn;
    name: string;
    subscribers: StoreValueChangeCallback<HookValue>[];
    cachedValue: HookValue | null;
    constructor(fn: HookFn<HookValue>);
    getCachedValue(): HookValue;
    useValue(): HookValue;
    subscribe(callback: StoreValueChangeCallback<HookValue>): () => void;
    notify(): void;
}
export declare class Container {
    stores: Map<HookFn<any>, Store<any>>;
    subscribers: StoresChangeCallback[];
    onStoresChanged(callback: StoresChangeCallback): () => void;
    createStore(fn: HookFn): Store<any>;
    getStore<HookValue>(fn: HookFn<HookValue>): Store<HookValue>;
    notifyStoresChanged(): void;
    getStoresArray(): Store<any>[];
}
export declare const createContainer: () => Container;
export declare const getContainer: () => Container;
export declare const replaceContainer: (mockedContainer: Container) => Container;
