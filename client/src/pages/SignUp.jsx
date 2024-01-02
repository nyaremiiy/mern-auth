import { useState } from 'react';
import { Link } from 'react-router-dom';

const SingUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);
    await fetch('/api/auth/singup', {
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
      });

    setLoading(false);
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sing Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          className='bg-slate-100 p-3 rounded-lg'
          type='text'
          placeholder='Username'
          id='username'
          onChange={handleChange}
        />
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
          {loading ? 'Loading...' : 'Sing up'}
        </button>
      </form>
      <div className='flex gap-2 mt-5 '>
        <p>Have an acount?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  );
};

export default SingUp;
