# 🧪 Testing Guide for PM Internship Portal

## OTP Testing Instructions

### 📱 **Phone Number Login**
1. Enter any valid 10-digit Indian phone number (starting with 6-9)
2. Example: `9876543210`
3. Click "Send OTP"

### 🔢 **OTP Verification**
1. **Demo OTP**: Use `123456` (recommended)
2. **Alternative**: Enter any 6-digit number
3. **Auto-submit**: OTP will auto-submit when all 6 digits are entered
4. **Manual submit**: Click "Verify OTP" button

### 🔧 **Debugging Features Added**
- Console logs for OTP flow tracking
- Better input handling (paste support, number-only)
- Auto-focus between OTP fields
- Clear error handling
- Auto-submit on completion

### 🎯 **Expected Flow**
1. Login → OTP → Aadhaar (optional) → Profile → Recommendations

### 🐛 **If OTP Still Doesn't Work**
1. **Check Browser Console** (F12 → Console tab)
2. **Look for error messages** in console logs
3. **Try different browsers** (Chrome, Firefox)
4. **Clear browser cache** and reload

### 🔍 **Debug Information**
The following console logs will appear:
- "Starting OTP verification with data:"
- "OTP changed:" (as you type)
- "Submitting OTP:" (when submitting)
- "OTP validation passed/failed"
- "OTP verification completed successfully"

### ⚡ **Quick Test**
1. Phone: `9876543210`
2. OTP: `123456`
3. Should proceed to Aadhaar verification step

---

**Note**: All authentication is mocked for demo purposes. In production, real OTP verification would be implemented.
