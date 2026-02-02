import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import ProgressBar from '../components/ProgressBar';
import PersonalInfo from '../components/steps/PersonalInfo';
import ContactDetails from '../components/steps/FinancialInfo';
import Preferences from '../components/steps/AdditionalInfo';

const Form: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { currentStep, isSubmitted } = useAppSelector((state) => state.form);

  const steps = [
    t('steps.personal'),
    t('steps.financial'),
    t('steps.additional'),
  ];

  const stepComponents = [
    <PersonalInfo />,
    <ContactDetails />,
    <Preferences />,
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    if (isSubmitted) {
      navigate('/success');
    }
  }, [isSubmitted, navigate]);

  useEffect(() => {
    // Set initial direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12 animate-fade-in">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-white border border-dark-300 rounded-lg hover:bg-dark-50 transition-colors duration-300 font-body font-semibold text-dark-700"
              aria-label={`Switch to ${i18n.language === 'en' ? 'Arabic' : 'English'}`}
            >
              {t('language.switch')}
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark-900 mb-3">
            {t('appTitle')}
          </h1>
          <p className="text-lg md:text-xl text-dark-600 font-body">
            {t('appSubtitle')}
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={steps.length} steps={steps} />

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10 mb-6">
          {stepComponents[currentStep]}
        </div>

        {/* Auto-save indicator */}
        <div className="text-center text-sm text-dark-500 font-body animate-pulse-subtle">
          💾 {t('savedProgress')}
        </div>
      </div>
    </div>
  );
};

export default Form;
