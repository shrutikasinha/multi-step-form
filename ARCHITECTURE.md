# Architecture Diagram

## Component Hierarchy

```
App (Router + Redux Provider)
│
├── Form Page
│   ├── Language Toggle Button
│   ├── Header (Title + Subtitle)
│   ├── ProgressBar Component
│   │   ├── Mobile: Vertical Steps
│   │   └── Desktop: Horizontal Steps
│   │
│   └── Current Step Component
│       ├── Step 1: PersonalInfo
│       │   ├── First Name Input
│       │   ├── Last Name Input
│       │   ├── Date of Birth Picker
│       │   └── Gender Select
│       │
│       ├── Step 2: ContactDetails
│       │   ├── Email Input
│       │   ├── Phone Input
│       │   ├── Address Input
│       │   ├── City Input
│       │   └── Country Select
│       │
│       └── Step 3: Preferences
│           ├── Newsletter Switch
│           ├── Notifications Switch
│           ├── Language Select
│           ├── Theme Select
│           └── Bio TextArea
│
└── Success Page
    ├── Success Icon
    ├── Success Message
    ├── View Data Toggle
    ├── Submitted Data Display
    └── Reset Button
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│  (React Components with React Hook Form)                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Form Validation Layer                       │
│         (React Hook Form Controller)                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                Redux Store (Global State)               │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Form Slice                                       │  │
│  │  - currentStep: number                            │  │
│  │  - formData: FormData                             │  │
│  │  - isSubmitted: boolean                           │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│           Form Context (localStorage Sync)              │
│  - saveToLocalStorage()                                 │
│  - loadFromLocalStorage()                               │
│  - clearLocalStorage()                                  │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
┌──────────────┐         ┌──────────────────┐
│ LocalStorage │         │   API Service    │
│   (Browser)  │         │  (api.ts)        │
└──────────────┘         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  Backend API     │
                         │ (Mock/Real)      │
                         └──────────────────┘
```

## State Management Flow

```
┌──────────────┐
│  Component   │
│   Mounts     │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│ Load from localStorage   │
│    (FormContext)         │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Dispatch loadFormData   │
│   (Redux Action)         │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Update Redux Store      │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Component Re-renders     │
│  with saved data         │
└──────────────────────────┘


User Input Flow:
┌──────────────┐
│ User Types   │
│  in Field    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│  React Hook Form         │
│  Updates Local State     │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  User Clicks Next        │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Validation Runs         │
└──────┬───────────────────┘
       │
   ┌───┴────┐
   │ Valid? │
   └───┬────┘
       │
    Yes│         No
       │          │
       ▼          ▼
┌──────────┐  ┌────────────┐
│ Dispatch │  │ Show Error │
│updateData│  │  Messages  │
└─────┬────┘  └────────────┘
      │
      ▼
┌──────────────┐
│Update Redux  │
│    Store     │
└─────┬────────┘
      │
      ▼
┌──────────────────┐
│ Auto-save to     │
│  localStorage    │
│  (via Context)   │
└─────┬────────────┘
      │
      ▼
┌──────────────┐
│ Navigate to  │
│  Next Step   │
└──────────────┘
```

## Internationalization Flow

```
┌─────────────────────┐
│  User Clicks        │
│ Language Toggle     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────┐
│  i18next.changeLanguage │
│       (en ↔ ar)         │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Update document.dir    │
│   (ltr ↔ rtl)           │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Components Re-render   │
│  with New Translations  │
└─────────────────────────┘
```

## API Submission Flow

```
┌──────────────────┐
│  User Completes  │
│   Final Step     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Click Submit    │
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│  Set Loading State   │
│  (isSubmitting=true) │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Call submitForm()   │
│  (api.ts)            │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  POST to API         │
│  (Axios/Fetch)       │
└────────┬─────────────┘
         │
    ┌────┴────┐
    │Success? │
    └────┬────┘
         │
  Yes    │      No
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────────┐
│Show    │ │Show Error  │
│Success │ │Message     │
│Message │ └────────────┘
└───┬────┘
    │
    ▼
┌────────────────┐
│Clear          │
│localStorage   │
└───┬───────────┘
    │
    ▼
┌────────────────┐
│Navigate to    │
│Success Page   │
└───────────────┘
```

## Responsive Layout Transformation

```
Mobile (< 768px):                Desktop (≥ 1024px):
┌──────────────┐                 ┌─────────────────────────────────┐
│    Header    │                 │           Header                │
├──────────────┤                 ├─────────────────────────────────┤
│              │                 │                                 │
│  ┌──┐ Step 1│                 │  Step 1 ━━━ Step 2 ━━━ Step 3  │
│  └──┘        │                 │   ●──────────●──────────○       │
│  ┌──┐ Step 2│                 │                                 │
│  └──┘        │                 ├─────────────────────────────────┤
│  ┌──┐ Step 3│                 │                                 │
│  └──┘        │                 │                                 │
├──────────────┤                 │      Form Content               │
│              │                 │      (Multi-column)             │
│ Form Content │                 │                                 │
│ (Single Col) │                 │                                 │
│              │                 │                                 │
├──────────────┤                 ├─────────────────────────────────┤
│   Buttons    │                 │        Prev | Next              │
└──────────────┘                 └─────────────────────────────────┘
```

## Technology Stack Visualization

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface Layer                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  React   │  │   Ant    │  │Tailwind  │             │
│  │    18    │  │  Design  │  │   CSS    │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│                  Form Management Layer                   │
│  ┌──────────────────┐  ┌────────────────────┐          │
│  │  React Hook Form │  │   Validation       │          │
│  └──────────────────┘  └────────────────────┘          │
└─────────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│                 State Management Layer                   │
│  ┌──────────┐  ┌────────────┐  ┌──────────────┐        │
│  │  Redux   │  │  Context   │  │ localStorage │        │
│  │ Toolkit  │  │    API     │  │              │        │
│  └──────────┘  └────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│              Internationalization Layer                  │
│  ┌──────────────────┐  ┌────────────────────┐          │
│  │  React-i18next   │  │   RTL Support      │          │
│  └──────────────────┘  └────────────────────┘          │
└─────────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│                   API/Network Layer                      │
│  ┌──────────┐  ┌──────────┐                            │
│  │  Axios   │  │  Fetch   │                            │
│  └──────────┘  └──────────┘                            │
└─────────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│                    Backend/API                           │
│         (JSONPlaceholder Mock / Real API)               │
└─────────────────────────────────────────────────────────┘
```

## Build & Development Tools

```
┌─────────────────────────────────────────────────────────┐
│                   Development Tools                      │
│  ┌────────┐  ┌────────────┐  ┌──────────┐             │
│  │  Vite  │  │ TypeScript │  │ ESLint   │             │
│  └────────┘  └────────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Fast Dev Server & HMR                       │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│          Optimized Production Build                      │
│   (Code Splitting, Tree Shaking, Minification)         │
└─────────────────────────────────────────────────────────┘
```

