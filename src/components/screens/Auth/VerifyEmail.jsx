/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import { Form, InputNumber } from 'antd';
import MainButton from '../../elements/common/MainButton';
import { AuthContext } from '../../../contexts/Auth';
import { useMutation } from '@apollo/client';
import { authQueries } from '../../../graphql/AuthQueries';
import { _reload } from '../../../Utils/functions';
import Loading from '../../elements/common/Loading';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const VerifyEmail = () => {
  const { user, setAuthAlert, setAuthError, setAuth, auth } = useContext(AuthContext)
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)

  const [ verifyEmailOTPCode, { loading: verifying } ] = useMutation(
    authQueries.VERIFY_EMAIL_OTP, 
    {
      onCompleted: data => {
        if(data.verifyEmailOTPCode){
          setAuth({
            ...auth,
            ...data.verifyEmailOTPCode
          });
          _reload();
          return;
        } else {
          setAuthAlert({
            type: 'error',
            description: "Verification failed, Resend code and try again!",
            title: 'Verification failed'
          });
          setSent(false);
          return;
        }
      },
      onError: err => {
        console.log(err)
        setAuthAlert({
          type: 'error',
          description: "Verification failed, reload and try again!",
          title: 'Verification failed'
        });
        setAuthError(err);
        setSent(false);
      }
    }
  )

  const [ sendEmailVerificationOTP, { loading } ] = useMutation(
    authQueries.SEND_VERIFICATION_CODE,
    {
      onCompleted: (data) => {
        const res = data.sendEmailVerificationOTP;
        if(res){
          console.log(res)
          return;
        }
        setSent(true);
      },
      onError: err => {
        console.log(err)
        setAuthError(err);
        // if(err.networkError && err.networkError.statusCode === 401){
        //   console.log('Session Expired!')
        //   localStorage.removeItem('token')
        //   setAuthStage('signin');
        //   setAuthAlert({
        //     type: 'error',
        //     description: "Session expired, Please login again.",
        //     title: 'Session Expired!'
        //   });
        // }
      }
    }
  )

  const sendVerification = () => {
    sendEmailVerificationOTP();
  }

  const onChangeCode = (e) => setCode(e);

  const handleVeryCode = () => {
    verifyEmailOTPCode({
      variables: {
        OTP: code
      }
    })
  }

  if(loading || verifying){
    return <Loading />
  }
  if(!sent){
    return (
      <div className='mx-auto py-8 flex flex-col justify-center'>
        <h3 className="font-light text-[#000] text-sm p-3">
          {auth.isEmailVerified ? 'Verify authentication via email' : 'Your account is not verified'}
        </h3>
        <h3 className="font-light text-[#555] text-[12px] p-0">Click continue below to recieve a verification code on your Email. Then verify in order to continue.</h3>
        <div className='items-center content-center'>
          <MainButton 
            className='my-4 mx-auto'
            onClick={sendVerification}
            >Continue</MainButton>
        </div>
      
      </div>
    )
  }
  return (
  <div className='mx-auto py-8'>
    <h3 className="font-light text-[#000] text-sm p-3">
      {auth.isEmailVerified ? 'Confirm your identity' : 'Confirm Your Email Address'}
    </h3>
    <h3 className="font-light text-[#555] text-[12px] p-0">We have sent a verification code to <span className='font-bold'>{user ? user.email : null}</span>.<br/> Check your email and insert the code below.</h3>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      className='w-[80%] my-8'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Verification code"
        className='font-light text-[18px] flex-col'
        name="verification_code"
        rules={[
          {
            required: true,
            message: 'Please input the verification code!',
          },
        ]}
      >
        <InputNumber 
          controls={false} 
          width={'100%'} 
          inputMode='numeric' 
          onChange={onChangeCode}
          type='number'
          maxLength={6}
          />
        {/* <Input inputMode='numeric' type='numeric'/> */}
      </Form.Item>
      
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {/* <Button type="primary" htmlType="submit">
          Submit
        </Button> */}
        <MainButton  
          disabled={code.toString().length !== 6}
          className='my-4 mx-auto'
          onClick={handleVeryCode}
          >
            {auth.isEmailVerified ? 'Verify' : 'Confirm Email'}
          </MainButton>
      </Form.Item>

    </Form>
  </div>
);
}
export default VerifyEmail