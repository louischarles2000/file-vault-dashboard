import email from '../assets/email.png'
import sms from '../assets/sms.png'
import authApp from '../assets/vault.png'
// import authApp from '../assets/auth_app.png'

export const mfaMethods = [
  {
    name: 'email',
    label: 'Email Verification',
    details: `We'll send a verification code every time you sign in to further prove that you are the authentic account owner.`,
    image: email
  },
  {
    name: 'sms',
    label: 'SMS Verification',
    details: `We'll send a verification code in an SMS every time you sign in to further prove that you are the authentic account owner.`,
    image: sms
  },
  {
    name: 'auth_app',
    label: 'FileVault Authenticator',
    details: `Use the FileVault Authenticator mobile app. You'll choose whether to generate an OTP or use Biometrics.`,
    image: authApp
  },
]