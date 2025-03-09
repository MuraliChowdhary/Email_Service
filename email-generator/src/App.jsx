import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import EmailGenerator from './pages/EmailGenerator';
import React, { useState } from "react";


function App() {
  const [generatedEmail, setGeneratedEmail] = useState(null);

  return (
    <Router>
      <div className="min-h-screen flex flex-col px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-pink-500 hover:to-indigo-500 transition-colors">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/generate" 
            element={
              <EmailGenerator 
                generatedEmail={generatedEmail} 
                setGeneratedEmail={setGeneratedEmail} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;