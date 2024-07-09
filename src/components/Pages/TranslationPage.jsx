import React, { useState } from 'react';
import languageList from '../api/language.json'; // Ensure correct path to your language list

export default function Translator() {
  const [inputFormat, setInputFormat] = useState('en');
  const [outputFormat, setOutputFormat] = useState('hi');
  const [translatedText, setTranslatedText] = useState('Translation');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReverseLanguage = () => {
    const value = inputFormat;
    setInputFormat(outputFormat);
    setOutputFormat(value);
    setInputText('');
    setTranslatedText('Translation');
  };

  const handleRemoveInputText = () => {
    setInputText('');
    setTranslatedText('Translation');
  };

  const handleTranslate = async () => {
    if (!inputText || !inputFormat || !outputFormat) return;
    setLoading(true);

    const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${outputFormat}&api-version=3.0&profanityAction=NoAction&textType=plain`;
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'dc88b84c45mshbed316ef3c81533p190c9bjsnfe87014a63b5', // Replace with your API key
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      body: JSON.stringify([{ Text: inputText }])
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const translation = result[0].translations[0].text;
      setTranslatedText(translation);
    } catch (error) {
      console.log(error);
      alert("Please Try Again! Some Error Occurred at your side");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4 sm:p-6">
      <h1 className='text-white text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-12'>Language Translator</h1>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 w-full sm:w-auto mb-2 sm:mb-0"
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value)}
            aria-label="Select input language"
          >
            {Object.keys(languageList).map((key, index) => (
              <option key={index} value={key}>{languageList[key].name}</option>
            ))}
          </select>

          <svg
            className="w-6 h-6 text-gray-500 cursor-pointer mx-0 sm:mx-4 my-2 sm:my-0"
            onClick={handleReverseLanguage}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label="Reverse languages"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
          </svg>

          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full sm:w-auto"
            value={outputFormat}
            onChange={(e) => {
              setOutputFormat(e.target.value);
              setTranslatedText('Translation');
            }}
            aria-label="Select output language"
          >
            {Object.keys(languageList).map((key, index) => (
              <option key={index} value={key}>{languageList[key].name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 relative">
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            rows="4"
            placeholder='Enter Text'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            aria-label="Input text"
          />
          {inputText && (
            <svg
              className="w-6 h-6 text-gray-500 cursor-pointer absolute top-2 right-2"
              onClick={handleRemoveInputText}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-label="Clear input text"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        <div className="mb-4">
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
            rows="4"
            placeholder='Translation'
            value={translatedText}
            readOnly
            aria-label="Translated text"
          />
        </div>

        <button
          className={`w-full px-6 py-3 font-bold text-white rounded-md transition duration-300 ease-in-out focus:outline-none ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 focus:bg-blue-600'}`}
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Translating...
            </div>
          ) : (
            'Translate'
          )}
        </button>
      </div>
    </div>
  );
}
