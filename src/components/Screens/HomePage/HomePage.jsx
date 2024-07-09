import React from 'react';
import { Link } from 'react-router-dom';

// Import local images
import quoteImage from '../../../assets/quote.png';
import sentenceMakerImage from '../../../assets/sentence-maker.png';
import sentenceCheckerImage from '../../../assets/sentence-checker.png';
import translationImage from '../../../assets/translation.png';

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4'>
      {/* Main Content */}
      <main className='flex flex-col items-center justify-center flex-grow'>
        <div className='text-white text-3xl md:text-4xl lg:text-5xl md:mt-0 mt-12 mb-12 text-center'>
          Discover Our Innovative Features
        </div>
        <div id="features" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4'>
          {/* Feature Cards */}
          <FeatureCard
            image={quoteImage}
            title="Quote Generator"
            description="Generate inspirational quotes to lift your spirits."
            buttonText="Explore Quotes"
            link="/quote-generator"
          />
          <FeatureCard
            image={sentenceMakerImage}
            title="Sentence Maker"
            description="Create well-structured sentences effortlessly."
            buttonText="Create Sentences"
            link="/sentence-maker"
          />
          <FeatureCard
            image={sentenceCheckerImage}
            title="Sentence Checker"
            description="Ensure your sentences are grammatically correct."
            buttonText="Check Sentences"
            link="/sentence-checker"
          />
          <FeatureCard
            image={translationImage}
            title="Translation Feature"
            description="Translate text between English and Tamil."
            buttonText="Start Translating"
            link="/translation"
          />
        </div>
      </main>
    </div>
  );
}

// FeatureCard Component
const FeatureCard = ({ image, title, description, buttonText, link }) => {
  return (
    <div className='flex flex-col items-center justify-center bg-white text-blue-500 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300'>
      <img src={image} alt={title} className='w-16 h-16 mb-4' />
      <div className='text-center'>
        <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
        <p className='text-base mb-6'>{description}</p>
        <Link to={link}>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition'>
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
