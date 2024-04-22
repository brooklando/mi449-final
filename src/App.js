import React, { useState, useEffect } from 'react';
import refreshIcon from './images/refresh-btn.png';
import './App.css';
import WebTitle from './Title';


/*fact generator*/
const RandomFactGenerator = () => {
  const [fact, setFact] = useState('');

  useEffect(() => {
    fetchFact();
  }, []);

  const fetchFact = async () => {
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNewFactClick = () => {
    fetchFact();
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg bg-opacity-80 overflow-hidden mt-8">
      <div className="p-4 text-center">
        <h1 className="text-3xl mb-4 font-semibold text-white drop-shadow">Useless Fact Generator</h1>
        <div className="rounded border border-gray-300 bg-white bg-opacity-85 p-4 mb-4">
          <p className="text-lg">{fact}</p>
        </div>
        <img
          src={refreshIcon}
          alt="Refresh icon"
          className="mx-auto cursor-pointer"
          width="50px"
          height="50px"
          onClick={handleNewFactClick}
        />
      </div>
    </div>
  );
};

/*meme generator*/
const MemeGenerator = () => {
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetchMeme();
  }, []);

  const fetchMeme = async () => {
    try {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.data.memes.length);
      setMeme(data.data.memes[randomIndex]);
    } catch (error) {
      console.error('Error fetching meme:', error);
    }
  };

  const handleNewMemeClick = () => {
    fetchMeme();
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg bg-opacity-80 overflow-hidden mt-8">
      <div className="p-4 text-center">
        <h1 className="text-3xl mb-4 font-semibold text-white drop-shadow">Useless Meme Generator</h1>
        {meme && (
          <div className="mb-4">
            <img src={meme.url} alt="Meme" className="mx-auto mb-2" />
            <p className="text-lg">{meme.name}</p>
          </div>
        )}
        <img
          src={refreshIcon}
          alt="Refresh icon"
          className="mx-auto cursor-pointer"
          width="50px"
          height="50px"
          onClick={handleNewMemeClick}
        />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <WebTitle />
      <RandomFactGenerator />
      <MemeGenerator />
    </div>
  );
};

export default App;
