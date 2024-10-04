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

interface I_Details {
    actors?: [{
        cast?: string,
        castEn?: string,
        peopleNm?: string,
        peopleNmEn?: string
    }];
    audits?: [{
        auditNo?: string,
        watchGradeNm?: string
    }];
    companys?: [{
        companyCd?: string,
        companyNm?: string,
        companyNmEn?: string,
        companyPartNm?: string
    }];
    directors?: [{
        peopleNm?: string,
        peopleNmEn?: string
    }];
    genres?: [{
        genreNm?: string
    }];
    movieCd?: string;
    movieNm?: string;
    movieNmEn?: string;
    movieNmOg?: string;
    nations?: [{
        nationNm?: string
    }];
    openDt?: string;
    prdtStatNm?: string;
    prdtYear?: string;
    showTm?: string;
    showTypes?: [{
        showTypeGroupNm?: string;
        showTypeNm?: string;
    }];
    staffs?: [{
        peopleNm?: string;
        peopleNmEn?: string;
        staffRoleNm?: string;
    }];
    typeNm?: string;
};

interface I_Movies {
    movieNm: string;
    openDt: string;
    movieCd: string;
};

const Kofic_baseURL = "https://www.kobis.or.kr/kobisopenapi/webservice/rest";
const Kofic_Key = "3a15c5393ac14d11f6b132d6a07f330c";

//KMDB, 영화 상세정보 데이터를 fetch하는 function
async function MoviesInfo(movie: I_Movies){
    const openDts = movie.openDt.split("-").join("");

    const getInfoData = await(await(
        await fetch(
            `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title=${movie?.movieNm}&releaseDts=${openDts}&ServiceKey=5UPCXV6TPKSU1P8QHI31`
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
export async function getDailyBoxOffice(){
    const targetDt = getDateTime();
    
    const DailyBoxOffice = await(await(
        await fetch(`${Kofic_baseURL}/boxoffice/searchDailyBoxOfficeList.json?key=${Kofic_Key}&targetDt=${targetDt}`)
    ).json()).boxOfficeResult.dailyBoxOfficeList;

    const getDailyData = await (
        DailyBoxOffice?.map((movies: I_DailyBoxOffice) => {
            return {
                movieNm: movies.movieNm,
                openDt: movies.openDt,
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
export async function DetailData(movieCd: string|undefined){
    const getDetailData: I_Details = await(await(
        await fetch(`${Kofic_baseURL}/movie/searchMovieInfo.json?key=${Kofic_Key}&movieCd=${movieCd}`)
    ).json()).movieInfoResult.movieInfo;

    const convert = [
        getDetailData?.openDt?.slice(0, 4), 
        getDetailData?.openDt?.slice(4, 6),
        getDetailData?.openDt?.slice(6)
    ];

    const convertDts = convert.join("-");

    const result = {
        movieNm: getDetailData.movieNm,
        movieCd: getDetailData.movieCd,
        openDt: convertDts,
        director: getDetailData?.directors?.map((data) => data.peopleNm),
        genres: getDetailData.genres?.map(({genreNm}) => genreNm),
        actors: getDetailData.actors?.map(({peopleNm}) => peopleNm).slice(0, 5),
    };

    return result;
}
