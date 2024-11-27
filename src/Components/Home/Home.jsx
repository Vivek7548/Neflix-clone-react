/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import "./Home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";

const apikey = "610f82e7fed4b55a035a3ec7839f7d66";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Home = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  // Fetch movies only once using useEffect
  useEffect(() => {
    const fetchMovies = async (category, setter) => {
      try {
        const {
          data: { results },
        } = await axios.get(
          `${url}/movie/${category}?api_key=${apikey}&page=1`
        );
        setter(results);
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
      }
    };

    fetchMovies("top_rated", setTopRatedMovies);
    fetchMovies("popular", setPopularMovies);
    fetchMovies("now_playing", setNowPlayingMovies);
    fetchMovies("upcoming", setUpcomingMovies);
  }, []);

  // Card Component
  const Card = ({ img }) => (
    <img
      src={img || "https://via.placeholder.com/200"}
      alt="cover"
      className="card"
    />
  );

  Card.propTypes = {
    img: PropTypes.string.isRequired,
  };

  // Row Component
  const Row = ({ title, arr }) => (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-cards">
        {arr.map((item, index) => (
          <Card img={`${imgUrl}${item?.poster_path}`} key={index} />
        ))}
      </div>
    </div>
  );

  Row.propTypes = {
    title: PropTypes.string.isRequired,
    arr: PropTypes.arrayOf(
      PropTypes.shape({
        poster_path: PropTypes.string,
      })
    ),
  };

  return (
    <section className="home">
      {/* Render banner only once */}
      {popularMovies[0] && (
        <div
          className="banner"
          style={{
            backgroundImage: `url(${imgUrl}${popularMovies[0]?.poster_path})`,
          }}
        >
          <h1>{popularMovies[0]?.original_title}</h1>
          <p>{popularMovies[0]?.overview}</p>
          <div>
            <button>
              My List <FaListUl />
            </button>
            <button>
              Play <FaRegPlayCircle />
            </button>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <Row title="Top Rated Movies" arr={topRatedMovies} />
      <Row title="Popular Movies" arr={popularMovies} />
      <Row title="Now Playing Movies" arr={nowPlayingMovies} />
      <Row title="Upcoming Movies" arr={upcomingMovies} />
    </section>
  );
};

export default Home;
