'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();
  const [pet, setPet] = useState({
    name: '',
    breed: '',
    age: '',
    gender: '',
    ownerEmail: session?.user?.email || '',
  });

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/addPet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pet),
    });

    if (res.ok) {
      console.log('Pet added!');
      // Handle success (e.g., clear form, show success message)
    } else {
      console.log('Error adding pet');
      // Handle error
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          value={pet.name}
          onChange={handleChange}
          placeholder="Pet's Name"
        />
        <input
          type='text'
          name='breed'
          value={pet.breed}
          onChange={handleChange}
          placeholder='Breed'
        />
        <input
          type='text'
          name='age'
          value={pet.age}
          onChange={handleChange}
          placeholder='Age'
        />
        <input
          type='text'
          name='gender'
          value={pet.gender}
          onChange={handleChange}
          placeholder='Gender'
        />
        <button type='submit'>Add Pet</button>
      </form>
    </div>
  );
}
