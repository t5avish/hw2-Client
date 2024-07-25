import React from 'react';

const AvatarSelector = ({ onSelect }) => {
  const avatars = [
    'avatar1.png',
    'avatar2.png',
    'avatar3.png',
    'avatar4.png',
    'avatar5.png',
    'avatar6.png',
    'avatar7.png',
    'avatar8.png',
    'avatar9.png',
    'avatar10.png',
    'avatar11.png',
    'profile-pic.png',
    // Add more avatar filenames here
  ];

  const handleAvatarClick = (avatar) => {
    onSelect(avatar);
  };

  return (
    <div className="avatar-selector">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Select Avatar</h3>
      <div className="flex space-x-4 justify-center">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={require(`../assets/${avatar}`)}
            alt={`Avatar ${index + 1}`}
            onClick={() => handleAvatarClick(avatar)}
            className="cursor-pointer w-24 h-24 object-cover rounded-full border-2 border-transparent hover:border-blue-500 transition duration-200"
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
