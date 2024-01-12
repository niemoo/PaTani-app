'use client';
import { auth } from '@/services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import UserSettingForm from '@/components/UserSettingForm';
import { useState, useEffect } from 'react';

const BerandaPage = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(user);
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');

  useEffect(() => {
    console.log(data);

    if (!user || !userSession) {
      router.push('/login');
    }
  }, [data, router, user, userSession]);

  return (
    <main>
      <h1>Ini beranda</h1>
      {data?.uid}
      <UserSettingForm />
      <button onClick={() => signOut(auth)}>Logout</button>
    </main>
  );
};

export default BerandaPage;
