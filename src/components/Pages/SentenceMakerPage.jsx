import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

// Modal component to display alerts and errors
const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
      <div className='relative bg-white p-8 rounded-lg shadow-lg'>
        <button className='absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-900 focus:outline-none' onClick={onClose}>
          <svg className='h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        <div className='text-center'>
          <h2 className='text-gray-800 text-xl font-bold mb-4'>{title}</h2>
          <p className='text-gray-700'>{message}</p>
          <button
            className='mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const SentenceMakerPage = () => {
  const [words, setWords] = useState([]); // State to store added words
  const [sentence, setSentence] = useState(''); // State to store the generated sentence
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [inputError, setInputError] = useState(false); // State to indicate input error
  const [loading, setLoading] = useState(false); // State to indicate loading status

  // Function to add a word to the list
  const addWord = (word) => {
    if (word.trim() === '') {
      setInputError(true); // Show input error if the word is empty
      return;
    } else if (words.length >= 20) {
      setIsModalOpen(true); // Show modal if the word limit is reached
      return;
    }

    setInputError(false); // Reset input error state
    setWords([...words, word]); // Add the word to the list
  };

  // Function to remove a word from the list by index
  const removeWord = (index) => {
    const updatedWords = [...words];
    updatedWords.splice(index, 1);
    setWords(updatedWords);
  };

  // Function to generate a sentence using the API
  const generateSentence = async () => {
    if (words.length === 0) {
      setIsModalOpen(true); // Show modal if no words are added
      return;
    }

    const subject = words[0];
    const verb = words[1];
    const object = words.slice(2).join(' ');

    const url = `https://linguatools-sentence-generating.p.rapidapi.com/realise?subject=${subject}&verb=${verb}&object=${object}`;

    setLoading(true); // Indicate loading state

    try {
      const response = await axios.get(url, {
        headers: {
          'X-RapidAPI-Host': 'linguatools-sentence-generating.p.rapidapi.com',
          'X-RapidAPI-Key': '86249b5551mshb8b70dfbf75b51bp155d85jsn9dd598ca6602', // Replace with your actual API key
        }
      });

      console.log(response.data); // Debugging: Log the response data

      if (response.status === 200) {
        // Successful request
        setSentence(response.data.sentence || 'Failed to generate sentence.'); // Set generated sentence or error message
      } else {
        // Handle other status codes
        setSentence('Failed to generate sentence.');
      }
    } catch (error) {
      // Error handling
      console.error('Error generating sentence:', error);
      setSentence('Error occurred while generating sentence.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4'>
      <div className='max-w-lg mt-12 mx-auto'>
        <h1 className='text-white text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-20'>Sentence Maker</h1>
        <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
          <label htmlFor='wordInput' className='block text-gray-700 font-bold mb-2'>Add words to create a sentence:</label>
          <div className={`flex items-center border ${inputError ? 'border-red-500' : 'border-gray-300'} rounded-md overflow-hidden`}>
            <input
              id='wordInput'
              type='text'
              className={`flex-1 px-3 py-2 placeholder-gray-300 focus:outline-none ${inputError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder='Enter a word'
              onChange={() => setInputError(false)} // Reset input error state on change
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addWord(e.target.value.trim());
                  e.target.value = ''; // Clear input after adding word
                }
              }}
              aria-label='Word Input'
            />
            <button
              className='bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 focus:outline-none'
              onClick={() => {
                const input = document.getElementById('wordInput');
                addWord(input.value.trim());
                input.value = ''; // Clear input after adding word
              }}
            >
              Add
            </button>
          </div>
          {inputError && (
            <p className='text-red-500 text-xs mt-1'>Please enter a word.</p> // Display input error message
          )}
          <div className='mt-4'>
            {words.map((word, index) => (
              <span
                key={index}
                className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
              >
                {word}
                <button
                  className='ml-2 text-xs font-normal text-gray-500 focus:outline-none'
                  onClick={() => removeWord(index)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <button
            className='mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={generateSentence}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Generating...' : 'Generate Sentence'}
          </button>
        </div>
        {sentence && (
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-gray-800 text-xl font-bold mb-4'>Generated Sentence:</h2>
            <p className='text-gray-700'>{sentence}</p>
          </div>
        )}
      </div>

      {/* Modal for alerts */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title='Alert'
        message={words.length >= 20 ? 'Maximum words limit reached (20 words).' : 'Please add at least one word to generate a sentence.'}
      />
    </div>
  );
};

export default SentenceMakerPage;
