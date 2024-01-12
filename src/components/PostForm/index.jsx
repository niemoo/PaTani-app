'use client';

import { db } from '../../services/firebase';
import { auth } from '@/services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, set, get, update, remove, child } from 'firebase/database';
import { useState } from 'react';
import { Input } from '@material-tailwind/react';

const PostForm = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(user);

  const [post_id, setPost_id] = useState('');
  const [uid, setUid] = useState(data?.uid);
  const [title, setTitle] = useState('');
  const [product_name, setProduct_name] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const dbref = ref(db);

  const generateRandomId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  };

  const insertData = () => {
    const newPostId = generateRandomId(5);
    setPost_id(newPostId);

    set(ref(db, 'posts/' + post_id), {
      user_id: uid,
      title: title,
      product_name: product_name,
      category: category,
      quantity: quantity,
      deskripsi: deskripsi,
    }).then(() => {
      alert('added successfully');
    });
  };

  const updateData = () => {
    get(child(dbref, 'posts/' + post_id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(ref(db, 'posts/' + post_id), {
            user_id: uid,
            title: title,
            product_name: product_name,
            category: category,
            quantity: quantity,
            deskripsi: deskripsi,
          }).then(() => {
            alert('updated successfully');
          });
        } else {
          alert('user does not exist');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('error data retrieval was unsuccessful');
      });
  };

  const removeData = () => {
    get(child(dbref, 'posts/' + username))
      .then((snapshot) => {
        if (snapshot.exists()) {
          remove(ref(database, 'posts/' + post_id)).then(() => {
            alert('delete success');
          });
        } else {
          alert('user does not exist');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('error data retrieval was unsuccessful');
      });
  };

  const selectData = () => {
    get(child(dbref, `posts/${post_id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setEmail(snapshot.val().email);
          setName(snapshot.val().fullname);
          alert(`${username}, ${email}, ${name}`);
        } else {
          alert('no data available');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('error data retrieval was unsuccessful');
      });
  };

  return (
    <div className="flex">
      {post_id}
      <Input
        type="text"
        label="Judul"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="border border-black"
      />

      <Input
        type="text"
        label="Nama Barang"
        onChange={(e) => {
          setProduct_name(e.target.value);
        }}
        className="border border-black"
      />

      <Input
        type="text"
        label="Kategori"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        className="border border-black"
      />

      <Input
        type="text"
        label="Kuantitas"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
        className="border border-black"
      />

      <Input
        type="text"
        label="Deskripsi"
        onChange={(e) => {
          setDeskripsi(e.target.value);
        }}
        className="border border-black"
      />

      <div className="flex">
        <button onClick={insertData}>Insert Data</button>
        <button onClick={updateData}>Update Data</button>
        <button onClick={removeData}>Delete Data</button>
        <button onClick={selectData}>Select Data</button>
      </div>
    </div>
  );
};

export default PostForm;
