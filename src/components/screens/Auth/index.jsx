import { useContext } from 'react'
import maintenanceImg from '../../../assets/security.png'
// import mfaImg from '../../../assets/vault.png'
import Signin from './Signin'
import Signup from './Signup'
import VerifyEmail from './VerifyEmail'
import LinkButton from '../../elements/common/LinkButton'
// import SuccessfulAuth from './SuccessfulAuth'
import VerificationMethods from './VerificationMethods'
import { Alert } from 'antd'
import { AuthContext } from '../../../contexts/Auth'
import Loading from '../../elements/common/Loading'

function AuthScreen() {
  const { authAlert, authStage, setAuthStage, auth, loading } = useContext(AuthContext)
  // const [authStage, setAuthStage] = useState('signin')
  
  const AuthForm = () => {
    switch(authStage){
      case 'signin':
        return <Signin switchSignInUp={switchSignInUp}/>
      case 'signup':
        return <Signup switchSignInUp={switchSignInUp}/>
      case 'email_verification':
        return <VerifyEmail/>
      default:
        return <Signin />
    }
  }

  const switchSignInUp = () => {
    if(authStage === 'signin'){
      setAuthStage('signup');
      return;
    }
    setAuthStage('signin');
  }

  // return <SuccessfulAuth />

  if(loading){
    return (
      <div className='w-full h-full justify-center items-center content-center flex pt-[200px]'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='w-full h-[100vh]  text-center py-0 bg-[#000300] flex flex-row'>
      <div 
        className='flex justify-start flex-col content-center items-center mx-auto w-[50%]' 
        style={{ 
          width: auth && auth.isEmailVerified ? '70%' : '50%',
        }}
        >
        <h1 className='text-[#80df9a] bg-[#000300]  text-[40px] font-bold my-4'>FileVault.</h1>
        <div 
          className='bg-[#fff] w-full h-auto rounded-md mb-4 ml-4 p-4 pb-20'
          style={{
            paddingRight: (auth && auth.isEmailVerified) && 70,
            paddingLeft: (auth && auth.isEmailVerified) && 70,
          }}
          >
          <div className='mt-8'>
            {authStage !== 'extra' && 
            <h2 className="font-bold text-[#555] text-lg">
            Authenticate to continue.
            </h2>
            }
            {authAlert && <Alert type={authAlert.type} description={authAlert.description} closable showIcon/>}
            {/* <VerificationMethods /> */}
            {!auth && <AuthForm /> }
            {auth && (auth.isEmailVerified ? <VerificationMethods /> : <AuthForm />)}
            {!auth && (authStage !== 'email_verification' && authStage !== 'extra') && 
              <p className='text-[#555] font-light text-[12px] mb-4 mt-[-2rem]'>
                {authStage === 'signin' ? 'Have no account?' : 'Already have an account?'}
              </p>
            }
            {!auth && (authStage !== 'extra' && authStage !== 'email_verification') && <LinkButton onClick={switchSignInUp} title={authStage === 'signin' ? 'Create new account' : 'Sign In'}/>}
          </div>
        </div>
      </div>
      <div className='flex justify-center h-full w-[50%]' style={{ width: auth && auth.isEmailVerified ? '0%' : '50%' }}>
        <div className='w-full h-[80%] pt-20 flex justify-center content-center items-center'>
          {(auth && auth.isEmailVerified) ? null
          // <img 
          //   src={mfaImg}
          //   className="w-[300px] h-[300px] my-6" alt="React logo" 
          //   // style={{ height: auth && auth.mfaEnabled ? '70%' : '100%' }}
          //   /> 
          :
          <img 
            src={maintenanceImg}
            className="w-full h-[full] my-6" alt="React logo" 
            // style={{ height: auth && auth.mfaEnabled ? '70%' : '100%' }}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default AuthScreen
