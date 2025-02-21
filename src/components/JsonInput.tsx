
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface JsonInputProps {
  onSubmit: (data: { data: string[] }) => void;
  isLoading: boolean;
}

export const JsonInput = ({ onSubmit, isLoading }: JsonInputProps) => {
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const validateAndSubmit = () => {
    try {
      const parsed = JSON.parse(input);
      if (!parsed.data || !Array.isArray(parsed.data)) {
        throw new Error('Invalid format. Expected {"data": [...]}');
      }
      onSubmit(parsed);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: error instanceof Error ? error.message : "Please check your input format",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      <div className="relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"data": ["A","1","B","2"]}'
          className="min-h-[120px] resize-none font-mono text-sm bg-white/50 backdrop-blur-sm border-gray-200 focus:border-gray-300 transition-colors"
        />
      </div>
      <Button 
        onClick={validateAndSubmit}
        disabled={isLoading}
        className="w-full bg-black hover:bg-gray-800 text-white transition-colors"
      >
        {isLoading ? "Processing..." : "Process JSON"}
      </Button>
    </div>
  );
};
