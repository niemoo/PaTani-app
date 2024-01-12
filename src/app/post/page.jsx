'use client';
import { auth } from '@/services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import PostForm from '@/components/PostForm';
import { useState, useEffect } from 'react';

const AddPostPage = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(user);
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');

  useEffect(() => {
    console.log(data);

    // if (!user) {
    //   router.push('/login');
    // }
  }, [data, router, user, userSession]);

  return (
    <main>
      <h1>Ini Add post page</h1>
      {data?.uid}
      <PostForm />
    </main>
  );
};

export default AddPostPage;
