/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import { AuthContext } from '../../../../contexts/Auth';
import { Button, Form, Input } from 'antd';
import { _phone_number_validator } from '../../../../Utils/Regex';
import MainButton from '../../../elements/common/MainButton';

function SMSVerification(props) {
  const { auth } = useContext(AuthContext);
  const [ number, setNumber ] = useState('');
  const [ code, setCode ] = useState('');
  const [ editing, setEditing ] = useState(false);
  const [ sent, setSent ] = useState(false);

  const handleEditClick = () => {
    if(!editing){
      setEditing(true);
      return;
    }
  }
  const handleVerifyClick = () => {
    setSent(!sent)
  }
  const onChangeNumber = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
  }
  const onChangeCode = (e) => {
    e.preventDefault();
    setCode(e.target.value);
  }

  // if(auth.mfaSMSOTP.enabled){
  //   return (
  //     <div>
  //     {/* THE VERIFICATION UI */}
  //     </div>
  //   )
  // }

  return (
    <div>
      {props.isSetup ?
        <p className='text-[green] font-light'>SMS verification is already setup. When you choose this method, an SMS will be sent to your current registered phone number.</p>
        :
        <p className='my-3'>{
          sent ? 
          'Enter the OTP we sent to your phone and verify to complete login.' :
          'An OTP will be sent to your saved phone number'
        }
        </p>
      }
      <p className='font-black underline'>{props.isSetup ? 
        auth.phoneNumber :
        `${auth.phoneNumber.substring(0, 4)}*******${auth.phoneNumber.substring(auth.phoneNumber.length - 2, auth.phoneNumber.length)}`
        }
      </p>
      {editing || sent && 
      <Form.Item
        label={editing ? "Phone Number" : "OTP"}
        className='font-light text-[18px] w-[200px] mx-auto mt-4 mb-0'
        // labelCol={false}
        name={editing ? "phoneNumber" : "OTP"}
        rules={[
          {
            required: true,
            message: editing ? 'Please input your phone number!' : 'Input the OTP',
          },
          // {
          //   pattern: _phone_number_validator,
          //   message: 'phone number format is invalid'
          // }
        ]}
      >
        <Input
          name={editing ? 'phoneNumber' : 'OTP'}
          value={editing ? number : code} 
          inputMode={editing ? 'tel' : 'numeric'}
          onChange={e => {
            if(editing){
              onChangeNumber(e)
              return;
            }
            onChangeCode(e)
          }}
          className='w-[200px]'
          />
      </Form.Item>}

      {props.isSetup &&
      <Button 
        className='my-3'
        type='link'
        disabled={editing && !_phone_number_validator.test(number)}
        onClick={handleEditClick}
        >{editing ? 'Save new Number' : 'Edit number'}</Button>}
      
      {editing && 
      <Button 
        type='text'
        className='ml-3'
        onClick={() => {
          setEditing(false)
          setNumber('')
        }}
        >Cancel</Button>}

        {!props.isSetup &&
        <MainButton 
          onClick={handleVerifyClick}
          className='my-3 mx-auto'
          disabled={sent && code.length < 6}
          >{sent ? 'Verify' : 'Send SMS'}
          </MainButton>}
      
    </div>
  )
}

export default SMSVerification