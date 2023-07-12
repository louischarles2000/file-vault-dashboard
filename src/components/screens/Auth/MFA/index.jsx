/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Alert, Collapse } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../../../../contexts/Auth';
import EmailVerification from './EmailVerification';
import SMSVerification from './SMSVerification';
import MobileVerification from './MobileVerification';
import LinkButton from '../../../elements/common/LinkButton';
// import { mfaMethods } from '../../../../Utils/data';
import { _reload } from '../../../../Utils/functions';
import MainButton from '../../../elements/common/MainButton';

const MFA = (props) => {
  const { activeMFAs, selectedMFAMehtod, setSelectedMFAMethod, auth } = useContext(AuthContext)
  const [ items, setItems ] = useState([]);
  const [ mfa, setMfa ] = useState(null);
  // const [ step, setStep ] = useState(1);

  const MfaItems = useMemo(() => [
    {
      name: 'email',
      label: 'Email Verification',
      children: <EmailVerification isSetup/>,
      extra: <CheckCircleFilled className='text-[green] text-[20px]'/>,
    },
    {
      name: 'sms',
      label: 'SMS Verification',
      children: <SMSVerification isSetup/>,
      extra: <CheckCircleFilled className='text-[green] text-[20px]'/>,
    },
    {
      name: 'auth_app',
      label: 'FileVault Authenticator',
      children: <MobileVerification isSetup/>,
      extra: auth.mfaFingerprint.enabled || auth.mfaPhoneOTP.enabled ? <CheckCircleFilled className='text-[green] text-[20px]'/> : <CloseCircleFilled className='text-[red] text-[20px]'/>,
    }
  ], [auth.mfaFingerprint.enabled, auth.mfaPhoneOTP.enabled]);

  useEffect(() => {
    console.log(selectedMFAMehtod)
    setMfa(selectedMFAMehtod);
    if(!props.setupMfas && props.setupMfas.length < 1) return;
    const _setup = [];
    MfaItems.forEach(_m => {
      if(props.setupMfas.includes(_m.name)){
        _setup.push(_m);
      }
    })
    setItems(_setup);
  }, [selectedMFAMehtod, activeMFAs, props.setupMfas, MfaItems])

  const onChange = () => {

  }

  const handleCancel = () => {
    if(props.setupMfas){
      _reload();
    }
    setSelectedMFAMethod(null)
  }
  const Verification = () => {
    if(props.setupMfas && props.setupMfas.length > 0){
      return (
        <div className='p-4'>
          <Alert 
            showIcon 
            type='warning' 
            // message='Do not refresh this page.' 
            message='DO NOT REFRESH THIS PAGE.' 
            // description='All unsaved changes WILL be lost.'
            className='mb-3'/>
          <p className='pb-3'>Setup the selected MFA methods.</p>
          <Collapse
            items={items}
            defaultActiveKey={['1']}
            onChange={onChange}
            />
            <MainButton 
              className='mt-10 mx-auto'
              disabled
              >Continue to dashboard</MainButton>
        </div>
      );
    }
    switch(mfa){
      case "email":
        return <EmailVerification />;
      case "sms":
        return <SMSVerification />;
      case "auth_app":
        return <MobileVerification />;
      default:
        return <EmailVerification />;
    }
  }

  return (
    <div>
      <Verification />
      <LinkButton
        onClick={handleCancel}
        className='text-[14px] mt-4'
        title="Change methods"
        />
    </div>
  );
}
export default MFA;