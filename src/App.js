import React, { useState, useEffect, useRef } from 'react';
import {
  Film,
  Star,
  Play,
  Search,
  ChevronRight,
  Info,
  Plus,
  ThumbsUp,
  Menu
} from 'lucide-react';


// Sample movie data
const SAMPLE_MOVIES = {
  trending: [
    {
      id: 1,
      title: "The dark Knight",
      image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400",
      backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920",
      description: "Batman faces the Joker.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      trailerUrl: "https://www.youtube.com/embed/_Z_Nk468ATI"
    },
    
    {
      id: 2,
      title: "Inception",
      image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      description: "Dream within a dream."
    },
    {
      id: 3,
      title: "Interstellar",
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      description: "Space and time."
    },
    {
      id: 4,
      title: "Joker",
     image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
     backdrop: "https://image.tmdb.org/t/p/w1280/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
     description: "Origin of Joker."
    },

    {
      id: 5,
      title: "Avengers: Endgame(2019)",
        image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  backdrop: "https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
      description: "Earth’s mightiest heroes."
    },

   {
    id: 10,
    title: "Sintel",
    image: "https://image.tmdb.org/t/p/w500/5N20rQURev5CNDcMjHVUZhpoCNC.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    description: "A young girl embarks on a dangerous quest to find her dragon.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trailerUrl: "https://www.youtube.com/embed/eRsGyueVLvQ"
   }
  ],

  action: [
    {
      id: 6,
      title: "Mad Max",
      image: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
      backdrop: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg"
      
    },
    {
      id: 7,
      title: "John Wick",
      image: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
      backdrop: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"
    }
  ],

  scifi: [
    {
      id: 8,
      title: "Blade Runner 2049",
      image: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
      backdrop: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg"
    },
    {
      id: 9,
      title: "The Matrix",
      image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/9pkZesKMnblFfKxEhQx45YQ2kIe.jpg"
    }
  ]
};

