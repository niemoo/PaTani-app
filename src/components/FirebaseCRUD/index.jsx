'use client';

import FirebaseConfig from '../../services/firebase';
import { ref, set, get, update, remove, child } from 'firebase/database';
import { useState } from 'react';

const database = FirebaseConfig();

const FirebaseCRUD = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const dbref = ref(database);

  const insertData = () => {
    set(ref(database, 'Users/' + username), {
      email: email,
      fullname: name,
    }).then(() => {
      alert('added successfully');
    });
  };

  const updateData = () => {
    get(child(dbref, 'Users/' + username))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(ref(database, 'Users/' + username), {
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
    get(child(dbref, 'Users/' + username))
      .then((snapshot) => {
        if (snapshot.exists()) {
          remove(ref(database, 'Users/' + username)).then(() => {
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
    get(child(dbref, `Users/${username}`))
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

export default FirebaseCRUD;
