# Technology

Short answer: Replace Twilio/Clerk with Aadhaar eKYC via DigiLocker flow, auto-fill demographics from eKYC, then collect remaining profile, education, bank (Aadhaar‑seeded), skills, and communication preferences. Below is a production flow and data model aligned with PMIS manuals and Aadhaar rules.[1][2]

## Auth and eKYC flow

- Start with mobile OTP login; the PMIS manuals require mobile OTP before launching eKYC, so prototype can use Clerk for OTP while keeping an abstraction for SMS provider.[2][3]

- Trigger Aadhaar eKYC through DigiLocker consent: user signs in to DigiLocker, checks Aadhaar consent, and verifies email OTP, after which Name, Gender, and DOB are auto-fetched; do not ask user to type these fields.[4][1]

- Enforce eligibility gate immediately after eKYC (age band check) and proceed to profile creation only if eligible, mirroring PMIS behavior.[5][1]

## Data capture after eKYC

- Personal details: Father/Mother/Guardian name, category (SC/ST/OBC/General), and permanent address including state, district, pin; keep House/Line1/Line2 plus optional Block/Village fields.[6][1]

- Contact/communication: verify email via OTP, capture WhatsApp/SMS preference, and prevent edits without re‑verification to match PMIS OTP prompts.[1][6]

- Education uploads and skills: collect education entries with document uploads, Aadhaar‑seeded bank details, skills and languages, then finalize profile with an explicit “Complete profile” step.[6][4]

## Compliance notes
- For Aadhaar, prefer DigiLocker fetch or Offline KYC (QR/XML) for private apps; direct Aadhaar OTP auth requires being an authorized AU A/ KUA or using a regulated gateway, as OTP KYC is restricted for unregulated entities.[7][8]
- UIDAI mandates explicit consent logging and no storage of Aadhaar artifacts beyond standards; store consent tokens and audit trails, not raw Aadhaar numbers or images.[8][9]

## Suggested screens and fields
- Login: mobile + OTP, CAPTCHA, and throttling; post-login force password setup if using portal-like pattern.[10][2]
- eKYC: DigiLocker SSO, consent checkbox, email OTP, success page, then eligibility result; block edits to Name/Gender/DOB except via Aadhaar change flow.[4][1]
- Profile: personal, contact, education, bank (Aadhaar-seeded), skills/languages; allow edit/preview and mark profile “complete.”[6][4]

## Minimal API contracts
- POST /auth/otp/send, /auth/otp/verify for mobile; GET /auth/session for SSR.[3][2]
- POST /ekyc/digilocker/start returns redirectUrl; POST /ekyc/digilocker/callback captures demographics and consent receipt.[8][1]
- PUT /profile with personal/contact/education/bank/skills; POST /email/verify and /email/verify/confirm for OTP.[4][6]

## Data model snippets
- Demographics are read‑only from eKYC; audit consent with purpose, time, and source.[9][8]

```ts
type Demographics = {
  name: string; gender: 'M'|'F'|'T'; dob: string; // ISO date
  source: 'digilocker'|'aadhaar_xml';
  consent: { id: string; purpose: 'onboarding'; at: string };
};

type Address = {
  line1: string; line2?: string; house?: string; state: string; district: string;
  block?: string; village?: string; pincode: string;
};

type Profile = {
  userId: string;
  demographics: Demographics;              // read-only after eKYC
  fatherMotherGuardian: string;            // manual entry
  category: 'SC'|'ST'|'OBC'|'General';
  contact: {
    mobile: { number: string; verified: boolean };
    email: { id: string; verified: boolean };
    notifyPref: 'SMS'|'WhatsApp';
  };
  address: Address;
  education: Array<{
    level: '10th'|'12th'|'Diploma'|'Graduation'|'PostGraduation'|'ITI';
    boardOrUniversity: string; 
    institute: string; 
    course?: string; 
    specialization?: string;
    yearOfPassing: number; 
    marksPercent?: number; 
    documentUrl?: string;
  }>;
  bank: { ifsc: string; accountLast4: string; aadhaarSeeded: boolean };
  skills: string[]; languages: string[];
  eligibility: { ageOk: boolean; checkedAt: string };
  status: 'incomplete'|'complete';
};
```


## Frontend stack mapping
- Next.js + TypeScript for web and Expo/React Native for mobile; share Zod types and API SDK to keep validation consistent cross‑platform.[10][6]
- Use a single auth context to orchestrate OTP, DigiLocker redirect, and email OTP, then gate routes on profile.status === 'complete' before allowing internship applications.[1][4]

If a full Next.js + React Native starter with OTP mocks, DigiLocker sandbox hooks, and Zod schemas is needed, say “next.”[8][1]

[1](https://www.gpwestchamparan.org.in/wp-content/uploads/2024/12/User_Manual_Candidate_Profile_ENG.pdf)
[2](https://igwcollege.in/wp-content/uploads/2025/02/PM-Internship-Registration-.pdf)
[3](https://www.pminternship.mca.gov.in/login/)
[4](https://www.scribd.com/document/834181738/user-manual)
[5](https://www.myscheme.gov.in/schemes/pmis)
[6](https://www.govtschemes.in/pm-internship-scheme)
[7](https://www.kychub.com/blog/aadhaar-otp-verification-rules/)
[8](https://uidai.gov.in/images/The_Aadhaar_Authentication_and_Offline_Verifications_Regulations_2021.pdf)
[9](https://uidai.gov.in/en/ecosystem/authentication-ecosystem.html)
[10](http://gcsector9.ac.in/images/35/MultipleFiles/File31183.pdf)
[11](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/images/81615547/a8a45b70-5c0e-4884-9432-7774c8ee7fa4/pms4.jpg)
[12](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/images/81615547/c4c321ae-8288-4b71-a8f8-368c9b1ad121/pms3.jpg)
[13](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/images/81615547/471ff2e4-6147-4324-8f08-5a38f1c94b11/pms2.jpg)
[14](https://www.caclubindia.com/articles/the-aadhaar-otp-mandate-a-stepbystep-guide-for-tax-professionals-53759.asp)
[15](https://www.studocu.com/in/document/kallam-haranadhareddy-institute-of-technology/computer-science-engineering/pm-internship-scheme-user-manual-english/108000600)
[16](https://www.gpwestchamparan.org.in/wp-content/uploads/2024/12/User_Manual_Candidate_Application_ENG.pdf)
[17](https://deepvue.ai/blog/understanding-aadhaar-verification-compliance-and-regulations/)
[18](https://proteantech.in/articles/aadhaar-authentication-05-05-2025/)
[19](https://www.linkedin.com/pulse/new-pan-registration-rule-aadhaar-otp-verification-yjs8c)
[20](https://deepvue.ai/blog/aadhaar-otp-authentication-in-e-governance/)
[21](https://dit.py.gov.in/sites/default/files/Aadhaar-enabled-service-delivery.pdf)