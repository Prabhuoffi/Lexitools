import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from './components/Screens/WelcomePage/WelcomePage';
import HomePage from "./components/Screens/HomePage/HomePage";
import QuoteGeneratorPage from "./components/Pages/QuoteGeneratorPage";
import SentenceCheckerPage from "./components/Pages/SentenceCheckerPage";
import SentenceMakerPage from "./components/Pages/SentenceMakerPage";
import TranslationPage from "./components/Pages/TranslationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/quote-generator" element={<QuoteGeneratorPage />} />
        <Route path="/sentence-maker" element={<SentenceMakerPage />} />
        <Route path="/sentence-checker" element={<SentenceCheckerPage />} />
        <Route path="/translation" element={<TranslationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
