'use client';
import { auth } from '@/services/firebase';
import { Input } from '@material-tailwind/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        alert('login success');
        sessionStorage.setItem('user', true);
        router.push('/beranda');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <form className="flex flex-col gap-5 p-5 border border-gray-500 rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Login</h2>
      <Input label="Email" type="email" onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Password" type="password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="py-2 px-3 bg-teal-500 hover:bg-teal-700 rounded-md">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
