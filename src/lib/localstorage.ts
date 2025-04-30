import { UserResult } from "@/types"


export const addProfile = (newProfile : UserResult) => {
    localStorage.setItem("profile", JSON.stringify(newProfile))
}

export const getProfile = (): UserResult | null => {
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(profile) : null;
  }