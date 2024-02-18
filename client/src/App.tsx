import { SubmitHandler, useForm } from 'react-hook-form'
import './App.css'
import { useState } from 'react';

type InputsType = {
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  rePassword: string,
}

function App() {

  const [activePage, setactivePage] = useState('signUp')
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<InputsType>();

  const onSubmit:SubmitHandler<InputsType> = async(data) => {
    console.log(data)
    const user = {
      name: data.firstName.trim() + ' ' + data.lastName.trim(),
      email: data.email.trim(),
      username: data.username.trim(),
      password: data.password
    }
    try {
      const res = await fetch ('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const resData = await res.json();
      alert(resData.message);
      if(res.status===201) {
        reset();
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const onLogin:SubmitHandler<InputsType> = async(data) => {
    console.log(data)
    const user = {
      username: data.username.trim(),
      password: data.password
    }
    try {
      const res = await fetch ('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const resData = await res.json();
      alert(resData.message);
      if(res.status===200) {
        reset();
        setactivePage('success')
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <div className='container'>
      <div className='box'>
        <div className="backgroundFrame"></div>
        <div className="overFrame">
          <h1>Altitude Air</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo molestiae ratione neque eveniet vel? Vitae ratione, molestias a, soluta nulla exercitationem placeat aut laudantium corporis tempore excepturi incidunt nisi possimus.</p>
        </div>
      </div>
      <div className='box'>
        <div className="formBox">
          {
            activePage==='signUp'
            ? <a className='signInBtn' onClick={() => {reset(); setactivePage('signIn')}}>Sign in</a>
            : activePage==='signIn'
            ? <a className='signInBtn' onClick={() => {reset(); setactivePage('signUp')}}>Sign Up</a>
            : <a className='signInBtn' onClick={() => setactivePage('signIn')}>Logout</a>
          }
          <div className="form">
            <h2>Explore & Experience</h2>
            <p>Get onto your most comfortable journey yet. All the way up.</p>
            {
              activePage==='signUp'
              ?
              <form className="grid" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input type="text" placeholder='First Name'
                  {...register('firstName', { required: true, pattern: /^[A-Za-z]+$/i })} />
                  {errors.firstName?.type === "required" && (
                    <p className='alert' role="alert">First name is required</p>
                  )}
                </div>
                <div>
                  <input type="text" placeholder='Last Name'
                  {...register('lastName', { required: true, pattern: /^[A-Za-z]+$/i })} />
                  {errors.lastName?.type === "required" && (
                    <p className='alert' role="alert">Last name is required</p>
                  )}
                </div>
                <div className='full'>
                  <input type="text" placeholder='Email'
                  {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/i })} />
                  {errors.email?.type === "required" && (
                    <p className='alert' role="alert">Email is required</p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p className='alert' role="alert">Enter valid email</p>
                  )}
                </div>
                <div className='full'>
                  <input type="text" placeholder='Username'
                  {...register('username', { required: true })} />
                  {errors.username?.type === "required" && (
                    <p className='alert' role="alert">Username is required</p>
                  )}
                </div>
                <div className='full'>
                  <input type="password" placeholder='Password'
                  {...register('password', { required: true })} />
                  {errors.password?.type === "required" && (
                    <p className='alert' role="alert">Password is required</p>
                  )}
                  {watch('password')?.length>0 && watch('password')?.length<7 && (
                    <p className='alert' role="alert">Minimum 8 characters</p>
                  )}
                </div>
                <div className='full'>
                  <input type="password" placeholder='Confirm Password'
                  {...register('rePassword', { required: true, validate: (value) => value===watch('password')})} />
                  {errors.rePassword?.type === "required" && (
                    <p className='alert' role="alert">Confirm password is required</p>
                  )}
                  {watch('password')!==watch('rePassword') && watch('rePassword')?.length>0 && (
                    <p className='alert' role="alert">Password not matched</p>
                  )}
                </div>
                <button type='submit' className='full'>Get Started</button>
              </form>
              :
              activePage==='signIn'
              ?
              <form className='grid' onSubmit={handleSubmit(onLogin)}>
                <div className='full'>
                  <input type="text" placeholder='Username'
                  {...register('username', { required: true })} />
                  {errors.username?.type === "required" && (
                    <p className='alert' role="alert">Username is required</p>
                  )}
                </div>
                <div className='full'>
                  <input type="password" placeholder='Password'
                  {...register('password', { required: true })} />
                  {errors.password?.type === "required" && (
                    <p className='alert' role="alert">Password is required</p>
                  )}
                  {watch('password')?.length>0 && watch('password')?.length<7 && (
                    <p className='alert' role="alert">Minimum 8 characters</p>
                  )}
                </div>
                <button type='submit' className='full'>Login</button>
              </form>
              :
              <h3>Hello User!</h3>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