export default function MovieWebsite() {
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const trendingRef = useRef(null);
  const [playerType, setPlayerType] = useState(null); 
  const featuredMovie = SAMPLE_MOVIES.trending[heroIndex];
const nextHero = () => {
  setHeroIndex(prev =>
    (prev + 1) % SAMPLE_MOVIES.trending.length
  );
};

const prevHero = () => {
  setHeroIndex(prev =>
    prev === 0
      ? SAMPLE_MOVIES.trending.length - 1
      : prev - 1
  );
};

  useEffect(() => {
  if (menuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return () => {
    document.body.style.overflow = 'auto';
  };
}, [menuOpen]);
useEffect(() => {
  const interval = setInterval(() => {
    setHeroIndex(prev => 
      (prev + 1) % SAMPLE_MOVIES.trending.length
    );
  }, 5000); // 5 seconds

  return () => clearInterval(interval);
}, []);

  return (
    <div className="movie-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background: #0f0f0f;
          color: #fff;
        }

        .movie-app {
          min-height: 100vh;
          background: #0f0f0f;
        }

        .header {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 1.5rem 4%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(15, 15, 15, 0.95);
          z-index: 100;
        }
        .watch-screen {
          position: fixed;
           inset: 0;
           background: #000;
            z-index: 500;
            padding-top: 80px; /* space below header */
        }
        
        .watch-hero {
          max-width: 1100px;
          margin: 0 auto;
          padding: 1rem;
        }
        .watch-hero h1 {
          margin-top: 1rem;
          font-size: 1.8rem;
        }

        .watch-hero p {
          opacity: 0.8;
          max-width: 800px;
        }
        
        .back-btn {
          position: absolute;
          top: 90px;
          left: 20px;
          z-index: 1000;

          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: none;
          padding: 10px 16px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 4px;
        }

              
        .video-player {
          width: 100%;
          height: 70vh;
          border: none;
          border-radius: 8px;
        }
      

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.8rem;
          font-weight: 700;
          color: #e50914;
        }

        
      
        .nav {
          position: fixed;
          top: 0;
          right: -300px;      
          width: 300px;
          height: 100vh;
          background: #141414;
          padding: 6rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 200;
        }

        .nav.open {
          right: 0;          
        }

        .nav-link {
          font-size: 1.2rem;
          cursor: pointer;
          color: #e5e5e5;
        }

        .nav-link:hover {
          color: #fff;
        }

        .search-input {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          padding: 0.5rem;
          width: 200px;
          opacity: 1;
          padding: 0.5rem;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hero {
          height: 85vh;
          padding: 0 4%;
          display: flex;
          align-items: center;
          margin-top: 80px;
          position: relative;
        }
        
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          font-size: 40px;
          padding: 10px 16px;
          cursor: pointer;
          z-index: 20;
        }

        .hero-arrow.left {
         left: 20px;
        }

        .hero-arrow.right {
         right: 20px;
        }

        .hero-arrow:hover {
         background: rgba(0, 0, 0, 0.85);
        }

        .hamburger {
         cursor: pointer;
         z-index: 300;
        }
        
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          z-index: 150;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
          
      
          

        .hero-bg img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-content {
          position: relative;
          max-width: 550px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
        }

        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .movie-card {
          background: #1a1a1a;
          border-radius: 8px;
          overflow: hidden;
        }

        .movie-poster {
          width: 100%;
          aspect-ratio: 2 / 3;
          object-fit: cover;
        }
        
        .movie-row-section {
          padding: 1.5rem 4%;
        }

        .row-title {
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }



        .movie-row::-webkit-scrollbar {
         display: none;
        }

        .row-movie-card {
          min-width: 160px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .movie-title {
          max-width: 160px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        } 
 
        .row-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.movie-row {
  display: flex;
  gap: 1rem;

  overflow-x: auto;      
  overflow-y: hidden;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; 
  
  .movie-row::-webkit-scrollbar {
  display: none;
}

.movie-row {
  scrollbar-width: none; /* Firefox */
}

  padding-bottom: 0.5rem;
}

.scroll-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50px;

  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  font-size: 3rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 50;
}

.scroll-btn.left {
  position: absolute;
  left: 0;
}

.scroll-btn.right {
  position: absolute;
  right: 0;
}

.row-movie-card {
  min-width: 160px;   
  max-width: 160px;
  flex-shrink: 0;
}

.row-movie-card img {
  width: 160px;
  height: 240px;      
  object-fit: cover; 
  border-radius: 8px;
}

.row-movie-card:hover {
  transform: scale(1.1);
}
          .movie-card {
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.08);
  z-index: 10;
}

/* ===== DETAILS PAGE ===== */

.details-page {
  position: relative;
  min-height: 100vh;
  padding: 120px 6% 4%;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.9),
    rgba(0,0,0,0.6)
  );
}

.details-layout {
  display: grid;
  grid-template-columns: 1fr 260px; /* content | image */
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.details-content {
  flex: 1;
  max-width: 55%;
}

.details-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.details-description {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.85;
  margin-bottom: 2rem;
}

.details-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: 1.5rem;
}

/* Buttons */
.btn {
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn.primary {
  background: #e50914;
  color: white;
}

.btn.secondary {
  background: rgba(255,255,255,0.2);
  color: white;
}

.btn.ghost {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.4);
  color: white;
}

.btn:hover {
  opacity: 0.85;
}

/* RIGHT IMAGE */
.details-poster {
  flex-shrink: 0;
}

.details-poster img {
  width: 260px;
  height: 390px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}
