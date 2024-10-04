import { useQuery } from "react-query";
import styled from "styled-components";
import ThemeBtn from "../modules/ThemeBtn";
import { getDailyBoxOffice } from "../modules/Fetch";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { AllMovies } from "../atoms";
import { useEffect } from "react";

export interface I_Movies {
    movieNm?: string;
    movieCd?: string;
    openDt?: string;
    posterURL?: string;
    plots?: string;
    director?: string;
}

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: inherit;
    color: inherit;
`;

export const Headers = styled.header`
    display: flex;
    justify-content: center;
    border-bottom: 5px double ${(props) => props.theme.textColor};
    padding: 10px;
    margin-bottom: 10px;
`;

export const Titles = styled.h3`
    width: 500px;
    font-weight: bold;
    text-align: center;
    padding: 10px;
    font-size: 20px;
`;

const MovieList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MovieItem = styled.li`
    display: flex;
    flex-direction: row;
    padding: 5px;
    margin: 5px 0px;
    font-weight: bold;
    width: 500px;

    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.itemColor};

    img {
            width: 200px;
            height: 240px;
            margin-right: 3px;
    };

    span {
            display: flex;
            flex-direction: column;
            justify-content: center;
    };

    border: 3px solid ${(props) => props.theme.textColor};
    border-radius: 10px;

    &:hover {
        background-color: ${(props) => props.theme.accentColor};
    }
`;

export const Footer = styled.footer`
    display: flex;
    justify-content: center;

    button {
        position: fixed;
        top: 90%;
        left: 90%;
    }
`;

export const Days: string[] = [
    "일", "월", "화", "수", "목", "금", "토"
];

function Movies(){
    const {
        isLoading: isDailys, 
        data: Dailys,
    } = useQuery<I_Movies[]>("DailyMovies", getDailyBoxOffice);

    const setMovies = useSetRecoilState(AllMovies);

    useEffect(() => setMovies(Dailys), [isDailys]);

    return (
        <MainWrapper>
            <Headers>
                <Titles>Now Movie / 지금 영화</Titles>
            </Headers>
            <MovieList>
                {
                    isDailys ? "영화 데이터를 가져오고 있습니다."
                    : (
                        <MovieList>
                            {
                                Dailys?.map((movie) => {
                                    const targetDts = String(movie.openDt);
                                    const TargetDays = new Date(targetDts).getDay();

                                    return (
                                        <Link to={`/${movie.movieCd}`} key={movie.movieCd}>
                                            <MovieItem>
                                                <img src={movie.posterURL}/>
                                                <span>
                                                    <h4>{movie.movieNm}</h4>
                                                    <h4>
                                                        {movie.openDt} {`(${Days[TargetDays]})`}
                                                    </h4>
                                                </span>
                                            </MovieItem>
                                        </Link>
                                    );
                                })
                            }
                        </MovieList>
                    )
                }
            </MovieList>
            <Footer>
                <ThemeBtn />
            </Footer>
        </MainWrapper>
    );
};

export default Movies;