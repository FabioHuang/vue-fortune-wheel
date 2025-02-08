import { Data, ImgParams } from '../types';

interface Props {
    data: Data[];
    imgParams?: ImgParams;
}
export declare function useWheelSize(props: Props): {
    wheelSize: import('vue').ComputedRef<{
        width: number;
        height: number;
    }>;
    fontSize: import('vue').ComputedRef<number>;
    wheelStyle: import('vue').ComputedRef<{
        width: string;
        height: string;
        fontSize: string;
        margin: string;
    }>;
};
export {};
