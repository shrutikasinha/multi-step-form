import React, { createContext, useContext, useEffect, ReactNode, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadFormData } from '../store/slices/formSlice';

interface FormContextType {
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  clearLocalStorage: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const STORAGE_KEY = 'multiStepFormData';

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { currentStep, formData, isSubmitted } = useAppSelector((state) => state.form);
  const isInitialMount = useRef(true);

  const saveToLocalStorage = useCallback(() => {
    try {
      const dataToSave = {
        currentStep,
        formData,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      console.log('Data saved to localStorage:', dataToSave);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [currentStep, formData]);

  const loadFromLocalStorage = useCallback(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        dispatch(loadFormData({
          currentStep: parsed.currentStep || 0,
          formData: parsed.formData || {},
        }));
        console.log('Data loaded from localStorage:', parsed);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return false;
    }
  }, [dispatch]);

  const clearLocalStorage = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('localStorage cleared');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, []);

  // Load saved data on mount (only once)
  useEffect(() => {
    if (isInitialMount.current) {
      loadFromLocalStorage();
      isInitialMount.current = false;
    }
  }, [loadFromLocalStorage]);

  // Auto-save when form data or step changes (but not on initial mount)
  useEffect(() => {
    if (!isInitialMount.current && !isSubmitted) {
      saveToLocalStorage();
    }
  }, [currentStep, formData, saveToLocalStorage, isSubmitted]);

  // Clear localStorage when form is submitted
  useEffect(() => {
    if (isSubmitted) {
      clearLocalStorage();
    }
  }, [isSubmitted, clearLocalStorage]);

  return (
    <FormContext.Provider value={{ saveToLocalStorage, loadFromLocalStorage, clearLocalStorage }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};