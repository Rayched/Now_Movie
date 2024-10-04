import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { DetailData } from "../modules/Fetch";
import { useRecoilValue } from "recoil";
import { MoviesData } from "../atoms";

function MovieDetail(){
    const {movieCd: MovieCd} = useParams();

    const AllMovies = useRecoilValue(MoviesData);

    const MovieFilter = AllMovies?.find((movie) => MovieCd === movie.movieCd);

    const {isLoading: isDetail, data: MovieInfo} = useQuery({
        queryKey: "Details",
        queryFn: () => DetailData(MovieCd)
    });

    useEffect(() => {
        console.log(MovieCd);
        console.log(MovieInfo);
        console.log(MovieFilter);
    }, [isDetail]);

    return (
        <div>
            <img src={MovieFilter?.posterURL} />
            <h4>{MovieFilter?.movieNm}</h4>
        </div>
    );
};

export default MovieDetail;