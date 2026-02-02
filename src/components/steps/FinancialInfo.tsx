import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateFormData, setStep } from '../../store/slices/formSlice';

const { Option } = Select;

interface FinancialInfoForm {
  maritalStatus: string;
  dependents: number;
  employmentStatus: string;
  monthlyIncome: number;
  housingStatus: string;
}

const FinancialInfo: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form.formData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancialInfoForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      maritalStatus: formData.maritalStatus,
      dependents: formData.dependents,
      employmentStatus: formData.employmentStatus,
      monthlyIncome: formData.monthlyIncome,
      housingStatus: formData.housingStatus,
    },
  });

  const onSubmit = (data: FinancialInfoForm) => {
    dispatch(updateFormData(data));
    dispatch(setStep(2));
  };

  const handlePrevious = () => {
    dispatch(setStep(0));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-900 mb-2">
          {t('financialInfo.title')}
        </h2>
        <p className="text-dark-500 font-body">{t('financialInfo.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Marital Status */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <label htmlFor="maritalStatus" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('financialInfo.maritalStatus')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="maritalStatus"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <Select
                {...field}
                id="maritalStatus"
                size="large"
                className="w-full"
                placeholder={t('financialInfo.maritalStatusPlaceholder')}
                status={errors.maritalStatus ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.maritalStatus}
                aria-describedby={errors.maritalStatus ? 'maritalStatus-error' : undefined}
              >
                <Option value="single">{t('financialInfo.single')}</Option>
                <Option value="married">{t('financialInfo.married')}</Option>
                <Option value="divorced">{t('financialInfo.divorced')}</Option>
                <Option value="widowed">{t('financialInfo.widowed')}</Option>
                <Option value="separated">{t('financialInfo.separated')}</Option>
              </Select>
            )}
          />
          {errors.maritalStatus && (
            <p id="maritalStatus-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>

        {/* Dependents */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <label htmlFor="dependents" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('financialInfo.dependents')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="dependents"
            control={control}
            rules={{
              required: t('validation.required'),
              validate: {
                validNumber: (value) => {
                  if (value === null || value === undefined) {
                    return t('validation.required');
                  }
                  if (value < 0) {
                    return t('validation.dependentsNegative');
                  }
                  if (value > 20) {
                    return t('validation.dependentsTooMany');
                  }
                  if (!Number.isInteger(value)) {
                    return t('validation.dependentsInteger');
                  }
                  return true;
                },
              },
            }}
            render={({ field }) => (
              <InputNumber
                {...field}
                id="dependents"
                size="large"
                className="w-full font-body"
                placeholder={t('financialInfo.dependentsPlaceholder')}
                min={0}
                max={20}
                status={errors.dependents ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.dependents}
                aria-describedby={errors.dependents ? 'dependents-error' : undefined}
              />
            )}
          />
          {errors.dependents && (
            <p id="dependents-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.dependents.message}
            </p>
          )}
        </div>

        {/* Employment Status */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <label htmlFor="employmentStatus" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('financialInfo.employmentStatus')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="employmentStatus"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <Select
                {...field}
                id="employmentStatus"
                size="large"
                className="w-full"
                placeholder={t('financialInfo.employmentStatusPlaceholder')}
                status={errors.employmentStatus ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.employmentStatus}
                aria-describedby={errors.employmentStatus ? 'employmentStatus-error' : undefined}
              >
                <Option value="full-time">{t('financialInfo.fullTime')}</Option>
                <Option value="part-time">{t('financialInfo.partTime')}</Option>
                <Option value="self-employed">{t('financialInfo.selfEmployed')}</Option>
                <Option value="unemployed">{t('financialInfo.unemployed')}</Option>
                <Option value="retired">{t('financialInfo.retired')}</Option>
                <Option value="student">{t('financialInfo.student')}</Option>
              </Select>
            )}
          />
          {errors.employmentStatus && (
            <p id="employmentStatus-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.employmentStatus.message}
            </p>
          )}
        </div>

        {/* Monthly Income */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <label htmlFor="monthlyIncome" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('financialInfo.monthlyIncome')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="monthlyIncome"
            control={control}
            rules={{
              required: t('validation.required'),
              validate: {
                validAmount: (value) => {
                  if (value === null || value === undefined) {
                    return t('validation.required');
                  }
                  if (value < 0) {
                    return t('validation.incomeNegative');
                  }
                  if (value > 10000000) {
                    return t('validation.incomeTooHigh');
                  }
                  return true;
                },
              },
            }}
            render={({ field }) => (
              <InputNumber
                {...field}
                id="monthlyIncome"
                size="large"
                className="w-full font-body"
                placeholder={t('financialInfo.monthlyIncomePlaceholder')}
                min={0}
                max={10000000}
                step={100}
                formatter={(value) =>`AED ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value?.replace(/AED\s?|(,*)/g, '') as any}
                status={errors.monthlyIncome ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.monthlyIncome}
                aria-describedby={errors.monthlyIncome ? 'monthlyIncome-error' : undefined}
              />
            )}
          />
          {errors.monthlyIncome && (
            <p id="monthlyIncome-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.monthlyIncome.message}
            </p>
          )}
        </div>

        {/* Housing Status */}
        <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <label htmlFor="housingStatus" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('financialInfo.housingStatus')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="housingStatus"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <Select
                {...field}
                id="housingStatus"
                size="large"
                className="w-full"
                placeholder={t('financialInfo.housingStatusPlaceholder')}
                status={errors.housingStatus ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.housingStatus}
                aria-describedby={errors.housingStatus ? 'housingStatus-error' : undefined}
              >
                <Option value="own">{t('financialInfo.own')}</Option>
                <Option value="rent">{t('financialInfo.rent')}</Option>
                <Option value="mortgage">{t('financialInfo.mortgage')}</Option>
                <Option value="living-with-family">{t('financialInfo.livingWithFamily')}</Option>
                <Option value="other">{t('financialInfo.other')}</Option>
              </Select>
            )}
          />
          {errors.housingStatus && (
            <p id="housingStatus-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.housingStatus.message}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <button
            type="button"
            onClick={handlePrevious}
            className="flex-1 bg-white border-2 border-dark-300 text-dark-700 font-bold py-4 px-6 rounded-lg hover:bg-dark-50 transition-all duration-300 font-body text-lg"
            aria-label={t('buttons.previous')}
          >
            {t('buttons.previous')}
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-4 px-6 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-body text-lg"
            aria-label={t('buttons.next')}
          >
            {t('buttons.next')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialInfo;