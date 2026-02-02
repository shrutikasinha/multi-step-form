# Multi-Step Form - Setup & Usage Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
npm run preview
```

## 📋 Features Overview

### ✅ Implemented Features

#### 1. Multi-Step Form (3 Steps)
- **Step 1**: Personal Information (First Name, Last Name, Date of Birth, Gender)
- **Step 2**: Contact Details (Email, Phone, Address, City, Country)
- **Step 3**: Preferences (Newsletter, Notifications, Language, Theme, Bio)

#### 2. Responsive Design
- **Mobile (< 768px)**: Vertical progress bar with stacked form layout
- **Tablet (768px - 1024px)**: Vertical progress bar with optimized spacing
- **Desktop (> 1024px)**: Horizontal progress bar with multi-column layouts

#### 3. Bilingual Support (English + Arabic)
- Full translation coverage for all UI elements
- RTL (Right-to-Left) layout for Arabic
- Language toggle button in header
- Persistent language preference

#### 4. Accessibility Features
- ARIA labels on all form fields
- ARIA roles for navigation and regions
- Keyboard navigation support
- Focus indicators
- Screen reader announcements for errors
- Semantic HTML structure

#### 5. Form Validation (React Hook Form)
- Required field validation
- Email format validation
- Phone number validation
- Minimum/maximum length validation
- Real-time error messages
- Field-level and form-level validation

#### 6. State Management
- **Redux Toolkit**: Global form state, step tracking, submission status
- **Context API**: LocalStorage integration, auto-save functionality
- Typed hooks for type safety
- Optimized re-renders

#### 7. Local Storage Persistence
- Auto-saves form data on every change
- Auto-saves current step
- Loads saved data on page refresh
- Clears data after successful submission
- Timestamp tracking

#### 8. Mock API Integration
- Axios implementation (primary)
- Fetch API implementation (alternative)
- JSONPlaceholder endpoint for testing
- 1.5-second simulated delay
- Error handling
- Success/failure feedback

#### 9. Beautiful UI/UX
- Custom color scheme with warm orange gradient
- Elegant typography (Playfair Display + Nunito)
- Smooth animations and transitions
- Hover effects and micro-interactions
- Loading states
- Success page with submitted data display

## 🎨 Design System

### Colors
```javascript
Primary: #f59837 (Orange)
Primary Gradient: from-#f59837 to-#f39031
Background: Gradient from primary-50 via white to primary-100
Text: Dark gray tones
Accents: Green for success, Red for errors
```

### Typography
```javascript
Display Font: Playfair Display (serif) - Headings
Body Font: Nunito (sans-serif) - Content
```

### Spacing
- Container max-width: 1024px (4xl)
- Section padding: 32-48px
- Form field spacing: 24px
- Button padding: 16px 24px

## 🔧 Customization Guide

### Changing the Color Scheme

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#your-color-50',
    500: '#your-main-color',
    // ... other shades
  }
}
```

### Adding a New Form Step

1. **Create Step Component** (`src/components/steps/NewStep.tsx`):
```typescript
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
// ... imports

const NewStep: React.FC = () => {
  // Implementation
};

export default NewStep;
```

2. **Update Form Slice** (`src/store/slices/formSlice.ts`):
```typescript
export interface FormData {
  // ... existing fields
  newField: string;
}
```

3. **Add Translations** (`src/i18n/config.ts`):
```typescript
steps: {
  // ... existing
  newStep: 'New Step',
},
```

4. **Update Form Page** (`src/pages/Form.tsx`):
```typescript
const steps = [
  t('steps.personal'),
  t('steps.contact'),
  t('steps.preferences'),
  t('steps.newStep'), // Add here
];

const stepComponents = [
  <PersonalInfo />,
  <ContactDetails />,
  <Preferences />,
  <NewStep />, // Add here
];
```

### Connecting to Real API

Edit `src/services/api.ts`:
```typescript
const api = axios.create({
  baseURL: 'https://your-api.com/api', // Change this
  timeout: 5000,
});

export const submitForm = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await api.post('/submit-form', formData); // Change endpoint
    
    return {
      success: true,
      message: 'Form submitted successfully!',
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to submit form.',
    };
  }
};
```

### Adding More Languages

Edit `src/i18n/config.ts`:
```typescript
const resources = {
  en: { /* ... */ },
  ar: { /* ... */ },
  es: { // Add Spanish
    translation: {
      appTitle: 'Formulario de Registro',
      // ... all translations
    },
  },
};
```

