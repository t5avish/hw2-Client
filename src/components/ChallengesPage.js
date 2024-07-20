import React from 'react';

const challenges = [
  {
    id: 1,
    title: "10,000 Steps a Day",
    description: "Challenge yourself to walk 10,000 steps every day. Track your steps and see your progress over time."
  },
  {
    id: 2,
    title: "30-Day HIIT Workout",
    description: "Engage in high-intensity interval training for 30 days. Each day features a different workout to keep you motivated."
  },
  {
    id: 3,
    title: "Yoga for Flexibility",
    description: "Improve your flexibility with a 30-day yoga challenge. Each session focuses on different poses to help you stretch and relax."
  },
  {
    id: 4,
    title: "5K Running Challenge",
    description: "Train to run a 5K with this progressive challenge. Each week you'll build your endurance and strength."
  },
  {
    id: 5,
    title: "Healthy Eating Challenge",
    description: "Commit to healthy eating habits for 30 days. Receive daily tips and recipes to help you stay on track."
  },
  {
    id: 6,
    title: "Strength Training",
    description: "Build muscle and strength with this 6-week strength training challenge. Follow the plan and track your progress."
  },
  {
    id: 7,
    title: "Daily Meditation",
    description: "Practice daily meditation for mindfulness and stress relief. Find inner peace and improve mental clarity."
  },
  {
    id: 8,
    title: "Weekly Swimming Challenge",
    description: "Swim laps every week to improve cardiovascular fitness and endurance. Track your progress in the pool!"
  },
  {
    id: 9,
    title: "Flexibility Fridays",
    description: "Dedicate Fridays to improving flexibility with a variety of stretching exercises. Start the weekend feeling limber!"
  }
];

const ChallengesPage = () => {
  return (
    <section id="challenges" className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Fitness Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map(challenge => (
          <div key={challenge.id} className="bg-white p-6 rounded-lg shadow-lg">
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
