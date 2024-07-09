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

const SentenceCheckerPage = () => {
  const [sentence, setSentence] = useState(''); // State to store the input sentence
  const [corrections, setCorrections] = useState([]); // State to store the corrections
  const [errors, setErrors] = useState([]); // State to store the errors
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(false); // State to indicate loading status

  // Function to check the sentence using the API
  const checkSentence = async () => {
    if (sentence.trim() === '') {
      setIsModalOpen(true); // Show modal if the sentence is empty
      return;
    }

    const url = `https://some-grammar-check-api.com/check?sentence=${encodeURIComponent(sentence)}`;

    setLoading(true); // Indicate loading state

    try {
      const response = await axios.get(url, {
        headers: {
          'X-API-Key': 'YOUR_API_KEY', // Replace with your actual API key
        }
      });

      console.log(response.data); // Debugging: Log the response data

      if (response.status === 200) {
        // Successful request
        setCorrections(response.data.corrections || []); // Set corrections or empty array if no corrections
        setErrors(response.data.errors || []); // Set errors or empty array if no errors
      } else {
        // Handle other status codes
        setCorrections([]);
        setErrors([]);
      }
    } catch (error) {
      // Error handling
      console.error('Error checking sentence:', error);
      setCorrections([]);
      setErrors([]);
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
        <h1 className='text-white text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-20'>Sentence Checker</h1>
        <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
          <label htmlFor='sentenceInput' className='block text-gray-700 font-bold mb-2'>Enter a sentence to check:</label>
          <div className='flex flex-col border border-gray-300 rounded-md overflow-hidden'>
            <textarea
              id='sentenceInput'
              rows='5'
              className='flex-1 px-3 py-2 placeholder-gray-300 focus:outline-none border-gray-300'
              placeholder='Enter a sentence'
              onChange={(e) => setSentence(e.target.value)} // Update sentence state on change
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  checkSentence();
                }
              }}
              aria-label='Sentence Input'
            />
            <button
              className='bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 mt-2 focus:outline-none'
              onClick={checkSentence}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Checking...' : 'Check'}
            </button>
          </div>
        </div>
        {corrections.length > 0 && (
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-gray-800 text-xl font-bold mb-4'>Corrections:</h2>
            <ul className='list-disc list-inside text-gray-700'>
              {corrections.map((correction, index) => (
                <li key={index}>{correction}</li>
              ))}
            </ul>
          </div>
        )}
        {errors.length > 0 && (
          <div className='bg-red-100 rounded-lg shadow-lg p-6 mt-4'>
            <h2 className='text-red-800 text-xl font-bold mb-4'>Errors:</h2>
            <ul className='list-disc list-inside text-red-700'>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
      </div>

      {/* Modal for alerts */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title='Alert'
        message='Please enter a sentence to check.'
      />
    </div>
  );
};

export default SentenceCheckerPage;
