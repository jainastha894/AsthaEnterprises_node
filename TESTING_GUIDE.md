# Admin Interface Testing Guide

## Quick Start

The server is currently running at **http://localhost:3000**

## Testing the Theme Toggle

### 1. Access the Admin Panel
1. Open your web browser
2. Navigate to: `http://localhost:3000/admin`
3. Log in with your admin credentials

### 2. Locate the Theme Toggle Button
The theme toggle button is located in the **header**, between the user profile and logout button.
- **Light Mode**: Shows 🌙 icon with "Dark" text
- **Dark Mode**: Shows ☀️ icon with "Light" text

### 3. Test Theme Switching

#### Light Mode (Default)
- **Background**: White with light gray accents
- **Text**: Dark blackish-red tones
- **Accent Colors**: Blackish-red (#8b2f2f)
- **Borders**: Light red-tinted

#### Dark Mode
- **Background**: Black with dark gray accents
- **Text**: White with gray variations
- **Accent Colors**: Gold (#FFD700)
- **Borders**: Gold

### 4. Verify Theme Persistence
1. Switch to dark mode
2. Navigate to another admin page (e.g., Products, Leads)
3. Verify the theme remains dark
4. Refresh the page
5. Verify the theme is still dark (saved in localStorage)

## Testing Mobile Responsiveness

### Desktop Testing (Browser DevTools)
1. Open Chrome/Firefox DevTools (F12)
2. Click the device toolbar icon (Ctrl+Shift+M)
3. Test the following screen sizes:

#### Large Desktop (1920px)
- ✅ Full sidebar visible
- ✅ All header elements visible
- ✅ Stats cards in grid layout

#### Desktop (1024px - 1440px)
- ✅ Sidebar can be minimized/maximized
- ✅ Content adjusts accordingly
- ✅ All features accessible

#### Tablet (768px - 1024px)
- ✅ Sidebar becomes off-canvas
- ✅ Hamburger menu toggles sidebar
- ✅ Stats cards adjust to 2 columns
- ✅ Header elements remain visible

#### Mobile (480px - 768px)
- ✅ Sidebar slides in from left
- ✅ Overlay appears when sidebar is open
- ✅ User info text hidden (avatar only)
- ✅ Theme toggle text hidden (icon only)
- ✅ Stats cards in single column
- ✅ Touch-friendly button sizes (40px minimum)

#### Small Mobile (320px - 480px)
- ✅ All elements scale down appropriately
- ✅ Buttons remain touch-friendly (36px minimum)
- ✅ Text remains readable
- ✅ No horizontal scrolling

### Mobile Device Testing
Test on actual devices:
- **iOS**: iPhone (Safari, Chrome)
- **Android**: Various devices (Chrome, Firefox)

### Key Features to Test

#### 1. Header
- [ ] Company name visible
- [ ] Hamburger menu functional
- [ ] Theme toggle button works
- [ ] User profile dropdown works
- [ ] Logout button accessible

#### 2. Sidebar
- [ ] Opens/closes smoothly on mobile
- [ ] Navigation items are touch-friendly
- [ ] Active page is highlighted
- [ ] Scrolls properly on long menus

#### 3. Content Area
- [ ] Adjusts width when sidebar toggles
- [ ] No horizontal overflow
- [ ] Stats cards stack properly
- [ ] Forms are usable on mobile

#### 4. Theme Toggle
- [ ] Button visible in both themes
- [ ] Icon changes (🌙 ↔ ☀️)
- [ ] Text changes (Dark ↔ Light)
- [ ] Smooth color transitions
- [ ] All components update correctly

#### 5. Touch Interactions
- [ ] All buttons are at least 36px
- [ ] Links are easy to tap
- [ ] No accidental clicks
- [ ] Swipe gestures work naturally

## Common Issues & Solutions

### Issue: Theme doesn't persist
**Solution**: Check browser localStorage is enabled

### Issue: Sidebar doesn't open on mobile
**Solution**: Ensure JavaScript is enabled and no console errors

### Issue: Colors look wrong
**Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: Layout breaks on specific screen size
**Solution**: Check CSS media queries and report the exact screen width

## Browser Compatibility Checklist

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Performance Testing

### Theme Switch Speed
- Should be instant (< 100ms)
- No flickering or flash of unstyled content

### Mobile Sidebar Animation
- Should be smooth (300ms transition)
- No lag or stuttering

### Page Load
- Theme should apply immediately on load
- No flash of wrong theme

## Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader compatible
- [ ] Touch targets meet minimum size

## Screenshots to Capture

For documentation, capture screenshots of:
1. Light mode - Desktop view
2. Dark mode - Desktop view
3. Light mode - Mobile view (sidebar closed)
4. Light mode - Mobile view (sidebar open)
5. Dark mode - Mobile view
6. Theme toggle button (both states)
7. Stats cards on mobile
8. Login page in both themes

## Reporting Issues

If you find any issues, please note:
- Screen size when issue occurred
- Browser and version
- Theme mode (light/dark)
- Steps to reproduce
- Expected vs actual behavior
- Screenshot if possible

## Success Criteria

✅ Theme toggle works in all admin pages
✅ Theme persists across navigation and page refreshes
✅ All components look good in both themes
✅ Mobile layout works on all screen sizes
✅ No horizontal scrolling on any device
✅ All interactive elements are touch-friendly
✅ Smooth transitions and animations
✅ No console errors
✅ Works in all major browsers

---

**Note**: The server is currently running. You can start testing immediately by opening http://localhost:3000/admin in your browser.
