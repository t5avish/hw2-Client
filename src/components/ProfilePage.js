import React, { useEffect, useState } from 'react';
import AvatarSelector from './AvatarSelector';
import 'tailwindcss/tailwind.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
        setSelectedAvatar(data.avatar);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleAvatarSelect = async (avatar) => {
    setSelectedAvatar(avatar);
    setIsAvatarSelectorOpen(false);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Not authenticated');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ avatar }),
      });

      if (!response.ok) {
        throw new Error('Failed to update avatar');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const avatarSrc = selectedAvatar ? require(`../assets/${selectedAvatar}`) : require('../assets/profile-pic.png');

  return (
    <div className="container mx-auto mt-8 p-4 text-center">
      {user ? (
        <>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">User Profile</h1>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full overflow-hidden cursor-pointer" onClick={() => setIsAvatarSelectorOpen(!isAvatarSelectorOpen)}>
                  <img
                    src={avatarSrc}
                    alt="Profile Picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h3>
                  <p className="text-gray-600">Age: {user.age}</p>
                  <p className="text-gray-600">Height: {user.height} cm</p>
                  <p className="text-gray-600">Weight: {user.weight} kg</p>
                  <p className="text-gray-600">BMI: {user.bmi}</p>
                </div>
              </div>
            </div>
            {isAvatarSelectorOpen && <AvatarSelector onSelect={handleAvatarSelect} />}
          </div>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
