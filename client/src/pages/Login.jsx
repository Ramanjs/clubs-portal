import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiBaseUrl } from '../utils/baseUrl';

const Login = () => {
  const loggedIn = useSelector(state => state.user.loggedIn);

  if (loggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-slate-100 bg-gradient-to-r from-cyan-500 to-indigo-500">
      <div className="flex flex-col items-center w-1/3 h-1/3 bg-white p-5 rounded-xl border-gray-200 shadow-lg">
        <h1 className="font-semibold text-4xl mt-40 mb-10">ClubConnect IIIT-Delhi</h1>
        <div className='border-2 rounded-lg p-3 flex mb-32'>
          <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" alt="google-login-logo" className='w-5 h-5 mr-3'/>
          <a href={`${apiBaseUrl}/auth/google`}>Sign in with Google</a>
        </div>
        <p className='text-gray-500 italic'>A project by Indraprastha Institute of Information Technology, Delhi</p>
      </div>
    </div>
  )
}

export default Login
