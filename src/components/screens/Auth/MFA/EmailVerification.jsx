/* eslint-disable react/prop-types */
import {}  from 'react'
// import { AuthContext } from '../../../../contexts/Auth'
import VerifyEmail from '../VerifyEmail';

function EmailVerification(props) {
  // const { auth } = useContext(AuthContext);

  // if(auth.mfaEmail.enabled){
  if(props.isSetup){
    return (
      <div>
        <p className='text-[green] font-light'>Email verification is already setup. When you choose this method, an email will be sent to your current registered email address.</p>
      </div>
    )
  }
  return (
    <div>
    <VerifyEmail />
    </div>
  )
}

export default EmailVerification