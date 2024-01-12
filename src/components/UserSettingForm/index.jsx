'use client';

import { db } from '../../services/firebase';
import { auth } from '@/services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, set, get, update, remove, child } from 'firebase/database';
import { useState } from 'react';

const UserSettingForm = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const dbref = ref(db);

  const insertData = () => {
    set(ref(db, 'users/' + data?.uid), {
      username: username,
      email: email,
      fullname: name,
    }).then(() => {
      alert('added successfully');
    });
  };

  const updateData = () => {
    get(child(dbref, 'users/' + data?.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(ref(db, 'users/' + data?.uid), {
            username: username,
            email: email,
            fullname: name,
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
    get(child(dbref, 'users/' + username))
      .then((snapshot) => {
        if (snapshot.exists()) {
          remove(ref(database, 'users/' + data?.uid)).then(() => {
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
    get(child(dbref, `users/${data?.uid}`))
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
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        className="border border-black"
      />
      <input
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="border border-black"
      />
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
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

export default UserSettingForm;
