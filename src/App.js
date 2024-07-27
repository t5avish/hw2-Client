import React, { useState, useEffect } from 'react';
import SignUpForm from './components/SignUpForm';
import ChallengesPage from './components/ChallengesPage';
import LoginForm from './components/LoginForm';
import ProfilePage from './components/ProfilePage';
import './App.css'; // Ensure you import the Tailwind CSS here

const App = () => {
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const openSignUpForm = () => setShowSignUpForm(true);
    const closeSignUpForm = () => setShowSignUpForm(false);

    const openLoginForm = () => setShowLoginForm(true);
    const closeLoginForm = () => setShowLoginForm(false);


    const goToChallenges = () => {
        if (isLoggedIn) {
            setCurrentPage('challenges');
        }
    };
    const goToHome = () => setCurrentPage('home');
    const goToProfile = () => {
        if (isLoggedIn) {
            setCurrentPage('profile');
        }
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        closeLoginForm();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        goToHome();
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
                        <a href="#" onClick={goToProfile} className="text-gray-300 hover:text-white">Profile</a>
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
                                    <li className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full">
                                            <span className="text-2xl">1</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">Sign Up</h3>
                                            <p className="text-gray-600">Create an account with your email and password to start tracking your fitness journey.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full">
                                            <span className="text-2xl">2</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">Join Challenges</h3>
                                            <p className="text-gray-600">Explore various fitness challenges and join those that fit your goals and interests.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full">
                                            <span className="text-2xl">3</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">Track Progress</h3>
                                            <p className="text-gray-600">Log your workouts and monitor your progress through your profile page.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full">
                                            <span className="text-2xl">4</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">Achieve Goals</h3>
                                            <p className="text-gray-600">Complete challenges, earn rewards, and reach your fitness goals with the support of our community.</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {currentPage === 'challenges' && <ChallengesPage goBack={goToHome} />}
            {currentPage === 'profile' && isLoggedIn && <ProfilePage />} {/* Conditionally render ProfilePage */}

            {/* SignUpForm Modal */}
            {showSignUpForm && <SignUpForm closeModal={closeSignUpForm} />}
            {/* LoginForm Modal */}
            {showLoginForm && <LoginForm closeModal={closeLoginForm} onLogin={handleLogin} />}
        </div>
    );
};

export default App;
