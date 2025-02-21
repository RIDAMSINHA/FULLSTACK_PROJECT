
import { Card } from '@/components/ui/card';
import { BFHLResponse } from '@/services/api';

interface ResponseDisplayProps {
  response: BFHLResponse;
  selectedFilters: string[];
}


export const ResponseDisplay = ({ response, selectedFilters }: ResponseDisplayProps) => {
  console.log('ResponseDisplay component rendered',response);
  const getHighestAlphabet = (alphabets: string[]) => {
    return alphabets.reduce((highest, current) => {
      return current.toLowerCase() > highest.toLowerCase() ? current : highest;
    }, 'A');
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-1">{response.is_success ? 'Success' : 'Failed'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">User ID</p>
              <p className="mt-1">{response.user_id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1">{response.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Roll Number</p>
              <p className="mt-1">{response.roll_number}</p>
            </div>
          </div>

          {selectedFilters.includes('alphabets') && (
            <div>
              <p className="text-sm font-medium text-gray-500">Alphabets</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {response.alphabets.map((alpha, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100"
                  >
                    {alpha}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedFilters.includes('numbers') && (
            <div>
              <p className="text-sm font-medium text-gray-500">Numbers</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {response.numbers.map((num, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedFilters.includes('highest') && (
            <div>
              <p className="text-sm font-medium text-gray-500">Highest Alphabet</p>
              <p className="mt-1 text-lg font-medium">
                {getHighestAlphabet(response.highest_alphabet)}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
