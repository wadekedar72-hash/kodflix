import React, { useState, useEffect } from 'react';
import MovieRow from './components/MovieRow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './App.css';

const API_KEY = '68022e90';
const BASE_URL = 'https://www.omdbapi.com/';

// Fallback mock data in case API fails
const MOCK_MOVIES = {
  'Trending Now': [
    { imdbID: 'tt1375666', Title: 'Inception', Year: '2010', Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', Plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', Genre: 'Action, Sci-Fi', Rated: 'PG-13', Runtime: '148 min' },
    { imdbID: 'tt0468569', Title: 'The Dark Knight', Year: '2008', Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', Plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', Genre: 'Action, Crime, Drama', Rated: 'PG-13', Runtime: '152 min' },
    { imdbID: 'tt0816692', Title: 'Interstellar', Year: '2014', Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', Plot: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', Genre: 'Adventure, Drama, Sci-Fi', Rated: 'PG-13', Runtime: '169 min' },
    { imdbID: 'tt4154796', Title: 'Avengers: Endgame', Year: '2019', Poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg', Plot: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.', Genre: 'Action, Adventure, Drama', Rated: 'PG-13', Runtime: '181 min' },
    { imdbID: 'tt0499549', Title: 'Avatar', Year: '2009', Poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzJiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg', Plot: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.', Genre: 'Action, Adventure, Fantasy', Rated: 'PG-13', Runtime: '162 min' },
    { imdbID: 'tt0120338', Title: 'Titanic', Year: '1997', Poster: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg', Plot: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', Genre: 'Drama, Romance', Rated: 'PG-13', Runtime: '194 min' },
    { imdbID: 'tt7286456', Title: 'Joker', Year: '2019', Poster: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg', Plot: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.', Genre: 'Crime, Drama, Thriller', Rated: 'R', Runtime: '122 min' },
    { imdbID: 'tt1160419', Title: 'Dune', Year: '2021', Poster: 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg', Plot: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.', Genre: 'Action, Adventure, Drama', Rated: 'PG-13', Runtime: '155 min' }
  ],
  'Action Movies': [
    { imdbID: 'tt1392190', Title: 'Mad Max: Fury Road', Year: '2015', Poster: 'https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTM4NjRlODBiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', Plot: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.', Genre: 'Action, Adventure, Sci-Fi', Rated: 'R', Runtime: '120 min' },
    { imdbID: 'tt2911666', Title: 'John Wick', Year: '2014', Poster: 'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg', Plot: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took his car.', Genre: 'Action, Crime, Thriller', Rated: 'R', Runtime: '101 min' },
    { imdbID: 'tt0120755', Title: 'Mission: Impossible', Year: '1996', Poster: 'https://m.media-amazon.com/images/M/MV5BMTc3NjI2MjU0Nl5BMl5BanBnXkFtZTgwNDk3ODYxMTE@._V1_SX300.jpg', Plot: 'An American agent, under false suspicion of disloyalty, must discover and expose the real spy without the help of his organization.', Genre: 'Action, Adventure, Thriller', Rated: 'PG-13', Runtime: '110 min' },
    { imdbID: 'tt0232500', Title: 'The Fast and the Furious', Year: '2001', Poster: 'https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODgtMzRmMjIyZGEyODA4XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg', Plot: 'Los Angeles police officer Brian O\'Conner must decide where his loyalty really lies when he becomes enamored with the street racing world he has been sent undercover to destroy.', Genre: 'Action, Crime, Thriller', Rated: 'PG-13', Runtime: '106 min' },
    { imdbID: 'tt0095016', Title: 'Die Hard', Year: '1988', Poster: 'https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjRkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', Plot: 'An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.', Genre: 'Action, Thriller', Rated: 'R', Runtime: '132 min' },
    { imdbID: 'tt0088247', Title: 'The Terminator', Year: '1984', Poster: 'https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ0ODc3N2M3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', Plot: 'A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity\'s future salvation.', Genre: 'Action, Sci-Fi', Rated: 'R', Runtime: '107 min' },
    { imdbID: 'tt0133093', Title: 'The Matrix', Year: '1999', Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', Plot: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.', Genre: 'Action, Sci-Fi', Rated: 'R', Runtime: '136 min' },
    { imdbID: 'tt0172495', Title: 'Gladiator', Year: '2000', Poster: 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', Plot: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', Genre: 'Action, Adventure, Drama', Rated: 'R', Runtime: '155 min' }
  ],
  'Comedy Movies': [
    { imdbID: 'tt1119646', Title: 'The Hangover', Year: '2009', Poster: 'https://m.media-amazon.com/images/M/MV5BMTU1MDA1MTYwMF5BMl5BanBnXkFtZTcwMDcxMzA1Mg@@._V1_SX300.jpg', Plot: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.', Genre: 'Comedy', Rated: 'R', Runtime: '100 min' },
    { imdbID: 'tt0829482', Title: 'Superbad', Year: '2007', Poster: 'https://m.media-amazon.com/images/M/MV5BMTc0NjIyMjA2OF5BMl5BanBnXkFtZTcwMzIxNDQyNA@@._V1_SX300.jpg', Plot: 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.', Genre: 'Comedy', Rated: 'R', Runtime: '113 min' },
    { imdbID: 'tt1478338', Title: 'Bridesmaids', Year: '2011', Poster: 'https://m.media-amazon.com/images/M/MV5BMjAyOTMyMzUxNl5BMl5BanBnXkFtZTcwODI4MzE0NA@@._V1_SX300.jpg', Plot: 'Competition between the maid of honor and a bridesmaid, over who is the bride\'s best friend, threatens to upend the life of an out-of-work pastry chef.', Genre: 'Comedy, Romance', Rated: 'R', Runtime: '125 min' },
    { imdbID: 'tt0838283', Title: 'Step Brothers', Year: '2008', Poster: 'https://m.media-amazon.com/images/M/MV5BODViZDg3ZjYtMzhiYS00NjEwLWJiMzAtN2JmMWRkMTU4ZGIyXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg', Plot: 'Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.', Genre: 'Comedy', Rated: 'R', Runtime: '98 min' }
  ],
  'Sci-Fi Movies': [
    { imdbID: 'tt0083658', Title: 'Blade Runner', Year: '1982', Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZThiY2I3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', Plot: 'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.', Genre: 'Sci-Fi, Thriller', Rated: 'R', Runtime: '117 min' },
    { imdbID: 'tt0076759', Title: 'Star Wars', Year: '1977', Poster: 'https://m.media-amazon.com/images/M/MV5BNzg4MjQxNTQtZmI5My00NjEwLTkxMjktNjVmN2JkZGRkM2Y3XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg', Plot: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station.', Genre: 'Action, Adventure, Fantasy', Rated: 'PG', Runtime: '121 min' },
    { imdbID: 'tt0796366', Title: 'Star Trek', Year: '2009', Poster: 'https://m.media-amazon.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwOTE3NDIzMw@@._V1_SX300.jpg', Plot: 'The brash James T. Kirk tries to live up to his father\'s legacy with Mr. Spock keeping him in check as a vengeful Romulan from the future creates black holes to destroy the Federation.', Genre: 'Action, Adventure, Sci-Fi', Rated: 'PG-13', Runtime: '127 min' },
    { imdbID: 'tt1454468', Title: 'Gravity', Year: '2013', Poster: 'https://m.media-amazon.com/images/M/MV5BNjE5MzYwMzYxMF5BMl5BanBnXkFtZTcwOTk4MTk0OQ@@._V1_SX300.jpg', Plot: 'Two astronauts work together to survive after an accident leaves them stranded in space.', Genre: 'Drama, Sci-Fi, Thriller', Rated: 'PG-13', Runtime: '91 min' }
  ],
  'Horror Movies': [
    { imdbID: 'tt0081505', Title: 'The Shining', Year: '1980', Poster: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', Plot: 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.', Genre: 'Drama, Horror', Rated: 'R', Runtime: '146 min' },
    { imdbID: 'tt5052448', Title: 'Get Out', Year: '2017', Poster: 'https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_SX300.jpg', Plot: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.', Genre: 'Horror, Mystery, Thriller', Rated: 'R', Runtime: '104 min' },
    { imdbID: 'tt6644200', Title: 'A Quiet Place', Year: '2018', Poster: 'https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX300.jpg', Plot: 'A family must live their lives in silence to hide from creatures that hunt by sound.', Genre: 'Drama, Horror, Sci-Fi', Rated: 'PG-13', Runtime: '90 min' },
    { imdbID: 'tt7784604', Title: 'Hereditary', Year: '2018', Poster: 'https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzJkMjU1MTRiMDY0XkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_SX300.jpg', Plot: 'A grieving family is haunted by tragic and disturbing occurrences.', Genre: 'Drama, Horror, Mystery', Rated: 'R', Runtime: '127 min' }
  ],
  'Drama Movies': [
    { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994', Poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg', Plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', Genre: 'Drama', Rated: 'R', Runtime: '142 min' },
    { imdbID: 'tt0068646', Title: 'The Godfather', Year: '1972', Poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', Plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', Genre: 'Crime, Drama', Rated: 'R', Runtime: '175 min' },
    { imdbID: 'tt0110912', Title: 'Pulp Fiction', Year: '1994', Poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', Plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', Genre: 'Crime, Drama', Rated: 'R', Runtime: '154 min' },
    { imdbID: 'tt0137523', Title: 'Fight Club', Year: '1999', Poster: 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', Plot: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.', Genre: 'Drama', Rated: 'R', Runtime: '139 min' }
  ]
};

// Popular movie titles to search for
const MOVIE_CATEGORIES = {
  'Trending Now': ['Inception', 'The Dark Knight', 'Interstellar', 'Avengers', 'Avatar', 'Titanic', 'Joker', 'Dune'],
  'Action Movies': ['Mad Max', 'John Wick', 'Mission Impossible', 'Fast and Furious', 'Die Hard', 'Terminator', 'Matrix', 'Gladiator'],
  'Comedy Movies': ['The Hangover', 'Superbad', 'Bridesmaids', 'Step Brothers', 'Anchorman', 'Groundhog Day', 'Forrest Gump', 'Elf'],
  'Sci-Fi Movies': ['Blade Runner', 'Star Wars', 'Star Trek', 'Gravity', 'Arrival', 'Ex Machina', 'Her', 'District 9'],
  'Horror Movies': ['The Shining', 'Get Out', 'A Quiet Place', 'Hereditary', 'It', 'The Conjuring', 'Halloween', 'Psycho'],
  'Drama Movies': ['The Shawshank Redemption', 'The Godfather', 'Pulp Fiction', 'Fight Club', 'Goodfellas', 'Schindler\'s List', 'Forrest Gump', 'Parasite']
};

function App() {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchMovieData = async (title) => {
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`);
      const data = await response.json();
      if (data.Response === 'True') {
        return data;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching ${title}:`, error);
      return null;
    }
  };

  const fetchAllMovies = async () => {
    setLoading(true);
    
    // Use mock data directly since OMDB API key is invalid
    // This ensures the app works immediately without waiting for failed API calls
    console.log('Using mock data');
    setMovies(MOCK_MOVIES);
    
    // Set a random featured movie from mock data
    const trendingMovies = MOCK_MOVIES['Trending Now'];
    const randomIndex = Math.floor(Math.random() * trendingMovies.length);
    setFeaturedMovie(trendingMovies[randomIndex]);
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="netflix-loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      {featuredMovie && <Hero movie={featuredMovie} />}
      <div className="movie-rows-container">
        {Object.entries(movies).map(([category, categoryMovies]) => (
          categoryMovies.length > 0 && (
            <MovieRow key={category} title={category} movies={categoryMovies} />
          )
        ))}
      </div>
    </div>
  );
}

export default App;
