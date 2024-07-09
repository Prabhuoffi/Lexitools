import React, { useState } from 'react';
import quotesData from '../api/quotes'; // Import your quotes data

const maxWords = 100; // Maximum number of words allowed

const QuoteGeneratorPage = () => {
  const [quote, setQuote] = useState('');
  const [userQuote, setUserQuote] = useState('');
  const [selectedOption, setSelectedOption] = useState('select'); // Default option for user selection
  const [loading, setLoading] = useState(false); // Loading state
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Function to generate the quote based on the selected option
  const generateQuote = () => {
    if (selectedOption === 'select') {
      showModalAlert('Please select a quote option.');
      return;
    }

    setLoading(true); // Start loading
    setTimeout(() => { // Simulate async operation, e.g., fetching data
      if (selectedOption === 'userInput') {
        const generatedQuote = userQuote.trim();
        if (countWords(generatedQuote) > maxWords) {
          showModalAlert(`Maximum ${maxWords} words allowed.`);
          setLoading(false); // End loading
          return;
        }
        setQuote(generatedQuote || 'No quote provided.');
      } else {
        const foundQuote = quotesData.find(item => item.title.toLowerCase() === selectedOption.toLowerCase());
        if (foundQuote) {
          setQuote(foundQuote.quote);
        } else {
          setQuote(`No quote found for "${selectedOption}".`);
        }
      }
      setLoading(false); // End loading
    }, 500); // Simulated delay
  };

  // Function to handle the change of the dropdown option
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setQuote(''); // Reset quote display when the option changes
    setUserQuote(''); // Clear the user input when changing options
  };

  // Function to count words in a given string
  const countWords = (str) => {
    return str.trim().split(/\s+/).length;
  };

  // Function to show modal alert
  const showModalAlert = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  return (
    <div className='h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex items-center justify-center'>
      <div className='max-w-lg mt-12 mx-auto'>
        <h1 className='text-white text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-20'>Quote Generator</h1>
        <div className='bg-white rounded-lg shadow-lg p-8 '>
          <label htmlFor='quoteOptions' className='block text-gray-700 font-bold mb-4'>Select a quote or enter your own:</label>
          <select
            id='quoteOptions'
            className='w-full px-4 py-3 mb-4 text-gray-700 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-200 ease-in-out'
            value={selectedOption}
            onChange={handleOptionChange}
            aria-label='Quote Options'
          >
            <option value='select'>Select...</option>
            {quotesData.map((item, index) => (
              <option key={index} value={item.title}>{item.title}</option>
            ))}
            <option value='userInput'>Enter Your Own Quote</option>
          </select>
          {selectedOption === 'userInput' && (
            <textarea
              id='userQuote'
              className='w-full px-4 py-3 mb-4 text-gray-700 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-200 ease-in-out'
              placeholder={`Enter your own quote (max ${maxWords} words)`}
              value={userQuote}
              onChange={(e) => setUserQuote(e.target.value)}
              rows={4}
              aria-label='User Quote'
            />
          )}
          <button
            className={`w-full px-6 py-3 font-bold rounded-md transition duration-300 ease-in-out transform focus:outline-none ${loading ? 'bg-yellow-300 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500'}`}
            onClick={generateQuote}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <svg className='animate-spin h-5 w-5 mr-3 text-white' viewBox='0 0 24 24'>
                  <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none'></circle>
                  <path fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'></path>
                </svg>
                Generating...
              </div>
            ) : (
              'Generate Quote'
            )}
          </button>
        </div>
        {quote && (
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-gray-800 text-xl font-bold mb-4'>Generated Quote:</h2>
            <p className='text-gray-700'>{quote}</p>
          </div>
        )}
      </div>
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-xl font-bold mb-4'>Alert</h2>
            <p className='mb-4'>{modalMessage}</p>
            <button
              className='px-4 py-2 bg-yellow-500 text-white rounded-md'
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteGeneratorPage;
