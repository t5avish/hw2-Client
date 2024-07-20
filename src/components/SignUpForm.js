import React, { useState } from 'react';

const SignUpForm = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: '',
        weight: '',
        height: '',
        gender: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage(true);
                setErrorMessage('');
            } else {
                setErrorMessage(result.message);
                setSuccessMessage(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
            setSuccessMessage(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
            <div className="bg-white p-8 rounded shadow-lg relative z-20 w-full max-w-lg">
                <button 
                    onClick={closeModal} 
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-30"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    autoComplete="given-name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    autoComplete="family-name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="age" className="block text-gray-700">Age</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    autoComplete="age"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="weight" className="block text-gray-700">Weight (kg)</label>
                                <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    autoComplete="weight"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="height" className="block text-gray-700">Height (cm)</label>
                                <input
                                    type="number"
                                    id="height"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    autoComplete="height"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-gray-700">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    autoComplete="gender"
                                    required
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Sign Up
                    </button>
                </form>
                {successMessage && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-white p-4 rounded shadow-lg z-30">
                        <p className="text-green-500">User created successfully!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUpForm;
