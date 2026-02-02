import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { resetForm } from '../store/slices/formSlice';

const Success: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(resetForm());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-fade-in">
        {/* Success Icon */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-4">
            {t('success.title')}
          </h1>
          <p className="text-lg text-dark-600 font-body">
            {t('success.message')}
          </p>
        </div>

        {/* Reset Button */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={handleReset}
            className="w-full bg-white border-2 border-dark-300 text-dark-700 font-bold py-4 px-6 rounded-lg hover:bg-dark-50 transition-all duration-300 font-body text-lg"
            aria-label={t('buttons.reset')}
          >
            {t('buttons.reset')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
