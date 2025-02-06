import { ComputedRef } from 'vue';
import { Data, ImgParams } from '../types';
import * as d3 from 'd3';
interface Props {
    data: Data[];
    middleCircle?: boolean;
    imgParams?: ImgParams;
}
interface State {
    pieGenerator: d3.Pie<any, Data> | null;
    arcGenerator: d3.Arc<any, d3.PieArcDatum<Data>> | null;
    arrow: SVGElement | null;
    container: SVGGElement | null;
    rayon: number;
    svg: SVGGElement | null;
    vis: SVGGElement | null;
}
export declare function useWheelCreation(state: State, props: Props, wheelSize: ComputedRef<{
    width: number;
    height: number;
}>): {
    createWheel: () => void;
    redrawWheel: () => void;
};
export {};
