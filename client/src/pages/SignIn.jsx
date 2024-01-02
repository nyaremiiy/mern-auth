import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);
    await fetch('/api/auth/singin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success === false) {
          setError(true);
          return;
        }
        navigate('/');
      });

    setLoading(false);
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sing In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          className='bg-slate-100 p-3 rounded-lg'
          type='email'
          placeholder='Email'
          id='email'
          onChange={handleChange}
        />
        <input
          className='bg-slate-100 p-3 rounded-lg'
          type='password'
          placeholder='Password'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sing in'}
        </button>
      </form>
      <div className='flex gap-2 mt-5 '>
        <p>{`Don't Have an acount?`}</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  );
};

export default SignIn;
