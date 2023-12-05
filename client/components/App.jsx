import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CurrentContainer from './CurrentContainer'; // Import the CurrentContainer component

function App() {
  return (
    <Router>
      <div>
        <nav>
          {/*navigation links */}
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          {/* Route for the root path that renders CurrentContainer */}
          <Route path="/" element={<CurrentContainer />} />
          {/* Define other routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
