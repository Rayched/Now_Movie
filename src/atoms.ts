//테마 상태를 확인하는 atom

import { atom, selector } from "recoil";

export interface I_MovieDatas {
    movieNm?: string;
    movieCd?: string;
    openDt?: string;
    posterURL?: string;
    plots?: string;
    director?: string;
};

export const isDark = atom({
    key: "isDark",
    default: false
});

export const MoviesData= atom<I_MovieDatas[]|undefined>({
    key: "MoviesData",
    default: []
});