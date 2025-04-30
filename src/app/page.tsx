'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import TokenInput from '@/components/TokenInput';
import { searchUsers, setAuthToken } from '@/services';
import type { UserResult, SearchResponse } from '@/types';
import { addProfile } from '@/lib/localstorage';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState('');
  const [results, setResults] = useState<UserResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('linkd_api_token');
    if (savedToken) {
      setToken(savedToken);
      setAuthToken(savedToken);
    }
  }, []);

  const handleSearch = async () => {
    if (!token) {
      setError('Please provide an API token first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response: SearchResponse = await searchUsers({ 
        query: searchQuery,
        limit: 10
      });
      setResults(response.results);
      if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenSubmit = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('linkd_api_token', newToken);
    setAuthToken(newToken);
  };

  const handleCardClick = (result: UserResult) => {
    addProfile(result);
    router.push(`/profile/${result.id}`);
  };
 
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="font-sans">Find the perfect</span>{" "}
            <span className="font-serif italic">co-founder</span>{" "}
            <span className="font-sans">for your startup idea</span>
          </h1>
        </div>

        {/* Token Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <TokenInput 
            onTokenSubmit={handleTokenSubmit}
            hasToken={!!token}
          />
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto space-y-4">
          <Textarea 
            placeholder="Describe what you're looking for in a co-founder..."
            className="min-h-[120px] text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search Co-founders'}
          </Button>
        </div>

        {/* Results Section */}
        {error && (
          <div className="max-w-2xl mx-auto mt-4 p-4 bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((result) => (
              <Card 
                key={result.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => handleCardClick(result)}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div>
                    <h3 className="font-semibold">{result.name}</h3>
                    <p className="text-sm text-muted-foreground">{result.location}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">{result.headline}</p>
                  {result.past_employers[0] && (
                    <div className="text-sm text-muted-foreground">
                      <p>{result.past_employers[0].employee_title}</p>
                      <p>{result.past_employers[0].employer_name}</p>
                    </div>
                  )}
                  {result.education_background[0] && (
                    <p className="text-sm text-muted-foreground">
                      {result.education_background[0].school_name} - {result.education_background[0].degree}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}