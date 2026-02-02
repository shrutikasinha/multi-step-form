import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  fullName: string;
  reasonForApplying: string | undefined;
  employmentCircumstances: string | undefined;
  currentFinancialSituation: string | undefined;
  housingStatus: string | undefined;
  monthlyIncome: number | undefined;
  employmentStatus: string | undefined;
  maritalStatus: string | undefined;
  dependents: number | undefined;
  state: string | undefined;
  nationalId: string | undefined;
  name: string | undefined;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  
  newsletter: boolean;
  notifications: boolean;
  language: string;
  theme: string;
  bio: string;
}

interface FormState {
  currentStep: number;
  formData: FormData;
  isSubmitted: boolean;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  newsletter: false,
  notifications: false,
  language: '',
  theme: '',
  bio: '',
};

const initialState: FormState = {
  currentStep: 0,
  formData: initialFormData,
  isSubmitted: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm: (state) => {
      state.currentStep = 0;
      state.formData = initialFormData;
      state.isSubmitted = false;
    },
    setSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    loadFormData: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setStep, updateFormData, resetForm, setSubmitted, loadFormData } = formSlice.actions;
export default formSlice.reducer;
