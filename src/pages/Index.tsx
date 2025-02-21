
import { useState } from 'react';
import { JsonInput } from '@/components/JsonInput';
import { ResponseFilter } from '@/components/ResponseFilter';
import { ResponseDisplay } from '@/components/ResponseDisplay';
import { processBFHL, BFHLResponse } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<BFHLResponse | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (data: { data: string[] }) => {
    setIsLoading(true);
    try {
      const result = await processBFHL(data);
      console.log(result);
      setResponse(result);
      if (selectedFilters.length === 0) {
        setSelectedFilters(['alphabets', 'numbers']); // Default selected filters
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">JSON Processor</h1>
          <p className="text-gray-600">Enter your JSON data below to process it</p>
        </div>

        <JsonInput onSubmit={handleSubmit} isLoading={isLoading} />

        {response && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <ResponseFilter
              selected={selectedFilters}
              onChange={setSelectedFilters}
            />
            <ResponseDisplay
              response={response}
              selectedFilters={selectedFilters}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
