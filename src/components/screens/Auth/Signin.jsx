/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useContext, useEffect, useState } from 'react'
import { Form, Input } from 'antd';
import MainButton from '../../elements/common/MainButton';
import { AuthContext } from '../../../contexts/Auth';
import { _email_validator, _password_validator } from '../../../Utils/Regex';
import { useMutation } from '@apollo/client';
import { authQueries } from '../../../graphql/AuthQueries';
import { encryptToken } from '../../../Utils/functions';

// const regex = /^(?=.*\d)(?=.*[#$%])[a-zA-Z0-9#$%]{8,}$/;

const Signin = () => {
  const { setAuthAlert, setAuth, setUser, setAuthStage, setAuthError } = useContext(AuthContext)
  const [ isInvalid, setIsInvalid ] = useState(false);
  const [ form, setForm ] = useState({
    email: '',
    password: ''
  });

  const [ signIn, { loading } ] = useMutation(authQueries.SIGN_IN, {
    onCompleted: (data, ops) => {
      console.log(data)
      if(data.signIn.errors){
        setAuthAlert({
          type: 'error',
          description: data.signIn.errors.error,
          title: data.signIn.errors.type
        });
        return;
      }
      if(data.signIn.status.success){
        setAuthAlert({
          type: 'success',
          // description: data.signUp.errors.error,
          description: data.signIn.message
        });
        setUser(data.signIn.payload.user)
        setAuth(data.signIn.payload.user)
        const token = data.signIn.payload.token;
        const encryptedToken = encryptToken(token, import.meta.env.VITE_TOKEN_ENCRYPTION_KEY);
        localStorage.setItem("token", encryptedToken)
        // if(!data.signIn.payload.user.isEmailVerified) setAuthStage('email_verification');
      }
    },
    onError: (err, ops) => {
      console.log({...err})
      setAuthError(err);
    }
  })

  useEffect(() => {
    setIsInvalid(
      form.email === '' || !_password_validator.test(form.password) || !_email_validator.test(form.email)
      // form.email === '' || !_email_validator.test(form.email) ||
      // form.password === '' || !_password_validator.test(form.password)
    )
  }, [form]);

  const submitHandler = () => {
    if(isInvalid) return;
    setAuthAlert(null);
    signIn({
      variables: {
        ...form
      }
    })
  }

  const handleChange = (e) => {
    // HUGE BUG ==>> SOLUTION: REDO THE WHOLE THING ( SIGN IN AND SIGNUP FORMS)
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // console.log(value)
  }
  
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='mx-auto py-8'>
      <h3 className="font-light text-[#555] text-sm p-3">Enter your credentials to access your account</h3>
      <Form
        name="signin"
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
        onSubmit={e => {
          e.preventDefault();
          // console.log('name', name);
          // console.log('surName', surName);
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          className='font-light text-[18px] flex-col'
          // labelCol={false}
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
            {
              pattern: _email_validator,
              message: 'Email address format is invalid'
            }
          ]}
        >
          <Input name='email' type='email' value={form.email} onChange={handleChange}/>
        </Form.Item>
  
        <Form.Item
          label="Password"
          className='font-light text-[18px] flex-col'
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              pattern: _password_validator,
              message: 'Your password must be a minimum of 8 characters long and include a mix of uppercase and lowercase letters, at least one numeric digit (0-9), and at least one special character (e.g., !@#$%^&*). Please ensure that your password meets these criteria to protect your account effectively.',              
            }
          ]}
        >
          <Input.Password name='password' value={form.password} onChange={handleChange}/>
        </Form.Item>
        
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <MainButton 
            // disabled={form.email === '' || !_password_validator.test(form.password) || !_email_validator.test(form.email)}
            disabled={isInvalid}
            onClick={submitHandler}
            loading={loading}
            >Sign in</MainButton>
        </Form.Item>
  
      </Form>
    </div>
  );
}
export default Signin