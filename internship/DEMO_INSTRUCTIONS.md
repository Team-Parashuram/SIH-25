# 🎯 PM Internship Portal - DEMO INSTRUCTIONS

## Quick Demo Guide

This is a **completely hardcoded UI demonstration** of the PM Internship authentication flow. No real backend or services are connected.

### 🚀 How to Demo the Authentication Flow:

1. **Start at Homepage** → Click "Demo Login Flow"

2. **Mobile OTP Step:**
   - Enter ANY 10-digit mobile number (e.g., 9876543210)
   - CAPTCHA: Type "DEMO"
   - Click "Send OTP"

3. **OTP Verification:**
   - Enter ANY 4+ digits (e.g., 1234)
   - Click "Verify OTP"

4. **Demo eKYC:**
   - Check the consent checkbox
   - Click "Proceed with Demo eKYC"
   - Watch the processing animation (2 seconds)
   - Random name will be auto-generated

5. **Email Verification:**
   - Enter any email address
   - Click "Send Email OTP"
   - Enter ANY 4+ digits for OTP
   - Click "Verify Email OTP"

6. **Profile Creation:**
   - Name is pre-filled from "eKYC"
   - Complete the ML-powered profile form
   - Get AI recommendations!

### 🎭 Demo Features:

- ✅ **No real validation** - accepts any input for smooth demo
- ✅ **Realistic UI flow** - shows complete PMIS authentication
- ✅ **Random names** - simulates different users each time
- ✅ **ML integration** - connects to existing recommendation engine
- ✅ **Professional design** - looks like real government portal

### 🔧 Technical Notes:

- Everything is hardcoded in `/src/contexts/AuthContext.tsx`
- No API calls or backend needed
- Perfect for presentations and demos
- All validation is bypassed for smooth flow
- Realistic loading states and animations

### 📱 Demo Flow Summary:
```
Mobile (any 10 digits) → OTP (any 4+ digits) → eKYC (automatic) → 
Email (any email) → Email OTP (any 4+ digits) → Profile → ML Recommendations
```

**Total demo time: ~2-3 minutes for complete flow**
