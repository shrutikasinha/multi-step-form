# Multi-Step Form Application

A fully responsive, accessible multi-step registration form built with React, TypeScript, and modern web technologies.

## 🎯 Features

### Core Features
- ✅ **3-Step Form Process**: Personal Info → Financial Details → Additional Details
- ✅ **Responsive Design**: Mobile-first approach with vertical progress on small screens, horizontal on desktop
- ✅ **Bilingual Support**: English and Arabic with full RTL (Right-to-Left) support
- ✅ **Form Validation**: Using react-hook-form with comprehensive validation rules
- ✅ **Local Storage**: Auto-saves progress to localStorage
- ✅ **Mock API Integration**: Submits data to JSONPlaceholder API
- ✅ **Accessibility**: ARIA roles, keyboard navigation, screen reader support
- ✅ **State Management**: Redux Toolkit + Context API
- ✅ **Beautiful UI**: Custom design with Tailwind CSS and Ant Design components

### Technical Features
- React 18 with TypeScript
- React Hook Form for form management
- Redux Toolkit for global state
- Context API for form persistence
- React Router for navigation
- React-i18next for internationalization
- Axios & Fetch API for HTTP requests
- Ant Design components
- Tailwind CSS for styling
- Vite for fast development

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Build for production**:
```bash
npm run build
```

4. **Preview production build**:
```bash
npm run preview
```

## 🏗️ Project Structure

```
multi-step-form/
├── src/
│   ├── components/
│   │   ├── ProgressBar.tsx          # Progress indicator component
│   │   └── steps/
│   │       ├── PersonalInfo.tsx     # Step 1: Personal information
│   │       ├── FinancialInfo.tsx   # Step 2: Financial information
│   │       └── AdditionalInfo.tsx      # Step 3: Additional info with AI support
│   ├── pages/
│   │   ├── Form.tsx                 # Main form page
│   │   └── Success.tsx              # Success confirmation page
│   ├── store/
│   │   ├── store.ts                 # Redux store configuration
│   │   ├── hooks.ts                 # Typed Redux hooks
│   │   └── slices/
│   │       └── formSlice.ts         # Form state slice
│   ├── context/
│   │   └── FormContext.tsx          # Form context for localStorage
│   ├── services/
│   │   └── api.ts                   # API service with mock submit
│   ├── i18n/
│   │   └── config.ts                # i18next configuration
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Warm orange gradient (#f59837 to #f39031)
- **Background**: Soft gradient from primary-50 to primary-100
- **Text**: Dark gray tones for excellent readability

### Typography
- **Display Font**: Playfair Display (elegant serif for headings)
- **Body Font**: Nunito (clean sans-serif for content)

### Responsive Breakpoints
- Mobile: < 768px (vertical progress)
- Tablet: 768px - 1024px
- Desktop: > 1024px (horizontal progress)

## 🔑 Key Components

### ProgressBar
- Horizontal layout on desktop (lg+)
- Vertical layout on mobile/tablet
- Visual indicators for completed, current, and upcoming steps
- Smooth transitions and animations

### Form Steps

#### Step 1: Personal Information

#### Step 2: Financial Information

#### Step 3: Additional Information 

## 🌐 Internationalization

### Supported Languages
- English (default)
- Arabic (with RTL support)

### Usage
Click the language toggle button in the top-right corner to switch between English and Arabic.

### RTL Support
The application automatically adjusts layout direction when Arabic is selected:
- Text alignment
- Component direction
- Icon positions
- Form layouts

## 💾 Local Storage

The form automatically saves progress to localStorage:
- Saves on every step change
- Saves on form field updates
- Loads saved data on page refresh
- Clears on successful submission

### Storage Key
`multiStepFormData`

## 🔌 API Integration

### Mock API Endpoint
The application uses JSONPlaceholder for demonstration:
- Endpoint: `https://jsonplaceholder.typicode.com/posts`
- Method: POST
- Simulated delay: 1.5 seconds

### Switching APIs
To use a different API:
1. Open `src/services/api.ts`
2. Update the `baseURL` in the axios instance
3. Modify the `submitForm` function as needed

## ♿ Accessibility Features

- **ARIA Labels**: All form fields have proper labels
- **ARIA Roles**: Progress bar, alerts, and regions
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Screen Reader Support**: Descriptive text for all interactions
- **Error Announcements**: Live regions for validation errors
- **Semantic HTML**: Proper use of form elements

## 🎯 State Management

### Redux Toolkit
- Global form state
- Current step tracking
- Form data storage
- Submission status

### Context API
- LocalStorage integration
- Auto-save functionality
- Data persistence

## 🚀 Performance Optimizations

- Code splitting with React Router
- Lazy loading of components
- Optimized re-renders with React.memo
- Efficient state updates
- Minimal bundle size with Vite

## 🧪 Testing Recommendations

```bash
# Install testing dependencies (not included by default)
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom

# Create test files
# src/components/__tests__/ProgressBar.test.tsx
# src/components/steps/__tests__/PersonalInfo.test.tsx
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your custom color palette
  }
}
```

### Changing Fonts
1. Update `index.html` with new Google Fonts link
2. Update `tailwind.config.js`:
```javascript
fontFamily: {
  'display': ['Your Display Font', 'serif'],
  'body': ['Your Body Font', 'sans-serif'],
}
```

### Adding More Steps
1. Create new component in `src/components/steps/`
2. Add to `stepComponents` array in `src/pages/Form.tsx`
3. Update translation keys in `src/i18n/config.ts`
4. Update form slice in `src/store/slices/formSlice.ts`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Tips

1. **Form Validation**: Customize validation rules in each step component
2. **API Integration**: Replace mock API with your real backend
3. **Styling**: Modify Tailwind classes for your brand
4. **Language**: Add more languages in `src/i18n/config.ts`
5. **Fields**: Add/remove form fields as needed

## 📞 Support

For issues or questions, please open an issue on the GitHub repository.

---

Built with ❤️ using React, TypeScript, and modern web technologies.
