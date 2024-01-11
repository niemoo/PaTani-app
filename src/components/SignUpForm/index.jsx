'use client';

import { auth } from '@/services/firebase';
import { Input } from '@material-tailwind/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const insertData = async (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        router.push('/login');
        alert('signup successful');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };

  return (
    <form className="flex flex-col gap-5 p-5 border border-gray-500 rounded-lg" onSubmit={insertData}>
      <h2 className="text-xl font-semibold">Sign Up</h2>

      <Input
        label="Email"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />

      <Input
        label="Password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      {password.length > 0 && password.length < 6 && <p className="text-red-500 text-xs">Password harus memiliki minimal 6 karakter</p>}

      <button type="submit" className="py-2 px-3 bg-teal-500 hover:bg-teal-700 rounded-md">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
