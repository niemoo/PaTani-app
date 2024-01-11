'use client';
import { auth } from '@/services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const BerandaPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');

  console.log({ user });
  if (!user && !userSession) {
    router.push('/login');
  }

  return (
    <main>
      <h1>Ini beranda</h1>
      <button onClick={() => signOut(auth)}>Logout</button>
    </main>
  );
};

export default BerandaPage;