@media (max-width: 768px) {
  .header {
    padding: 0.8rem 1rem;
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    align-items: center;
    gap: 0.8rem;
  }

  .logo {
    font-size: 1.3rem;
    gap: 0.4rem;
  }

  .logo svg {
    width: 24px;
    height: 24px;
  }

  .search-box {
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 0;
  }

  .search-input {
    width: 100%;
    max-width: 220px;
    font-size: 0.85rem;
    padding: 0.45rem 0.6rem;
  }

  .hamburger {
    display: block;
    color: #fff;
    font-size: 28px;
    justify-self: end;
    z-index: 400;
    cursor: pointer;
  }

  .nav {
    display: none;
  }

  .nav.open {
    display: flex;
  }
   
  .details-page {
    padding: 100px 1rem 2rem;
    overflow-x: hidden;
  }

   /* DETAILS LAYOUT */
  .details-layout {
    display: grid;
    grid-template-columns: 120px 1fr; 
    gap: 3rem;
    align-items: flex-start;
  }

  /* POSTER */
  .details-poster {
    display: block;
  }

  .details-poster img {
    width: 120px;
    height: auto;
    border-radius: 10px;
  }

  /* CONTENT */
  .details-content {
    max-width: 100%;
  }

  .details-title {
    font-size: 1.5rem;
    line-height: 1.2;
  }

  .details-description {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  /* BUTTONS UNDER EVERYTHING */
  .details-actions {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-top: 1.2rem;
  }

  .details-actions .btn {
    width: 100%;
    justify-content: center;
  }
    
  .back-btn {
    position: fixed;
    top: 70px;
    left: 12px;
    font-size: 14px;
    padding: 8px 12px;
  }
    .video-player {
    height: 45vh;
    }

}

  


      `}</style>
      

      {/* Header */}
      {!selectedMovie && (
      <header className="header">
        {menuOpen && (
        <div
        className="overlay"
        style={{ opacity : 1}}
        onClick={() => setMenuOpen(false)}
        />
      )}
  <div className="logo" onClick={() => setSelectedCategory('home')}>
    <Film size={32} />
    MovieMax
  </div>

  <nav className={`nav ${menuOpen ? 'open' : ''}`}>
    {['home', 'movies', 'Trending'].map(item => (
      <span
        key={item}
        className={`nav-link ${selectedCategory === item ? 'active' : ''}`}
        onClick={() => {
        setSelectedCategory(item);
         setMenuOpen(false);
   }}
      >
        {item.toUpperCase()}
      </span>
    ))}
  </nav>

  <div className="search-box">
    <input
      className="search-input"
      placeholder="Search movies..."
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
    />
    <Search />
  </div>

  
  <Menu
  size={28}
  className="hamburger"
  onClick={() => setMenuOpen(!menuOpen)}
/>
</header>
      )}

      {page === 'details' && selectedMovie && (
  <section className="details-page">
    <button
      className="back-btn"
      onClick={() => {
        setPage('home');
        setSelectedMovie(null);
      }}
    >
      ← Back
    </button>

    <div className="details-layout">
      
      {/* LEFT CONTENT */}
     <div className="details-content">
  <h1 className="details-title">{selectedMovie.title}</h1>
  <p className="details-description">{selectedMovie.description}</p>
</div>

<div className="details-poster">
  <img src={selectedMovie.image} alt={selectedMovie.title} />
</div>
</div>

{/* ✅ MOVE ACTIONS HERE */}
<div className="details-actions">
  <button
    className="btn primary"
    onClick={() => {
      setPlayerType('movie');
      setPage('player');
    }}
  >
    ▶️ Watch Movie
  </button>

  <button
    className="btn secondary"
    onClick={() => {
      setPlayerType('trailer');
      setPage('player');
    }}
  >
    🎬 Watch Trailer
  </button>

  <button className="btn ghost">
    🔄 Restart
  </button>
</div>


    
  </section>
)}

{page === 'player' && selectedMovie && (
  <section className="watch-screen">
    <button
      className="back-btn"
      onClick={() => setPage('details')}
    >
      ← Exit Player
    </button>

    <div className="watch-hero">

  {/* 🎥 MOVIE */}
  {playerType === 'movie' && (
    selectedMovie.videoUrl ? (
      <video
        src={selectedMovie.videoUrl}
        className="video-player"
        controls
        playsInline
      />
    ) : (
        <video
      className="video-player"
      controls
      poster={selectedMovie.backdrop || selectedMovie.image}
    />
  )
)}

  {/* 🎬 TRAILER */}
  {playerType === 'trailer' && (
    selectedMovie.trailerUrl ? (
      <iframe
        src={selectedMovie.trailerUrl}
        className="video-player"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Movie Trailer"
      />
    ) : (
        <video
      className="video-player"
      controls
      poster={selectedMovie.backdrop || selectedMovie.image}
    />
  )
)}

  <h1>{selectedMovie.title}</h1>
  <p>{selectedMovie.description}</p>
</div>
  </section>
)}

      {/* Hero */}
      {page === 'home' && selectedCategory === 'home' && (
  <section className="hero">
        <div className="hero-bg">
          <img src={featuredMovie.backdrop} alt={featuredMovie.title} />
        </div>
        <button className="hero-arrow left" onClick={prevHero}>
    ‹
  </button>

  <button className="hero-arrow right" onClick={nextHero}>
    ›
  </button>

        <div className="hero-content">
          <h1 className="hero-title">{featuredMovie.title}</h1>
          <p>{featuredMovie.description}</p>
          <button>
            <Play size={18} /> Play
          </button>
          <button>
            <Info size={18} /> Info
          </button>
        </div>
      </section>
      )}
      {page === 'home' && selectedCategory === 'home' && (
  <>
    {/* TRENDING */}

    <section className="movie-row-section">
      <h2 className="row-title">Trending Now</h2>
      <div className="movie-row">
        {SAMPLE_MOVIES.trending.map(movie => (
          <div
            key={movie.id}
            className="row-movie-card"
            onClick={() => {
  setSelectedMovie(movie);
  setPage('details');
}}
          >
            <img src={movie.image} alt={movie.title} />
             <p className="movie-title">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ACTION */}
    <section className="movie-row-section">
      <h2 className="row-title">Action Movies</h2>
      <div className="movie-row">
        {SAMPLE_MOVIES.action.map(movie => (
          <div
            key={movie.id}
            className="row-movie-card"
            onClick={() => {
  setSelectedMovie(movie);
  setPage('details');
}}
          >
            <img src={movie.image} alt={movie.title} />
             <p className="movie-title">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>

    {/* SCI-FI */}
    <section className="movie-row-section">
      <h2 className="row-title">Sci-Fi Movies</h2>
      <div className="movie-row">
        {SAMPLE_MOVIES.scifi.map(movie => (
          <div
            key={movie.id}
            className="row-movie-card"
            onClick={() => {
  setSelectedMovie(movie);
  setPage('details');
}}
          >
            <img src={movie.image} alt={movie.title} />
            <p className="movie-title">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  </>
)}

      {/* Movies */}
      {selectedCategory === 'movies' && (
  <section className="content">
        <h2>Trending</h2>
       <section className="content">
  <h2>Trending</h2>

  <div className="row-wrapper">
    {/* LEFT ARROW */}
    <button
      className="scroll-btn left"
      onClick={() =>
        trendingRef.current.scrollBy({ left: -300, behavior: 'smooth' })
      }
    >
      ‹
    </button>

    {/* MOVIE ROW */}
    <div className="movie-row" ref={trendingRef}>
      {SAMPLE_MOVIES.trending.map(movie => (
        <div
          key={movie.id}
          className="movie-card"
          onClick={() => {
  setSelectedMovie(movie);
  setPage('details');
}}
        >
          <img
            src={movie.image}
            alt={movie.title}
            className="movie-poster"
          />
        </div>
      ))}
    </div>

    {/* RIGHT ARROW */}
    <button
      className="scroll-btn right"
      onClick={() =>
        trendingRef.current.scrollBy({ left: 300, behavior: 'smooth' })
      }
    >
      ›
    </button>
  </div>
</section>
      </section>)}
    </div>
  );
}