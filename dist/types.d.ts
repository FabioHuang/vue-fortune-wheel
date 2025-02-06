export type Data = {
    id: number | {
        valueOf(): number;
    };
    value: string;
    bgColor: string;
    color: string;
};
export type ImgParams = {
    src: string;
    width: number;
    height: number;
};
