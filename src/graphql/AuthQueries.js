import { gql } from "@apollo/client";

export const authQueries = {
  SIGN_UP: gql`
  mutation signUp($user: UserInput) {
    signUp(user: $user){
      status {
        code
        success
        statusCode
      }
      message
      errors {
        type
        error
      }
      payload
    }
    
  }
  `,
  SIGN_IN : gql`
    mutation signIn($email: String!, $password: String!) {  
      signIn(email: $email, password: $password){
        status{
          code
          success
          statusCode
        }
        message
        errors{
          type
          error
        }
        payload
      }
    }
  `,
  SEND_VERIFICATION_CODE: gql`
    mutation sendEmailVerificationOTP{
      sendEmailOTPVerificationCode{
        message
        status{
          code
          success
        }
        errors{
          type
          error
        }
      }
    }
  `,
  VERIFY_EMAIL_OTP: gql`
    mutation verifyEmailOTPCode($OTP: Int!){
      verifyEmailOTPCode(OTP: $OTP){
        email
        isEmailVerified
      }
    }
  `,
  GET_CURRENT_USER: gql`
    query getCurrentUser{
      getCurrentUser{
        id
        name{
          first
          last
        }
        email
        isEmailVerified
        mfaEnabled
        mfaCompleted
        phoneNumber
        mfaDevice
        mfaFingerprint{
          enabled
          solved
        }
        mfaPhoneOTP{
          enabled
          solved
        }
        mfaEmail{
          enabled
          solved
        }
        mfaSMSOTP{
          enabled
          solved
        }
      }
    }
  `,
  SET_MFA_METHODS: gql`
    mutation setMFAMethods($mfas: [String!]!){
      setMFAMethods(mfas: $mfas){
        status{
          code
          success
        }
        message
        errors{
          type
          error
        }
        payload
      }
    }
  `,
  VERIFY_GENERATED_OTP: gql`
    mutation verifyAppOTP($OTP: Int!){
      verifyAppOTP(OTP: $OTP){
        id
        name{
          first
          last
        }
        email
        isEmailVerified
        mfaEnabled
        mfaCompleted
        phoneNumber
        mfaDevice
        mfaFingerprint{
          enabled
          solved
        }
        mfaPhoneOTP{
          enabled
          solved
        }
        mfaEmail{
          enabled
          solved
        }
        mfaSMSOTP{
          enabled
          solved
        }
      }
    }  
  `,
  GET_FILES: gql`
    query getFiles($dir: String){
      getFiles(dir: $dir){
        id
        name
        type
        format
        path
        created_at
        parent{
          id
        }
        owner{
          id
        }
      }
    }
  `,
}