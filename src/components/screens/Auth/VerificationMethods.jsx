import { useContext, useState } from 'react'
import vaultImg from '../../../assets/mfa.png'
import CardContentListItem from '../../elements/common/CardContentListItem'
// import { mfaMethods } from '../../../Utils/data'
import { AiOutlineArrowRight } from 'react-icons/ai'
import MainButton from '../../elements/common/MainButton'
import MFA from './MFA'
import { AuthContext } from '../../../contexts/Auth'
// email, sms, FileVault authenticator

const VerificationMethods = () => {
  const { auth, selectedMFAMehtod, setSelectedMFAMethod, activeMFAs } = useContext(AuthContext);
  const [ selectedMethods, setSelectedMethods ] = useState([])
  const [ mfaSetup, setMfaSetup ] = useState(false);

  // useEffect(() => {
  //   console.log(selectedMFAMehtod)
  // }, [selectedMethods, selectedMFAMehtod])

  const onSelectMethod = (method) => {
    // console.log('Clicked')
    if(auth.mfaEnabled){
      const _methods = [method.name];
      setSelectedMethods(_methods);
      return
    }
    const _methods = [...selectedMethods];
    const index = _methods.findIndex(md => md === method.name);
    if(index > -1){
      _methods.splice(index, 1);
      setSelectedMethods(_methods);
      // console.log('_methods 1');
      return;
    }
    _methods.push(method.name);
    // console.log('_methods');
    setSelectedMethods([
      ...selectedMethods,
      method.name
    ]);
  }

  const handleContinue = () => {
    if(auth.mfaEnabled){
      setSelectedMFAMethod(selectedMethods[0]);
      setSelectedMethods([]);
      return;
    }
    setMfaSetup(true);
  }
  // IF THERE ARE INCOMPLETE MFAs
  if(selectedMFAMehtod || mfaSetup){
    return <MFA setupMfas={selectedMethods}/>
  }
  return (
    <div>
      <img src={vaultImg} alt='Secure' className='h-[6rem] w-[6rem] mx-auto mb-4'/>
      <h2>Next Step: MFA</h2>
      <p className='text-[12px] font-light pt-1'>
        {
        !auth.mfaEnabled ?
        `Enhancing the authentication experience with multiple methods of multi-factor authentication (MFA) can further strengthen the security of your FileVault account.`
        :
        `MFA is enabled, Pick one of the enabled MFA methods below to continue with authentication.`
        }
      </p>
      <div className='p-2'>
        {activeMFAs.map(mfa => (
        <CardContentListItem 
          {...mfa} 
          key={mfa.name} 
          onClick={onSelectMethod.bind(this, mfa)}
          selected={selectedMethods.includes(mfa.name)}
          />
        ))}
      </div>
      <MainButton
        disabled={selectedMethods.length < 1}
        onClick={handleContinue}
        >
        Continue
        <AiOutlineArrowRight />
      </MainButton>
      {/* <p className='text-[12px]'>Select at least one.</p> */}
    </div>
  )
}

export default VerificationMethods