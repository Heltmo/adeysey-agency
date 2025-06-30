# ADEYSEY MEDIA Testing Guide

## 🧪 A/B Testing & Form Optimization Testing

This guide covers testing the new A/B testing system for headlines and enhanced email capture flow with validation and analytics.

## Features Implemented

### 1. Headline A/B Testing System
- **4 headline variations** with weighted distribution (25% each)
- **Persistent variant assignment** via localStorage
- **Analytics tracking** for conversions and variant performance
- **Admin controls** to force specific variants for testing

### 2. Enhanced Email Capture Flow
- **Multi-step form validation** with real-time error feedback
- **Loading states** and smooth transitions
- **Analytics tracking** at each step
- **Test mode** with debug information
- **Email domain detection** for business vs. personal emails

### 3. Testing Dashboard
- **Live A/B test performance** with conversion rates
- **Form analytics** and drop-off analysis
- **Variant forcing** for specific testing
- **Data export** functionality

## Testing URLs

### Basic Testing
- **Normal view**: `https://your-domain.com/`
- **A/B test debug**: `https://your-domain.com/?debug=true`
- **Enhanced form testing**: `https://your-domain.com/?test=true`
- **Admin dashboard**: `https://your-domain.com/?admin=true`
- **Full testing mode**: `https://your-domain.com/?test=true&debug=true&admin=true`

## Test Scenarios

### A/B Testing Scenarios

#### 1. Variant Assignment Testing
```bash
# Test 1: Clear existing variant
localStorage.removeItem('headline_variant')
# Refresh page multiple times and note which headlines appear
# Each should appear roughly 25% of the time over 20+ refreshes

# Test 2: Force specific variant
localStorage.setItem('headline_variant', 'roi-focused')
# Refresh page - should consistently show "Measurable ROI. Proven Creators."

# Test 3: Test all variants
# Try each: original, performance-focused, roi-focused, speed-focused
```

#### 2. Analytics Tracking
```javascript
// Open browser console and check for analytics events
// Should see these events fired:
window.dataLayer // Check for these events:
// - ab_test_assignment
// - ab_test_conversion
// - email_capture_email_submitted
// - email_capture_segment_selected
```

### Email Capture Flow Testing

#### 1. Validation Testing
| Test Case | Input | Expected Result |
|-----------|-------|----------------|
| Empty email | "" | "Email is required" error |
| Invalid email | "test@" | "Please enter a valid email address" |
| Valid email | "test@company.com" | Advances to phone step |
| Short phone | "123" | "Phone number must be at least 10 digits" |
| Valid phone | "(555) 123-4567" | Advances to segment step |
| Skip phone | Click back → next | Should skip phone, go to segment |

#### 2. Flow Testing
```
Test Flow 1: Complete Flow
Email: test@company.com → Phone: 555-123-4567 → Brand → Complete

Test Flow 2: Skip Phone
Email: creator@gmail.com → Skip Phone (empty) → Creator → Complete

Test Flow 3: Navigation Testing
Email → Phone → Back → Email (should retain email)
Email → Phone → Segment → Brand → View Onboarding → Back to Home
```

#### 3. Error Handling
```
Test 1: Network Simulation
- Open DevTools → Network → Throttle to "Slow 3G"
- Submit form and verify loading states appear

Test 2: Rapid Clicking
- Click submit button rapidly
- Should disable during submission

Test 3: Browser Back Button
- Fill form partially, use browser back/forward
- Form state should persist
```

### Dashboard Testing

#### 1. Access Control
```bash
# Test 1: No parameters - dashboard hidden
https://your-domain.com/

# Test 2: With admin parameter - dashboard visible
https://your-domain.com/?admin=true

# Test 3: With debug parameter - dashboard visible + A/B info
https://your-domain.com/?debug=true
```

#### 2. Functionality Testing
```
Test 1: Variant Forcing
- Open dashboard → Click "Test" on different variants
- Verify headline changes immediately

Test 2: Data Export
- Click download button in dashboard
- Verify JSON file downloads with analytics data

Test 3: Refresh Button
- Click refresh button
- Page should reload and data should update
```

## QA Checklist

### Pre-Testing Setup
- [ ] Clear localStorage: `localStorage.clear()`
- [ ] Clear cookies and site data
- [ ] Test in incognito/private browsing mode
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices

### A/B Testing QA
- [ ] **Variant Distribution**: Test 20+ page loads, verify ~25% distribution
- [ ] **Persistence**: Assigned variant stays consistent across page reloads
- [ ] **Forced Variants**: All 4 variants can be forced and display correctly
- [ ] **Analytics Events**: Check browser console for proper event firing
- [ ] **Local Storage**: Verify `headline_variant` key is set correctly

### Email Form QA
- [ ] **Email Validation**: Test invalid emails, empty field, valid formats
- [ ] **Phone Validation**: Test short numbers, invalid formats, optional field
- [ ] **Error Display**: Errors show/hide appropriately with clear messaging
- [ ] **Loading States**: Spinner appears during form submission delays
- [ ] **Navigation**: Back buttons work, form state preserved
- [ ] **Completion**: Success state shows correct message for brand/creator
- [ ] **Onboarding**: "Preview Journey" button navigates to onboarding flow

### Mobile Testing
- [ ] **Responsive Design**: Form looks good on mobile devices
- [ ] **Touch Interaction**: Buttons are easy to tap, form inputs work
- [ ] **Keyboard**: Virtual keyboard doesn't break layout
- [ ] **Dashboard**: Testing dashboard is accessible on mobile (if needed)

### Performance Testing
- [ ] **Page Load**: Initial load time under 3 seconds
- [ ] **Form Submission**: Each step completes within 1 second
- [ ] **Analytics**: Event tracking doesn't slow down interactions
- [ ] **Memory**: No memory leaks during extended testing

## Expected Results

### Conversion Rate Optimization
Based on analytics from the testing dashboard, you should see:

- **ROI-focused headline** likely performing best (9.81% in mock data)
- **Phone step** as primary drop-off point (67.8% completion rate)
- **Email to segment** flow with 94.1% completion rate
- **Business email domains** getting flagged in analytics

### Analytics Data Points
The system tracks:
- Variant assignment timestamps
- Email domain types (business vs personal)
- Form completion times
- Drop-off points
- Conversion events by headline variant

## Troubleshooting

### Common Issues
1. **Variant not changing**: Clear localStorage and try again
2. **Dashboard not visible**: Add `?admin=true` to URL
3. **Form not validating**: Check console for JavaScript errors
4. **Analytics not tracking**: Verify dataLayer object exists

### Debug Commands
```javascript
// Check current variant
localStorage.getItem('headline_variant')

// Check analytics queue
window.dataLayer

// Force variant assignment
localStorage.setItem('headline_variant', 'performance-focused')
location.reload()

// Clear all data
localStorage.clear()
sessionStorage.clear()
```

## Success Criteria

✅ **A/B Testing**: All variants display correctly and track conversions
✅ **Form Validation**: Prevents invalid submissions with clear error messages
✅ **Analytics**: Comprehensive tracking of user behavior and variant performance
✅ **Dashboard**: Provides actionable insights for optimization
✅ **Mobile Ready**: Fully responsive and touch-friendly
✅ **Performance**: Fast, smooth user experience

---

**Need Help?** Add `?test=true&debug=true&admin=true` to the URL for maximum visibility into system behavior.
