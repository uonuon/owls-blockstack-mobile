import { FunctionComponent } from 'react';
import { AreEqual } from './shallow-equal';
import { HookFn } from './reusable';
export declare const ReusableProvider: FunctionComponent<{}>;
declare type SelectorFn<HookValue, SelectorValue> = (val: HookValue) => SelectorValue;
export declare function createStore<HookValue>(fn: HookFn<HookValue>): {
    (): HookValue;
    <SelectorValue = HookValue>(selector?: SelectorFn<HookValue, SelectorValue> | undefined, areEqual?: AreEqual<SelectorValue> | undefined): SelectorValue;
};
export {};
