import { useQuery } from "react-query";
import { MoviesData} from "../modules/Fetch";
import styled from "styled-components";
import ThemeBtn from "../modules/ThemeBtn";

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: inherit;
    color: inherit;
`;

const Headers = styled.header`
    display: flex;
    justify-content: center;
    border-bottom: 5px double ${(props) => props.theme.textColor};
    padding: 10px;
    margin-bottom: 10px;
`;

const Titles = styled.h3`
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
    }

    border: 3px solid ${(props) => props.theme.textColor};
    border-radius: 10px;

    &:hover {
        background-color: ${(props) => props.theme.accentColor};
    }
`;

const Footer = styled.footer`
    display: flex;
    justify-content: center;

    button {
        position: fixed;
        top: 90%;
        left: 90%;
    }
`;

function Movies(){
    const {
        isLoading: isMovies, 
        data: Movies
    } = useQuery("MoviesData", MoviesData);

    return (
        <MainWrapper>
            <Headers>
                <Titles>Now Movie / 지금 영화</Titles>
            </Headers>
            <MovieList>
                {
                    isMovies ? "영화 데이터를 가져오고 있습니다."
                    : (
                        <MovieList>
                            {
                                Movies?.map((movie) => {
                                    return (
                                        <MovieItem key={movie.movieCd}>
                                            <img src={movie.posterURL}/>
                                            <span>
                                                <h4>{movie.movieNm}</h4>
                                                <h4>{movie.director}</h4>
                                            </span>
                                        </MovieItem>
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