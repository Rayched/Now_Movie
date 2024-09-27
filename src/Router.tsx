import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "./routes/MovieDetail";
import Movies from "./routes/Movies";

function Router(){
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/:movieCd" element={<MovieDetail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;