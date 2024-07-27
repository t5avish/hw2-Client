import React, { useEffect, useState } from 'react';
import { URL } from '../settings'
const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch(URL + 'challenges', {
          method: 'GET',
          credentials: 'include', // If you need to include cookies or authentication headers
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setChallenges(data); // Update state with challenges data
      } catch (error) {
        console.error('Failed to fetch challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !description) {
      alert('Please fill in both fields');
      return;
    }

    try {
      const response = await fetch(URL + 'challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        const newChallenge = await response.json();
        setChallenges([...challenges, newChallenge]);
        setTitle('');
        setDescription('');
        setShowForm(false);
      } else {
        alert('Failed to add challenge');
      }
    } catch (error) {
      console.error('Failed to add challenge:', error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setTitle('');
    setDescription('');
  };

  const handleAddChallengeClick = () => {
    setShowForm(true);
  };

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
        <button onClick={handleAddChallengeClick} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">Add New Challenge</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-8 rounded-lg shadow-lg">
            <button 
              onClick={handleFormClose} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              aria-label="Close"
            >
              X
            </button>
            <h3 className="text-2xl font-bold mb-4">Add New Challenge</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-2 w-full rounded"
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ChallengesPage;
