import { Data, ImgParams } from './types';

interface Props {
    data: Data[];
    animDuration?: number;
    modelValue?: number;
    imgParams?: ImgParams;
    middleCircle?: boolean;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    animDuration: number;
    modelValue: number;
    middleCircle: boolean;
    imgParams: () => {
        src: string;
        width: number;
        height: number;
    };
}>>, {
    spin: () => Promise<void>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    done: (value: Data) => void;
    update: (value: Data) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    animDuration: number;
    modelValue: number;
    middleCircle: boolean;
    imgParams: () => {
        src: string;
        width: number;
        height: number;
    };
}>>> & Readonly<{
    onDone?: ((value: Data) => any) | undefined;
    onUpdate?: ((value: Data) => any) | undefined;
}>, {
    animDuration: number;
    modelValue: number;
    imgParams: ImgParams;
    middleCircle: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
