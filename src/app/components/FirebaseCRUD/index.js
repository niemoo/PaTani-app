'use client';

import FirebaseConfig from '../FirebaseConfig';
import { ref, set, get, update, remove, child } from 'firebase/database';
import { useState } from 'react';

const database = FirebaseConfig();

const FirebaseCRUD = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const insertData = () => {
    set(ref(database, 'Users/' + username), {
      email: email,
      fullname: name,
    });
  };

  const selectData = () => {
    const dbref = ref(database);

    get(child(dbref, 'Users/' + username))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setEmail(snapshot.val().email);
          setName(snapshot.val().name);
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
    <>
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

      <button onClick={insertData}>Insert Data</button>
      <button>Update Data</button>
      <button>Delete Data</button>
      <button onClick={selectData}>Select Data</button>
    </>
  );
};

export default FirebaseCRUD;
