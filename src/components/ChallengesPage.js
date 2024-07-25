import React, { useEffect, useState } from 'react';

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/challenges', {
          method: 'GET',
          credentials: 'include', // If you need to include cookies or authentication headers
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Challenges:', data);
        setChallenges(data); // Update state with challenges data
      } catch (error) {
        console.error('Failed to fetch challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <section id="challenges" className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Fitness Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map(challenge => (
          <div key={challenge._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Join Challenge</button>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Want to add a new challenge?</h3>
        <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">Add New Challenge</button>
      </div>
    </section>
  );
};

export default ChallengesPage;