Update language toggle in `src/pages/Form.tsx`:
```typescript
const toggleLanguage = () => {
  const languages = ['en', 'ar', 'es'];
  const currentIndex = languages.indexOf(i18n.language);
  const nextIndex = (currentIndex + 1) % languages.length;
  const newLang = languages[nextIndex];
  i18n.changeLanguage(newLang);
};
```

## 📱 Responsive Behavior

### Breakpoints
```
Mobile: 0 - 767px
Tablet: 768px - 1023px
Desktop: 1024px+
```

### Progress Bar
- **Mobile/Tablet**: Vertical layout with numbered circles
- **Desktop**: Horizontal layout with connecting lines

### Form Layout
- **Mobile**: Single column, full width inputs
- **Tablet**: Single column with larger inputs
- **Desktop**: Multi-column grid where appropriate (City/Country)

## 🔐 Form Validation Rules

### Step 1: Personal Info
- **First Name**: Required, min 2 characters
- **Last Name**: Required, min 2 characters
- **Date of Birth**: Required
- **Gender**: Required

### Step 2: Contact Details
- **Email**: Required, valid email format
- **Phone**: Required, valid phone format (digits, spaces, +, -, (, ))
- **Address**: Required
- **City**: Required
- **Country**: Required

### Step 3: Preferences
- **Language**: Required
- **Theme**: Required
- **Bio**: Optional, max 500 characters
- **Newsletter/Notifications**: Optional (boolean)

## 💾 LocalStorage Schema

```typescript
{
  currentStep: number,      // 0, 1, or 2
  formData: {
    // Step 1
    firstName: string,
    lastName: string,
    dateOfBirth: string,    // YYYY-MM-DD
    gender: string,
    
    // Step 2
    email: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    
    // Step 3
    newsletter: boolean,
    notifications: boolean,
    language: string,
    theme: string,
    bio: string,
  },
  timestamp: string,         // ISO 8601 format
}
```

## 🧪 Testing the Form

### Manual Testing Checklist

1. **Navigation**
   - [ ] Can move forward through all steps
   - [ ] Can move backward through steps
   - [ ] Cannot skip steps
   - [ ] Progress bar updates correctly

2. **Validation**
   - [ ] Required fields show errors when empty
   - [ ] Email validation works
   - [ ] Phone validation works
   - [ ] Error messages display correctly
   - [ ] Can't proceed with invalid data

3. **Persistence**
   - [ ] Data saves automatically
   - [ ] Data loads on page refresh
   - [ ] Data clears after submission

4. **Language Toggle**
   - [ ] Toggle switches language
   - [ ] Layout switches to RTL for Arabic
   - [ ] All text translates correctly

5. **Responsiveness**
   - [ ] Mobile layout works correctly
   - [ ] Tablet layout works correctly
   - [ ] Desktop layout works correctly
   - [ ] Progress bar adapts to screen size

6. **Accessibility**
   - [ ] Keyboard navigation works
   - [ ] Focus indicators visible
   - [ ] ARIA labels present
   - [ ] Screen reader compatible

7. **Submission**
   - [ ] Loading state shows during submission
   - [ ] Success page displays
   - [ ] Submitted data is correct
   - [ ] Can reset and start over

## 🐛 Troubleshooting

### Issue: Form data not persisting
**Solution**: Check browser's localStorage settings and ensure it's not disabled.

### Issue: Arabic layout not displaying correctly
**Solution**: Ensure `document.documentElement.dir` is set to 'rtl' and check RTL CSS rules.

### Issue: API submission failing
**Solution**: Check network tab in browser DevTools, verify API endpoint is accessible.

### Issue: Date picker not working
**Solution**: Ensure dayjs is installed: `npm install dayjs`

### Issue: Styles not applying
**Solution**: Run `npm install` to ensure all dependencies are installed, restart dev server.

## 📊 Performance Tips

1. **Lazy Loading**: Consider lazy loading step components for large forms
2. **Memoization**: Use React.memo for components that don't need frequent re-renders
3. **Debouncing**: Debounce localStorage saves if performance is a concern
4. **Code Splitting**: Already implemented with React Router

## 🎯 Next Steps / Future Enhancements

- [ ] Add file upload capability
- [ ] Implement form analytics
- [ ] Add more validation rules (custom patterns)
- [ ] Create admin dashboard to view submissions
- [ ] Add email confirmation step
- [ ] Implement social login integration
- [ ] Add progress percentage indicator
- [ ] Create printable summary page
- [ ] Add multi-language support for more languages
- [ ] Implement dark mode toggle
- [ ] Add unit tests
- [ ] Add E2E tests with Cypress/Playwright

## 📚 Additional Resources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Ant Design Documentation](https://ant.design/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React i18next Documentation](https://react.i18next.com/)

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Happy coding! 🎉
