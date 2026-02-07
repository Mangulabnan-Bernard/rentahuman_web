'use client'

import { useState } from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import Tabs from '../components/Tabs'
import { User, Mail, Phone, MapPin, Briefcase, Star, Camera, Edit, Save, X } from 'lucide-react'

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Experienced AI Training Specialist with 5+ years of experience in machine learning, data annotation, and model training. Passionate about helping AI systems learn and improve.',
    title: 'AI Training Specialist',
    hourlyRate: 75,
    languages: ['English', 'Mandarin', 'Spanish'],
    skills: ['Machine Learning', 'Data Annotation', 'Model Training', 'Python', 'Quality Assurance']
  })

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 text-primary hover:underline"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 text-primary hover:underline"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 text-muted-foreground hover:underline"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-start space-x-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Professional Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({...profile, title: e.target.value})}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                disabled={!isEditing}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Professional Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Hourly Rate ($)</label>
              <input
                type="number"
                value={profile.hourlyRate}
                onChange={(e) => setProfile({...profile, hourlyRate: parseInt(e.target.value)})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Languages</label>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang, index) => (
                  <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-foreground">Average Rating</span>
              </div>
              <span className="font-semibold text-foreground">4.9 / 5.0</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Total Tasks Completed</span>
              <span className="font-semibold text-foreground">47</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Total Earnings</span>
              <span className="font-semibold text-foreground">$4,250</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Member Since</span>
              <span className="font-semibold text-foreground">Jan 2023</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Response Time</span>
              <span className="font-semibold text-foreground">1 hour</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const VerificationStatus = () => (
  <div className="space-y-6">
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Verification Status</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div>
            <p className="font-medium text-foreground">Identity Verified</p>
            <p className="text-sm text-muted-foreground">Government ID verified</p>
          </div>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
            Verified
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div>
            <p className="font-medium text-foreground">Email Verified</p>
            <p className="text-sm text-muted-foreground">Email address confirmed</p>
          </div>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
            Verified
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div>
            <p className="font-medium text-foreground">Skills Assessment</p>
            <p className="text-sm text-muted-foreground">Complete skill assessment tests</p>
          </div>
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm rounded-full">
            Pending
          </span>
        </div>
      </div>
    </div>
  </div>
)

export default function ProfilePage() {
  const tabs = [
    {
      id: 'info',
      label: 'Profile Information',
      content: <ProfileInfo />
    },
    {
      id: 'verification',
      label: 'Verification',
      content: <VerificationStatus />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your personal information and verification status.
            </p>
          </div>

          <Tabs tabs={tabs} defaultTab="info" />
        </main>
      </div>
    </div>
  )
}
