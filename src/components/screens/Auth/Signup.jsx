/* eslint-disable react/prop-types */
import { Alert, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import MainButton from '../../elements/common/MainButton'
import { _email_validator, _password_validator, _phone_number_validator } from '../../../Utils/Regex';
import { useMutation } from '@apollo/client';
import { authQueries } from '../../../graphql/AuthQueries';

function Signup(props) {
  const [ form, setForm ] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phoneNumber: '',
    password: '',
    confirm_password: '',
  });

  const [ isInvalid, setIsInvalid ] = useState(false);
  const [ alert, setAlert ] = useState(null);

  const [ signUp, { loading } ] = useMutation(authQueries.SIGN_UP, {
    onCompleted: (data) => {
      console.log(data)
      if(data.signUp.errors){
        setAlert({
          type: 'error',
          description: data.signUp.errors.error,
          title: data.signUp.errors.type
        });
        return;
      }
      if(data.signUp.status.success){
        setAlert({
          type: 'success',
          // description: data.signUp.errors.error,
          description: data.signUp.message
        });
        props.switchSignInUp();
      }
    },
    onError: (err) => {
      console.log(err)
    }
  });

  useEffect(() => {
    setIsInvalid(
      form.first_name === '' || form.last_name === '' ||
      form.email === '' || !_email_validator.test(form.email) ||
      form.phoneNumber === '' || !_phone_number_validator.test(form.phoneNumber) ||
      form.password === '' || !_password_validator.test(form.password) || 
      form.confirm_password !== form.password
    )
  }, [form]);

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
  
  const handleSubmit = () => {
    if(isInvalid) return;
    setAlert(null);
    const user = {
      email: form.email,
      phoneNumber: form.phoneNumber,
      password: form.password,
      confirm_password: form.confirm_password,
      name: {
        first: form.first_name,
        last: form.last_name
      }
    };
    signUp({
      variables: {
        user
      }
    });
  }

  return (
    <div className='mx-auto py-8'>
      <h3 className="font-light text-[#555] text-sm p-3">Create your new account</h3>
      {alert && <Alert type={alert.type} description={alert.description} closable showIcon/>}
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
          required
          label="Full name"
          className='font-light text-[18px] flex-col'
        >
          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                message: 'Please input your First Name'
              }
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0',
            }}
            >
            <Input name='first_name' placeholder='First Name' value={form.first_name} onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                message: 'Please input your Last Name'
              }
            ]}          
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Input name='last_name' placeholder='Last Name' value={form.last_name} onChange={handleChange}/>
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="email"
          className='font-light text-[18px] flex-col'
          // labelCol={false}
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email address!',
            },
            {
              pattern: _email_validator,
              message: 'Email address format is invalid'
            }
          ]}
        >
          <Input name='email' value={form.email} onChange={handleChange}/>
        </Form.Item>

        <Form.Item
          label="Phone"
          className='font-light text-[18px] flex-col'
          // labelCol={false}
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
            {
              pattern: _phone_number_validator,
              message: 'phone number format is invalid'
            }
          ]}
        >
          <Input name='phoneNumber' value={form.phoneNumber} onChange={handleChange}/>
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
          label="Confirm Password"
          className='font-light text-[18px] flex-col'
          name="confirm_password"
          rules={[
            {
              required: true,
              message: 'Please re-enter your password!',
            },
            {
              pattern: form.password,
              message: 'Passwords not matching!'
            }
          ]}
        >
          <Input.Password name='confirm_password' value={form.confirm_password} onChange={handleChange}/>
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
            disabled={isInvalid} 
            loading={loading}
            onClick={handleSubmit}
            >Create Account
          </MainButton>
        </Form.Item>
  
      </Form>
    </div>
  )
}

export default Signup