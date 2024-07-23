import React, { useState, useEffect } from 'react';
import SignUpForm from './components/SignUpForm';
import ChallengesPage from './components/ChallengesPage';
import LoginForm from './components/LoginForm';
import './App.css'; // Ensure you import the Tailwind CSS here

const App = () => {
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if token exists in local storage to set login state on initial load
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const openSignUpForm = () => setShowSignUpForm(true);
    const closeSignUpForm = () => setShowSignUpForm(false);

    const openLoginForm = () => setShowLoginForm(true);
    const closeLoginForm = () => setShowLoginForm(false);

    const goToChallenges = () => setCurrentPage('challenges');
    const goToHome = () => setCurrentPage('home');

    const handleLogin = () => {
        // Set logged-in state to true
        setIsLoggedIn(true);
        closeLoginForm();
    };

    const handleLogout = () => {
        // Clear token and logged-in state
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        goToHome(); // Optionally redirect to home or login page
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navigation Bar */}
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="#" onClick={goToHome} className="text-white text-2xl font-bold">Fitness App</a>
                    <div className="space-x-4">
                        <a href="#" onClick={goToHome} className="text-gray-300 hover:text-white">Home</a>
                        <a href="#" onClick={goToChallenges} className="text-gray-300 hover:text-white">Challenges</a>
                        <a href="#" className="text-gray-300 hover:text-white">Profile</a>
                        <a href="#" className="text-gray-300 hover:text-white">Chat</a>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Log Out</button>
                        ) : (
                            <button onClick={openLoginForm} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Log In</button>
                        )}
                    </div>
                </div>
            </nav>

            {currentPage === 'home' && (
                <>
                    {/* Home Section */}
                    <section id="home" className="container mx-auto mt-8 p-4 text-center">
                        <h1 className="text-4xl font-bold text-gray-800">FITNESS APP</h1>
                        <p className="mt-4 text-gray-600">Welcome to the Fitness App! Our platform offers a variety of challenges to keep you motivated on your fitness journey.</p>
                        <p className="mt-2 text-gray-600">Whether you're looking to walk 10,000 steps a day or engage in high-intensity workouts, we have something for everyone.</p>
                        <p className="mt-2 text-gray-600">Join us and be a part of a community that strives for health and fitness.</p>
                        <div className="mt-4 space-x-4">
                            <button onClick={openSignUpForm} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Create account</button>
                        </div>
                    </section>

                    {/* How it works Section */}
                    <section id="how-it-works" className="container mx-auto mt-16 p-4">
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">How it works</h2>
                        <div className="flex flex-wrap items-center justify-center">
                            <div className="w-full lg:w-1/2">
                                <ol className="space-y-8">
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                                            1
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Join Us</h3>
                                            <p className="text-gray-600">Create an account or log in to start your fitness journey. Joining is quick and easy, and you'll gain access to all our features.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                                            2
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Create or Join a Challenge</h3>
                                            <p className="text-gray-600">Choose from a variety of challenges or create your own. Whether you prefer solo activities or group challenges, there's something for everyone.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                                            3
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Track Your Progress</h3>
                                            <p className="text-gray-600">Monitor your progress through detailed statistics and insights. Keep track of your achievements and stay motivated as you reach your goals.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                                            4
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Talk with Others</h3>
                                            <p className="text-gray-600">Engage with the community by discussing challenges, sharing tips, and motivating each other. Our chat feature allows you to connect with like-minded individuals.</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {currentPage === 'challenges' && <ChallengesPage goBack={goToHome} />}

            {/* SignUpForm Modal */}
            {showSignUpForm && <SignUpForm closeModal={closeSignUpForm} />}
            {/* LoginForm Modal */}
            {showLoginForm && <LoginForm closeModal={closeLoginForm} onLogin={handleLogin} />}
        </div>
    );
};

export default App;
