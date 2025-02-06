import { Data } from '../types';

interface Props {
    data: Data[];
    animDuration: number;
    modelValue: number;
}
interface State {
    rotation: number;
    vis: SVGGElement | null;
}
interface Emits {
    (e: 'done', value: Data): void;
}
export declare function useSpin(state: State, props: Props, emit: Emits): {
    spin: () => Promise<void>;
};
export {};
