import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, message, Modal, Spin, Radio, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateFormData, setStep, setSubmitted } from '../../store/slices/formSlice';
import { submitForm } from '../../services/api';
import { useFormContext } from '../../context/FormContext';
import { useGenerateContentMutation } from '../../store/slices/suggestionsSlice';

const { TextArea } = Input;

interface AdditionalInfoForm {
  currentFinancialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

type GenerationMode = 'replace' | 'append';

const AdditionalInfo: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form.formData);
  const { clearLocalStorage } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<string>('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [generationMode, setGenerationMode] = useState<GenerationMode>('replace');
  const [currentFieldValue, setCurrentFieldValue] = useState('');
  
  const [generateContent, { isLoading: isLoadingAI }] = useGenerateContentMutation();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AdditionalInfoForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      currentFinancialSituation: formData.currentFinancialSituation,
      employmentCircumstances: formData.employmentCircumstances,
      reasonForApplying: formData.reasonForApplying,
    },
  });

  const onSubmit = async (data: AdditionalInfoForm) => {
    const finalData = { ...formData, ...data };
    dispatch(updateFormData(data));
    
    setIsSubmitting(true);
    
    try {
      const response = await submitForm(finalData);
      
      if (response.success) {
        message.success(t('success.message'));
        dispatch(setSubmitted(true));
        clearLocalStorage();
        console.log('Form submitted successfully:', response.data);
      } else {
        message.error(t('error.message'));
      }
    } catch (error) {
      message.error(t('error.message'));
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    dispatch(setStep(1));
  };

  const openAIModal = (fieldName: string) => {
    setCurrentField(fieldName);
  
    const fieldValue = getValues(fieldName as keyof AdditionalInfoForm) || '';
    setCurrentFieldValue(fieldValue);
  
    setAiPrompt(fieldValue);
  
    setGenerationMode(fieldValue.trim() ? 'append' : 'replace');
    setIsAIModalOpen(true);
  };

  const closeAIModal = () => {
    setIsAIModalOpen(false);
    setCurrentField('');
    setAiPrompt('');
    setCurrentFieldValue('');
    setGenerationMode('replace');
  };

  const generateAIContent = async () => {
    const contentToUse = aiPrompt.trim();
    
    if (!contentToUse) {
      message.warning(t('additionalInfo.aiPromptRequired'));
      return;
    }
  
    try {
      const previousFormData = JSON.stringify({
        personalInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          nationality: formData.nationalId,
          address: formData.address,
        },
        currentField: {
          fieldName: currentField,
          currentValue: currentFieldValue,
        },
      });
  
      const result = await generateContent({
        fieldName: currentField,
        context: contentToUse,
        currentValue: currentFieldValue,
        usePersonalData: true,
        previousFormData,
      }).unwrap();

      if (result.content) {
        let finalContent = result.content;
        
        if (generationMode === 'append' && currentFieldValue) {
          finalContent = `${currentFieldValue}\n\n${result.content}`;
        }

        setAiPrompt(finalContent);
        message.success(t('additionalInfo.contentGenerated'));
      } else {
        message.error(t('additionalInfo.aiGenerationFailed'));
      }
    } catch (error) {
      console.error('AI generation error:', error);
      message.error(t('additionalInfo.aiGenerationFailed'));
    }
  };

  const updateFormField = () => {
    if (currentField && aiPrompt.trim()) {
      setValue(currentField as keyof AdditionalInfoForm, aiPrompt, { 
        shouldValidate: true,
        shouldDirty: true 
      });
      message.success(t('additionalInfo.fieldUpdated'));
      closeAIModal();
    } else {
      message.warning(t('additionalInfo.noContentToUpdate'));
    }
  };

  const handlePromptChange = (value: string) => {
    setAiPrompt(value);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-900 mb-2">
          {t('additionalInfo.title')}
        </h2>
        <p className="text-dark-500 font-body">{t('additionalInfo.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Financial Situation */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="currentFinancialSituation" className="block text-sm font-semibold text-dark-700 font-body">
              {t('additionalInfo.currentFinancialSituation')} <span className="text-primary-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => openAIModal('currentFinancialSituation')}
              className="text-primary-500 hover:text-primary-600 text-sm font-semibold flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t('additionalInfo.helpMeWrite')}
            </button>
          </div>
          <Controller
            name="currentFinancialSituation"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: {
                value: 50,
                message: t('validation.minLength', { count: 50 }),
              },
              maxLength: {
                value: 1000,
                message: t('validation.maxLength', { count: 1000 }),
              },
              pattern: {
                value: /^[a-zA-Z0-9\u0600-\u06FF\s.,!?;:()\-'"$€£¥%&/]+$/,
                message: t('validation.textInvalid'),
              },
            }}
            render={({ field }) => (
              <TextArea
                {...field}
                id="currentFinancialSituation"
                rows={5}
                placeholder={t('additionalInfo.currentFinancialSituationPlaceholder')}
                status={errors.currentFinancialSituation ? 'error' : ''}
                maxLength={1000}
                showCount
                aria-required="true"
                aria-invalid={!!errors.currentFinancialSituation}
                aria-describedby={errors.currentFinancialSituation ? 'currentFinancialSituation-error' : undefined}
                className="font-body"
              />
            )}
          />
          {errors.currentFinancialSituation && (
            <p id="currentFinancialSituation-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.currentFinancialSituation.message}
            </p>
          )}
        </div>

        {/* Employment Circumstances */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="employmentCircumstances" className="block text-sm font-semibold text-dark-700 font-body">
              {t('additionalInfo.employmentCircumstances')} <span className="text-primary-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => openAIModal('employmentCircumstances')}
              className="text-primary-500 hover:text-primary-600 text-sm font-semibold flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t('additionalInfo.helpMeWrite')}
            </button>
          </div>
          <Controller
            name="employmentCircumstances"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: {
                value: 50,
                message: t('validation.minLength', { count: 50 }),
              },
              maxLength: {
                value: 1000,
                message: t('validation.maxLength', { count: 1000 }),
              },
              pattern: {
                value: /^[a-zA-Z0-9\u0600-\u06FF\s.,!?;:()\-'"$€£¥%&/]+$/,
                message: t('validation.textInvalid'),
              },
            }}
            render={({ field }) => (
              <TextArea
                {...field}
                id="employmentCircumstances"
                rows={5}
                placeholder={t('additionalInfo.employmentCircumstancesPlaceholder')}
                status={errors.employmentCircumstances ? 'error' : ''}
                maxLength={1000}
                showCount
                aria-required="true"
                aria-invalid={!!errors.employmentCircumstances}
                aria-describedby={errors.employmentCircumstances ? 'employmentCircumstances-error' : undefined}
                className="font-body"
              />
            )}
          />
          {errors.employmentCircumstances && (
            <p id="employmentCircumstances-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.employmentCircumstances.message}
            </p>
          )}
        </div>

        {/* Reason for Applying */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="reasonForApplying" className="block text-sm font-semibold text-dark-700 font-body">
              {t('additionalInfo.reasonForApplying')} <span className="text-primary-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => openAIModal('reasonForApplying')}
              className="text-primary-500 hover:text-primary-600 text-sm font-semibold flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t('additionalInfo.helpMeWrite')}
            </button>
          </div>
          <Controller
            name="reasonForApplying"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: {
                value: 50,
                message: t('validation.minLength', { count: 50 }),
              },
              maxLength: {
                value: 1000,
                message: t('validation.maxLength', { count: 1000 }),
              },
              pattern: {
                value: /^[a-zA-Z0-9\u0600-\u06FF\s.,!?;:()\-'"$€£¥%&/]+$/,
                message: t('validation.textInvalid'),
              },
            }}
            render={({ field }) => (
              <TextArea
                {...field}
                id="reasonForApplying"
                rows={5}
                placeholder={t('additionalInfo.reasonForApplyingPlaceholder')}
                status={errors.reasonForApplying ? 'error' : ''}
                maxLength={1000}
                showCount
                aria-required="true"
                aria-invalid={!!errors.reasonForApplying}
                aria-describedby={errors.reasonForApplying ? 'reasonForApplying-error' : undefined}
                className="font-body"
              />
            )}
          />
          {errors.reasonForApplying && (
            <p id="reasonForApplying-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.reasonForApplying.message}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button
            type="button"
            onClick={handlePrevious}
            disabled={isSubmitting}
            className="flex-1 bg-white border-2 border-dark-300 text-dark-700 font-bold py-4 px-6 rounded-lg hover:bg-dark-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-body text-lg"
            aria-label={t('buttons.previous')}
          >
            {t('buttons.previous')}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-4 px-6 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-body text-lg"
            aria-label={t('buttons.submit')}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t('buttons.submit')}...
              </span>
            ) : (
              t('buttons.submit')
            )}
          </button>
        </div>
      </form>

      {/* AI Assistant Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{t('additionalInfo.aiAssistant')}</span>
          </div>
        }
        open={isAIModalOpen}
        onCancel={closeAIModal}
        footer={[
          <button
            key="cancel"
            onClick={closeAIModal}
            className="px-4 py-2 border border-dark-300 text-dark-700 rounded-lg hover:bg-dark-50 transition-colors font-body"
          >
            {t('buttons.cancel')}
          </button>,
          <button
            key="generate"
            onClick={generateAIContent}
            disabled={isLoadingAI}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-colors font-body ml-2 disabled:opacity-50"
          >
            {isLoadingAI ? t('additionalInfo.generating') : t('additionalInfo.generate')}
          </button>,
          <button
            key="update"
            onClick={updateFormField}
            disabled={!aiPrompt.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-body ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('additionalInfo.updateFormField')}
          </button>,
        ]}
        width={700}
        className="ai-modal"
      >
        <div className="space-y-4">
          {/* Generation Mode Selection */}
          {currentFieldValue && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-dark-700 mb-3 font-body">
                {t('additionalInfo.generationMode')}
              </label>
              <Radio.Group 
                onChange={(e) => setGenerationMode(e.target.value)} 
                value={generationMode}
                className="font-body"
              >
                <Space direction="vertical">
                  <Radio value="replace" className="font-body">
                    <span className="font-semibold">{t('additionalInfo.replaceMode')}</span>
                    <span className="text-dark-500 text-sm block ml-6">
                      {t('additionalInfo.replaceModeDescription')}
                    </span>
                  </Radio>
                  <Radio value="append" className="font-body">
                    <span className="font-semibold">{t('additionalInfo.appendMode')}</span>
                    <span className="text-dark-500 text-sm block ml-6">
                      {t('additionalInfo.appendModeDescription')}
                    </span>
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          )}

          {/* Single Text Input - Edit and generate from here */}
          <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2 font-body">
              {t('additionalInfo.editContent')}
            </label>
            <TextArea
              value={aiPrompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              rows={6}
              placeholder={t('additionalInfo.aiPromptPlaceholder')}
              className="font-body"
              disabled={isLoadingAI}
            />
          </div>

          {/* Loading State */}
          {isLoadingAI && (
            <div className="flex items-center justify-center py-8">
              <Spin size="large" tip={t('additionalInfo.generatingContent')} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AdditionalInfo;