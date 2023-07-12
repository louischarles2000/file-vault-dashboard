/* eslint-disable react/prop-types */
import { Button, Form, Input, QRCode } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../contexts/Auth'
import { encryptToken } from '../../../../Utils/functions'
import MainButton from '../../../elements/common/MainButton';
import { useMutation } from '@apollo/client';
import { authQueries } from '../../../../graphql/AuthQueries';

function MobileVerification(props) {
  const { auth, setAuth, setAuthError } = useContext(AuthContext);
  const [signInData, setSignInData ] = useState(null)
  const [useOtp, setUseOtp ] = useState(false)
  const [ code, setCode ] = useState('');
  const [ error, setError ] = useState(null);

  const [ verifyAppOTP, { loading } ] = useMutation(authQueries.VERIFY_GENERATED_OTP, {
    onCompleted: data => {
      if(data.verifyAppOTP){
        setAuth(data.verifyAppOTP)
        return
      }
      setCode('');
      setError('Verification failed, Regenerate and try again')
    },
    onError: err => {
      setAuthError(err);
    }
  })

  useEffect(() => {
    try {
      // console.log(auth && auth.mfaEnabled && !auth.mfaComplete)
      // const KEY = import.meta.env.VITE_AUTH_ENCRYPTION_KEY
      const _token = localStorage.getItem('token');
      const _data = _token;
      setSignInData(_data);
    } catch (error) {
      console.log(error)
    }
  }, [auth]);
  
  const onChangeCode = (e) => {
    e.preventDefault();
    setCode(e.target.value);
  }

  const handleVerifyClick = () => {
    verifyAppOTP({
      variables: {
        OTP: parseInt(code)
      }
    });
  }

  if(!props.isSetup){
    // Return what to do when its not setup
  }
  return (
    <div>
      <p className='font-bold'>Setup FileVault Authenticator</p>
      <p className=' text-[12px] font-normal'>FileVault Authenticator is an external app that you setup on your personal smartphone and use for verifying your identity.</p>
      <h6 className='font-bold py-3'>Steps for setting up FileVault Authenticator;</h6>
      <ol type='1'>
        <li>1. Download the FileVault Authenticator App.</li>
        <li>2. Sign up by scanning the QR Code below</li>
        <li>3. Setup and register your Fingerprint</li>
        <li>All done!</li>
      </ol>
      <p className=' text-[12px] font-normal pt-2'>Each time you use the App for verification, you choose either the Biometric or OTP mothod</p>

      <div className='flex flex-row justify-around my-10'>
        {/* https://chat.openai.com/ */}
        <div>
          <QRCode value='https://chat.openai.com/'/>
          <p className='font-bold'>Download link</p>
        </div>
        <div>
          {/* <QRCode value='https://chat.openai.com/'/> */}
          <QRCode value={signInData}/>
          <p className='font-bold'>Signup link</p>
        </div>
      </div>
      <p className='font-bold mb-4'>
        {`Choose an authentication method:.`}
      </p>
      <p className='text-[12px] '>You can simply choose the Fingerprint option and redirect automatically, or use the OTP generator.</p>
      {!useOtp &&
      <Button 
        loading={false}
        className='mt-6'
        onClick={() => setUseOtp(true)}
        >Use generated OTP</Button>}

      {useOtp &&
      <Form.Item
        label={"OTP"}
        className='font-light text-[18px] w-[200px] mx-auto mt-4 mb-0'
        // labelCol={false}
        name={"OTP"}
        rules={[
          {
            required: true,
            message: 'Input the OTP',
          },
        ]}
      >
        <Input
          name={'OTP'}
          value={code} 
          inputMode={'numeric'}
          onChange={e => {
            onChangeCode(e)
          }}
          className='w-[200px]'
          />
      </Form.Item>}
      {error && <p className='text-[12px] text-[red] mt-6'>{error}</p>}
      {useOtp &&
      <MainButton 
        className='mx-auto mt-10'
        loading={loading}
        disabled={code.length !== 6}
        onClick={handleVerifyClick}
        >Verify OTP</MainButton>
      }

    </div>
  )
}

export default MobileVerification