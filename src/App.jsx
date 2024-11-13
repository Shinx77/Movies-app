import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataFetchingComponent from './eg';
import MovieDetail from './components/movie_detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataFetchingComponent />} />
        <Route path="/movie/:id" element={<MovieDetail />} /> {/* Movie detail page */}
      </Routes>
    </Router>
  );
}

export default App;
