// frontend/src/app/(main)/profile/page.tsx
'use client';
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../../lib/api';

// Re-use IUserProfile from useAuth or define a more specific IProfile type
interface IProfileUpdatePayload {
  name?: string;
  email?: string;
  image?: string;
  coverImg?: string;
}

const fetchUserProfile = async (): Promise<any> => { // Adjust to specific response type if needed
  const response = await api.get('/users/profile'); // Assuming a /users/profile endpoint
  return response.data.data;
};

const updateUserProfile = async (payload: IProfileUpdatePayload): Promise<any> => {
  const response = await api.put('/users/profile', payload); // Assuming a PUT /users/profile endpoint
  return response.data.data;
};

export default function ProfilePage() {
  const { user: authUser, logout } = useAuth(); // User from auth state
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error, refetch } = useQuery<any>({ // Fetch actual profile from backend
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    enabled: !!authUser, // Only fetch if authenticated
  });

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(authUser?.name || '');
  const [email, setEmail] = useState(authUser?.email || '');
  const [image, setImage] = useState(authUser?.image || '');
  const [coverImg, setCoverImg] = useState(authUser?.coverImg || '');
  const [updateError, setUpdateError] = useState<string | null>(null);

  React.useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setImage(profile.image || '');
      setCoverImg(profile.coverImg || '');
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] }); // Invalidate and refetch profile
      // Optionally, update local auth user state too
      // updateAuthUser(updatedData); // If useAuth provides an update function
      setEditMode(false);
      setUpdateError(null);
    },
    onError: (err: any) => {
      setUpdateError(err.response?.data?.message || 'Failed to update profile.');
    },
  });

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError(null);
    const payload: IProfileUpdatePayload = { name, email, image, coverImg };
    updateMutation.mutate(payload);
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading profile...</p>;
  if (error) return <p className="text-center text-red-600">Error loading profile: {error.message}</p>;
  if (!profile) return <p className="text-center text-gray-600">Profile not found.</p>;

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">My Profile</h1>
      {!editMode ? (
        <div className="space-y-4">
          <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
            {profile.coverImg ? (
              <img src={profile.coverImg} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl">No Cover Image</div>
            )}
            {profile.image ? (
              <img src={profile.image} alt="Profile" className="absolute -bottom-12 left-4 w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
            ) : (
              <div className="absolute -bottom-12 left-4 w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-white text-xl border-4 border-white shadow-md">
                {profile.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="pt-16 px-4">
            <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600">Email: {profile.email}</p>
            <p className="text-gray-600">Role: <span className="font-medium text-blue-600">{profile.role}</span></p>
            {profile.memberShip && (
              <p className="text-gray-600">Membership: {profile.memberShip.package.name} (Expires: {new Date(profile.memberShip.exp).toLocaleDateString()})</p>
            )}
            <div className="flex space-x-4 mt-4">
              <p className="text-gray-600">Followers: {profile.followers?.length || 0}</p>
              <p className="text-gray-600">Following: {profile.following?.length || 0}</p>
            </div>
            <Button onClick={() => setEditMode(true)} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md">
              Edit Profile
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdateSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-1">Name</label>
            <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">Email</label>
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-1">Profile Image URL</label>
            <Input type="url" id="image" value={image} onChange={(e) => setImage(e.target.value)} className="w-full" />
          </div>
          <div>
            <label htmlFor="coverImg" className="block text-gray-700 text-sm font-bold mb-1">Cover Image URL</label>
            <Input type="url" id="coverImg" value={coverImg} onChange={(e) => setCoverImg(e.target.value)} className="w-full" />
          </div>
          {updateError && <p className="text-red-500 text-sm">{updateError}</p>}
          <div className="flex space-x-4">
            <Button type="submit" disabled={updateMutation.isPending} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md">
              {updateMutation.isPending ? 'Updating...' : 'Save Changes'}
            </Button>
            <Button type="button" onClick={() => setEditMode(false)} variant="bordered" className="px-4 py-2 border rounded-md hover:bg-gray-100">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}