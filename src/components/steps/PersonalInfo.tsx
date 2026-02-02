import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateFormData, setStep } from '../../store/slices/formSlice';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

interface PersonalInfoForm {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

const PersonalInfo: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form.formData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoForm>({
    mode: 'onChange', 
    reValidateMode: 'onChange', 
    defaultValues: {
      name: formData.name,
      nationalId: formData.nationalId,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      phone: formData.phone,
      email: formData.email,
    },
  });

  const onSubmit = (data: PersonalInfoForm) => {
    dispatch(updateFormData(data));
    dispatch(setStep(1));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-900 mb-2">
          {t('personalInfo.title')}
        </h2>
        <p className="text-dark-500 font-body">{t('personalInfo.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <label htmlFor="name" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('personalInfo.name')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: {
                value: 2,
                message: t('validation.minLength', { count: 2 }),
              },
              maxLength: {
                value: 100,
                message: t('validation.maxLength', { count: 100 }),
              },
              pattern: {
                value: /^[a-zA-Z\u0600-\u06FF\s'-]+$/,
                message: t('validation.nameInvalid'),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                size="large"
                placeholder={t('personalInfo.namePlaceholder')}
                status={errors.name ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="font-body"
              />
            )}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* National ID */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <label htmlFor="nationalId" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('personalInfo.nationalId')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="nationalId"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: {
                value: 5,
                message: t('validation.minLength', { count: 5 }),
              },
              maxLength: {
                value: 20,
                message: t('validation.maxLength', { count: 20 }),
              },
              pattern: {
                value: /^[A-Z0-9-]+$/i,
                message: t('validation.nationalIdInvalid'),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="nationalId"
                size="large"
                placeholder={t('personalInfo.nationalIdPlaceholder')}
                status={errors.nationalId ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.nationalId}
                aria-describedby={errors.nationalId ? 'nationalId-error' : undefined}
                className="font-body"
              />
            )}
          />
          {errors.nationalId && (
            <p id="nationalId-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.nationalId.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('personalInfo.dateOfBirth')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="dateOfBirth"
            control={control}
            rules={{
              required: t('validation.required'),
              validate: {
                validDate: (value) => {
                  if (!value) return true;
                  const date = dayjs(value);
                  const today = dayjs();
                  const age = today.diff(date, 'year');
                  if (!date.isValid()) {
                    return t('validation.dateInvalid');
                  }
                  if (date.isAfter(today)) {
                    return t('validation.dateFuture');
                  }
                  if (age < 13) {
                    return t('validation.ageTooYoung');
                  }
                  if (age > 120) {
                    return t('validation.ageTooOld');
                  }
                  return true;
                },
              },
            }}
            render={({ field }) => (
              <DatePicker
                {...field}
                id="dateOfBirth"
                size="large"
                className="w-full font-body"
                format="YYYY-MM-DD"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                status={errors.dateOfBirth ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.dateOfBirth}
                aria-describedby={errors.dateOfBirth ? 'dateOfBirth-error' : undefined}
                disabledDate={(current) => current && current.isAfter(dayjs())}
              />
            )}
          />
          {errors.dateOfBirth && (
            <p id="dateOfBirth-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <label htmlFor="gender" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('personalInfo.gender')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <Select
                {...field}
                id="gender"
                size="large"
                className="w-full"
                placeholder={t('personalInfo.genderPlaceholder')}
                status={errors.gender ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.gender}
                aria-describedby={errors.gender ? 'gender-error' : undefined}
              >
                <Option value="male">{t('personalInfo.male')}</Option>
                <Option value="female">{t('personalInfo.female')}</Option>
                <Option value="other">{t('personalInfo.other')}</Option>
                <Option value="prefer-not-to-say">{t('personalInfo.preferNotToSay')}</Option>
              </Select>
            )}
          />
          {errors.gender && (
            <p id="gender-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <label htmlFor="address" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('personalInfo.address')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="address"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: {
                value: 5,
                message: t('validation.minLength', { count: 5 }),
              },
              maxLength: {
                value: 200,
                message: t('validation.maxLength', { count: 200 }),
              },
              pattern: {
                value: /^[a-zA-Z0-9\u0600-\u06FF\s,.'-/#]+$/,
                message: t('validation.addressInvalid'),
              },
            }}
            render={({ field }) => (
              <TextArea
                {...field}
                id="address"
                size="large"
                rows={3}
                placeholder={t('personalInfo.addressPlaceholder')}
                status={errors.address ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'address-error' : undefined}
                className="font-body"
              />
            )}
          />
          {errors.address && (
            <p id="address-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* City */}
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <label htmlFor="city" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('personalInfo.city')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="city"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: {
                value: 2,
                message: t('validation.minLength', { count: 2 }),
              },
              maxLength: {
                value: 50,
                message: t('validation.maxLength', { count: 50 }),
              },
              pattern: {
                value: /^[a-zA-Z\u0600-\u06FF\s'-]+$/,
                message: t('validation.cityInvalid'),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="city"
                size="large"
                placeholder={t('personalInfo.cityPlaceholder')}
                status={errors.city ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? 'city-error' : undefined}
                className="font-body"
              />
            )}
          />
          {errors.city && (
            <p id="city-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* State */}
        <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <label htmlFor="state" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('personalInfo.state')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="state"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: {
                value: 2,
                message: t('validation.minLength', { count: 2 }),
              },
              maxLength: {
                value: 50,
                message: t('validation.maxLength', { count: 50 }),
              },
              pattern: {
                value: /^[a-zA-Z\u0600-\u06FF\s'-]+$/,
                message: t('validation.stateInvalid'),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="state"
                size="large"
                placeholder={t('personalInfo.statePlaceholder')}
                status={errors.state ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.state}
                aria-describedby={errors.state ? 'state-error' : undefined}
                className="font-body"
              />
            )}
          />
          {errors.state && (
            <p id="state-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.state.message}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <label htmlFor="country" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('personalInfo.country')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="country"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: {
                value: 2,
                message: t('validation.minLength', { count: 2 }),
              },
              maxLength: {
                value: 50,
                message: t('validation.maxLength', { count: 50 }),
              },
              pattern: {
                value: /^[a-zA-Z\u0600-\u06FF\s'-]+$/,
                message: t('validation.countryInvalid'),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="country"
                size="large"
                placeholder={t('personalInfo.countryPlaceholder')}
                status={errors.country ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.country}
                aria-describedby={errors.country ? 'country-error' : undefined}
                className="font-body"
              />
            )}
          />
          {errors.country && (
            <p id="country-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="animate-slide-up" style={{ animationDelay: '0.9s' }}>
          <label htmlFor="phone" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('personalInfo.phone')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: {
                value: 10,
                message: t('validation.minLength', { count: 10 }),
              },
              maxLength: {
                value: 20,
                message: t('validation.maxLength', { count: 20 }),
              },
              pattern: {
                value: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
                message: t('validation.phoneInvalid'),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="phone"
                size="large"
                placeholder={t('personalInfo.phonePlaceholder')}
                status={errors.phone ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className="font-body"
              />
            )}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="animate-slide-up" style={{ animationDelay: '1s' }}>
          <label htmlFor="email" className="block text-sm font-semibold text-dark-700 mb-2 font-body">
            {t('personalInfo.email')} <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: t('validation.required'),
              maxLength: {
                value: 100,
                message: t('validation.maxLength', { count: 100 }),
              },
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: t('validation.emailInvalid'),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                size="large"
                type="email"
                placeholder={t('personalInfo.emailPlaceholder')}
                status={errors.email ? 'error' : ''}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="font-body"
              />
            )}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-500 font-body" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Next Button */}
        <div className="pt-6 animate-slide-up" style={{ animationDelay: '1.1s' }}>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-4 px-6 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-body text-lg"
            aria-label={t('buttons.next')}
          >
            {t('buttons.next')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;