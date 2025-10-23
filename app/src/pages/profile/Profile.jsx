import React from 'react'
import ProfileComponent from '../setting/tabs/Profile'

const Profile = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your profile information and settings</p>
      </div>
      <ProfileComponent />
    </div>
  )
}

export default Profile