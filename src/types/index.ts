export interface Experience {
    employee_title: string;
    employer_name: string;
  }
  
  export interface Education {
    degree: string;
    field_of_study: string;
    school_name: string;
    description: string;
    school_logo: string;
  }

  export interface Current {
    employee_description : string;
    employee_title: string;
    employer_name: string;
  }
  
  export interface Profile {
    id: string;
    name: string;
    location: string;
    headline: string;
    description: string;
    title: string;
    profile_picture_url: string;
    linkedin_url: string;
  }
  
  export interface UserResult {
    id: string;
    name: string;
    location: string;
    headline: string;
    description: string;
    title: string;
    profile_picture_url: string;
    current_employers : Current[]
    past_employers: Experience[];
    education_background: Education[];
  }
  
  export interface SearchResponse {
    results: UserResult[];
    total: number;
    query: string;
    error: string | null;
  }
  
  export interface SearchParams {
    query: string;
    limit?: number;
    school?: string[];
  } 