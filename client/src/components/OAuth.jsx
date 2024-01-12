import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(signInSuccess(data));
          navigate('/');
        });
    } catch (error) {
      console.log('Could not login with google', error);
    }
  };

  return (
    <button
      className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
      type='button'
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  );
};

export default OAuth;
