# 🚀 Quick Start Guide

Get up and running in 3 simple steps!

## Option 1: Using the Start Script (Easiest)

```bash
./start.sh
```

That's it! The script will:
- Check if Node.js is installed
- Install dependencies if needed
- Start the development server

## Option 2: Manual Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: `http://localhost:3000`

## 🎯 What You'll See

1. **Form Page** - A beautiful 3-step registration form
2. **Progress Bar** - Visual indicator of your progress
3. **Language Toggle** - Switch between English and Arabic
4. **Auto-Save** - Your progress is saved automatically

## 📝 Fill Out the Form

### Step 1: Personal Information
- Enter your first and last name
- Select your date of birth
- Choose your gender

### Step 2: Contact Details
- Provide your email address
- Enter your phone number
- Fill in your address, city, and country

### Step 3: Preferences
- Toggle newsletter and notification preferences
- Select your preferred language and theme
- Optionally add a bio

### Submit!
Click the submit button and see your data on the success page!

## 🌐 Try These Features

### Language Switching
Click the language toggle button (top right) to switch between English and Arabic. Notice how the entire interface adapts, including RTL layout for Arabic!

### Responsive Design
Try resizing your browser window or opening on mobile:
- **Desktop**: Horizontal progress bar
- **Mobile**: Vertical progress bar

### Auto-Save
1. Fill in some fields
2. Refresh the page
3. Your data is still there!

## 🧹 Reset the Form

After submission, click "Reset Form" to start over.

## 📚 Next Steps

- Read [README.md](README.md) for detailed documentation
- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for customization options
- Review [ARCHITECTURE.md](ARCHITECTURE.md) to understand the code structure

## 🐛 Troubleshooting

**Server won't start?**
- Make sure Node.js v16+ is installed: `node --version`
- Delete `node_modules` and run `npm install` again

**Port 3000 already in use?**
- Change the port in `vite.config.ts`
- Or stop the process using port 3000

**Styles not loading?**
- Clear your browser cache
- Restart the dev server

## 💡 Pro Tips

1. Open browser DevTools (F12) to see:
   - Redux state in Redux DevTools
   - LocalStorage data in Application tab
   - Network requests in Network tab

2. Try breaking the form:
   - Leave required fields empty
   - Enter invalid email formats
   - See how validation works!

3. Test accessibility:
   - Try navigating with keyboard only (Tab key)
   - Use a screen reader
   - Check ARIA labels in DevTools

---

Enjoy building with this multi-step form! 🎉
