"use client";
import { auth } from "@/services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";

import NavBar from "@/components/NavBar";

const AddPostPage = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(user);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  useEffect(() => {
    console.log(data);

    // if (!user) {
    //   router.push('/login');
    // }
  }, [data, router, user, userSession]);

  return (
    <main>
      <NavBar />
      <h1>Ini Add post page</h1>
      {data?.uid}
      <PostForm />
      <div className="flex flex-col items-center w-full border border-red-200">
        <PostCard />
      </div>
    </main>
  );
};

export default AddPostPage;
