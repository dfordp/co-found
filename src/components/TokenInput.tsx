import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TokenInputProps {
  onTokenSubmit: (token: string) => void;
  hasToken: boolean;
}

export default function TokenInput({ onTokenSubmit, hasToken }: TokenInputProps) {
  const [inputToken, setInputToken] = useState('');

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Input
            type="password"
            placeholder="Enter your Linkd API key"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
          />
          <Button onClick={() => onTokenSubmit(inputToken)}>
            {hasToken ? 'Update Token' : 'Set Token'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}