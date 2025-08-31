import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sysadmin',
    company: 'RIS',
    email: 'sysadmin',
  });
  const [editProfile, setEditProfile] = useState(profile);
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditProfile(profile);
    setEditMode(true);
  };

  const handleSave = () => {
    setProfile(editProfile);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };
  const handleHome = () => {
    navigate('/home');
  };
  const handleResetPassword = () => {
    navigate('/reset-password');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-3xl mb-4">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div className="text-xl font-semibold text-gray-900 mb-2">{profile.name}</div>
        <div className="text-gray-500 mb-4">{profile.company}</div>
        <div className="w-full border-t border-gray-200 my-4" />
        {editMode ? (
          <div className="w-full flex flex-col gap-3 mb-6">
            <div className="flex justify-between items-center text-gray-700">
              <span className="font-medium">Name:</span>
              <input
                className="border border-gray-300 rounded px-2 py-1 text-sm w-1/2"
                value={editProfile.name}
                onChange={e => setEditProfile({ ...editProfile, name: e.target.value })}
              />
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span className="font-medium">Company:</span>
              <input
                className="border border-gray-300 rounded px-2 py-1 text-sm w-1/2"
                value={editProfile.company}
                onChange={e => setEditProfile({ ...editProfile, company: e.target.value })}
              />
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span className="font-medium">Email:</span>
              <input
                className="border border-gray-300 rounded px-2 py-1 text-sm w-1/2"
                value={editProfile.email}
                onChange={e => setEditProfile({ ...editProfile, email: e.target.value })}
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2 mb-6">
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Name:</span>
              <span>{profile.name}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Company:</span>
              <span>{profile.company}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Email:</span>
              <span>{profile.email}</span>
            </div>
          </div>
        )}
        {editMode ? (
          <div className="flex gap-2 w-full">
            <button onClick={handleSave} className="flex-1 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Save</button>
            <button onClick={handleCancel} className="flex-1 px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">Cancel</button>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
          <div className="flex gap-2 w-full">
            <button onClick={handleEdit} className="flex-1 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Edit Profile</button>
            <button onClick={handleLogout} className="flex-1 px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition">Logout</button>
            </div>
            <div className="flex gap-2 w-full">
            <button onClick={handleHome} className="flex-1 px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition">Home Page</button>
              <button onClick={handleResetPassword} className="flex-1 px-4 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition">Reset Password</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 