import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, steps }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="w-full mb-8 lg:mb-12" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={totalSteps}>
      {/* Mobile/Tablet - Vertical Progress */}
      <div className="lg:hidden space-y-4">
        <div className="text-center mb-6">
          <p className="text-sm font-body text-dark-400 mb-2">
            {t('progress', { current: currentStep + 1, total: totalSteps })}
          </p>
          <div className="w-full bg-dark-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                index === currentStep
                  ? 'bg-primary-500 text-white shadow-lg scale-110'
                  : index < currentStep
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-dark-100 text-dark-400'
              }`}
            >
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <div className="flex-1">
              <p
                className={`font-body font-semibold transition-all duration-300 ${
                  index === currentStep
                    ? 'text-primary-600 text-lg'
                    : index < currentStep
                    ? 'text-primary-500'
                    : 'text-dark-400'
                }`}
              >
                {step}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop - Horizontal Progress */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-dark-200" style={{ 
            left: isRTL ? 'auto' : '2.5rem',
            right: isRTL ? '2.5rem' : 'auto',
          }} />
          <div
            className="absolute top-5 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 ease-out"
            style={{
              width: `calc(${(currentStep / (totalSteps - 1)) * 100}% - 5rem)`,
              left: isRTL ? 'auto' : '2.5rem',
              right: isRTL ? '2.5rem' : 'auto',
            }}
          />

          {/* Steps */}
          <div className={`relative flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between`}>
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center" style={{ width: `${100 / totalSteps}%` }}>
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-primary-500 text-white shadow-xl shadow-primary-500/30 scale-110 ring-4 ring-primary-100'
                      : index < currentStep
                      ? 'bg-primary-100 text-primary-700 shadow-md'
                      : 'bg-white text-dark-400 border-2 border-dark-200'
                  }`}
                >
                  {index < currentStep ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <p
                  className={`mt-3 text-center font-body font-semibold transition-all duration-300 ${
                    index === currentStep
                      ? 'text-primary-600 text-base'
                      : index < currentStep
                      ? 'text-primary-500 text-sm'
                      : 'text-dark-400 text-sm'
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
