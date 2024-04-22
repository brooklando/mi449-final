import React, { useState, useEffect } from 'react';
import refreshIcon from './images/refresh-btn.png';
import WebTitle from './Title';
import ParticlesComponent from './components/particles';

/*fact generator*/
const RandomFactGenerator = () => {
  const [fact, setFact] = useState('');

  useEffect(() => {
    fetchFact();
  }, []);

/*fetch api, if error occurs display error in console*/
  const fetchFact = async () => {
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

/*repeat fetching for new facts*/
  const handleNewFactClick = () => {
    fetchFact();
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg bg-opacity-20 overflow-hidden mt-8">
      <div className="p-4 text-center">
        <h1 className="text-3xl mb-4 font-semibold text-white drop-shadow-md">Useless Fact Generator</h1>
        <div className="rounded border border-gray-300 bg-gray bg-opacity-40 p-4 mb-4">
          <p className="text-2xl font-semibold text-white drop-shadow-lg">{fact}</p>
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

/*repeat fetching for new images*/
  const handleNewMemeClick = () => {
    fetchMeme();
  };

  /*returning from functions to html structure*/
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg bg-opacity-20 overflow-hidden mt-8">
      <div className="p-4 text-center">
        <h1 className="text-3xl mb-4 font-semibold text-white drop-shadow-md">Useless Meme Generator</h1>
        {meme && (
          <div className="mb-4">
            <img src={meme.url} alt="Meme" className="mx-auto mb-2" />
            <p className="text-2xl font-semibold text-white">{meme.name}</p>
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

/*creating webpage with imports*/
const App = () => {
  return (
    <div className='App'>
      <ParticlesComponent />
      <div className="relative z-20">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <WebTitle />
          <RandomFactGenerator />
          <MemeGenerator />
        </div>
      </div>
    </div>
  );
};

export default App;
