import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { DetailData } from "../modules/Fetch";
import { useRecoilValue } from "recoil";
import { Infos } from "../atoms";
import { Days, Footer, Headers, MainWrapper, Titles } from "./Movies";
import styled from "styled-components";
import ThemeBtn from "../modules/ThemeBtn";

const DetailWrapper = styled.div`
    display: flex;
    font-weight: bold;
`;

const MoviePoster = styled.img`
    display: block;
    padding: 0px 7px;
    justify-content: center;
    width: 200px;
    height: 240px;
`;

const DetailList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;

    h4 {
        margin: 5px 0px;
    }
`;

function MovieDetail(){
    const {movieCd: MovieCd} = useParams();

    const {isLoading: isDetail, data: MovieInfo} = useQuery({
        queryKey: "MovieDetails",
        queryFn: () => DetailData(MovieCd)
    });

    const getInfos = useRecoilValue(Infos);

    const targetInfo = getInfos?.find((data) => data.movidCd === MovieCd);

    const getDays = new Date(String(MovieInfo?.openDt)).getDay();

    useEffect(() => {
        console.log(MovieInfo);
    }, [isDetail]);

    return (
        <>
            {
                isDetail ? "영화 상세 정보를 가져오는 중 입니다."
                : (
                    <MainWrapper>
                        <Headers>
                            <Titles>{MovieInfo?.movieNm}</Titles>
                        </Headers>
                        <DetailWrapper>
                            <MoviePoster src={targetInfo?.poster}/>
                            <DetailList>
                                <h4>개봉 일: {`${MovieInfo?.openDt} (${Days[getDays]})`}</h4>
                                <h4>감독: {MovieInfo?.director}</h4>
                                <h4>장르: {MovieInfo?.genres?.join(", ")}</h4>
                                <h4>출연 배우: {MovieInfo?.actors?.join(", ")}</h4>
                            </DetailList>
                        </DetailWrapper>
                        <Footer>
                            <ThemeBtn />
                        </Footer>
                    </MainWrapper>
                )
            }
        </>
    );
};

export default MovieDetail;