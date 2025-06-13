'use client';

import { useState } from 'react';

const SettingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    quoteOfTheDay: 'The only way to do great work is to love what you do.',
    profileImage: 'https://via.placeholder.com/150', 
  });

 
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setFormData({
        ...formData,
        profileImage: imageUrl, 
      });
      setSelectedImage(file); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission (e.g., API call)
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center mt-[-50px] min-h-screen">
      {/* Container with two separated white boxes */}
      <div className="flex space-x-8 w-full max-w-5xl p-6 sm:p-8 md:p-10">
        
        {/* Left Box: Photo Profile and Quote of the Day */}
        <div className="bg-white w-1/3 p-6 rounded-xl shadow-lg h-auto">
          <div className="text-center mb-6">
            {/* Profile Photo with Circular Frame */}
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-500">
              {/* Gambar Placeholder dengan teks kustom */}
              <img
                src={formData.profileImage === 'https://via.placeholder.com/150' ? 'https://via.placeholder.com/100x100.png?text=Your+Image+Here' : formData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Button to trigger file input */}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden" // Sembunyikan input file
            />
            <button
              className="text-blue-500 hover:underline"
              onClick={() => document.getElementById('fileInput').click()} // Triggers the file input click event
            >
              Change
            </button>
          </div>

          {/* Quote of the Day */}
          <div className="p-3 rounded-lg h-[100px]">
            <h3 className="text-sm font-semibold mb-2">Quote of the Day</h3>
            <textarea
              name="quoteOfTheDay"
              value={formData.quoteOfTheDay}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-full shadow-md"
              placeholder="Your inspiring quote here..."
            />
          </div>
        </div>

        {/* Right Box: Main Form */}
        <div className="bg-white w-2/3 p-6 rounded-xl shadow-lg h-auto max-h-[400px]">
          {/* Step Title and Description */}
          <h2 className="text-2xl font-semibold text-center mb-2">Personal Information</h2>
          <p className="text-center text-gray-500 mb-8">
            Hello there! Fill in your personal information for your account. We will be able to
            send a love letter to you after.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name*</label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name.split(' ')[0] || ''}
                  onChange={(e) => handleChange({ target: { name: 'name', value: `${e.target.value} ${formData.name.split(' ')[1] || ''}` } })}
                  placeholder="First Name"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name.split(' ')[1] || ''}
                  onChange={(e) => handleChange({ target: { name: 'name', value: `${formData.name.split(' ')[0] || ''} ${e.target.value}` } })}
                  placeholder="Last Name"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Input Your Email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Input Your Phone Number"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create Password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* Button positioned at the bottom right */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingForm;
