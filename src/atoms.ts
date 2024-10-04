//테마 상태를 확인하는 atom

import { atom, selector} from "recoil";
import { I_Movies } from "./routes/Movies";

export const isDark = atom({
    key: "isDark",
    default: false
});

export const AllMovies= atom<I_Movies[]|undefined>({
    key: "Movies",
    default: []
});

export const Infos = selector({
    key: "Infos",
    get: ({get}) => {
        const movies = get(AllMovies);
        const getInfo = movies?.map((data) => {
            return {
                movidCd: data.movieCd,
                poster: data.posterURL,
                plot: data.plots
            }
        });

        return getInfo;
    }
});