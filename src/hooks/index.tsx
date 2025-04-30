import { useState, useEffect } from 'react';

interface Employer {
  employer_name: string;
  employee_title: string;
  start_date?: string;
  end_date?: string;
}

export interface Profile {
  id: number;
  name: string;
  location: string;
  headline: string;
  title: string;
  current_employers: Employer[];
  past_employers: Employer[];
}

export function useSavedProfiles() {
  const [savedProfiles, setSavedProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('saved_profiles');
    if (stored) {
      setSavedProfiles(JSON.parse(stored));
    }
  }, []);

  const saveProfile = (profile: Profile) => {
    const updated = [...savedProfiles, profile];
    setSavedProfiles(updated);
    localStorage.setItem('saved_profiles', JSON.stringify(updated));
  };

  const removeProfile = (id: number) => {
    const updated = savedProfiles.filter(p => p.id !== id);
    setSavedProfiles(updated);
    localStorage.setItem('saved_profiles', JSON.stringify(updated));
  };

  return { savedProfiles, saveProfile, removeProfile };
}