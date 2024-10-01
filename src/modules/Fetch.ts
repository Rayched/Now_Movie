//Fetch function 모음

import getDateTime from "./DateTime";

interface I_DailyBoxOffice {
    audiAcc: string;
    audiChange: string;
    audiCnt: string;
    audiInten: string;
    movieCd: string;
    movieNm: string;
    openDt: string;
    rank: string;
    rankInten: string;
    rankOldAndNew: string;
    rnum: string;
    salesAcc: string;
    salesAmt: string;
    salesChange: string;
    salesInten: string;
    salesShare: string;
    scrnCnt: string;
    showCnt: string;
};

interface I_Movies {
    movieNm: string;
    openDt: string;
    movieCd: string;
};

const Kofic_baseURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest";
const targetDt = getDateTime();

//KMDB, 영화 상세정보 데이터를 fetch하는 function
async function MoviesInfo(movie: I_Movies){
    const getInfoData = await(await(
        await fetch(
            `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title=${movie?.movieNm}&releaseDts=${movie?.openDt}&ServiceKey=5UPCXV6TPKSU1P8QHI31`
        )
    ).json()).Data[0].Result[0];

    const result = {
        movieNm: movie.movieNm,
        movieCd: movie.movieCd,
        openDt: movie.openDt,
        posterURL: getInfoData?.posters.split("|")[0],
        plots: getInfoData?.plots.plot[0].plotText,
        director: getInfoData?.directors.director[0].directorNm
    };

    return result;
};

//Kofic, 일일 박스오피스 데이터를 fetch하는 function
export async function MoviesData(){
    const DailyBoxOffice = await(await(
        await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=3a15c5393ac14d11f6b132d6a07f330c&targetDt=${targetDt}`)
    ).json()).boxOfficeResult.dailyBoxOfficeList;

    const getDailyData = await (
        DailyBoxOffice?.map((movies: I_DailyBoxOffice) => {
            return {
                movieNm: movies.movieNm,
                openDt: movies.openDt.split("-").join(""),
                movieCd: movies.movieCd
            };
        })
    );

    const getMovieInfos = await (
        getDailyData.map((movies: I_Movies) => MoviesInfo(movies))
    );

    const result = Promise.all(getMovieInfos).then((value) => value);

    return result;
};

//Kofic, 영화 상세정보 데이터를 fetch하는 function
export function DetailData(){
    const getDetailData = false;
    return getDetailData;
}
