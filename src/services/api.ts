export interface BFHLRequest {
  data: string[];
}

export interface BFHLResponse {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: string[];
  alphabets: string[];
  highest_alphabet?: string[];
}

export const processBFHL = async (data: BFHLRequest): Promise<BFHLResponse> => {
  try {
    const res = await fetch('https://fullstack-project-1-89qd.onrender.com/api/bfhl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      throw new Error('Failed to process data');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error processing data:', error);
    throw new Error('Failed to process data');
  }
};

export const getBFHLStatus = async (): Promise<{ operation_code: number }> => {
  try {
    const res = await fetch('https://fullstack-project-1-89qd.onrender.com/api/bfhl', {
      method: 'GET',
    });
    
    if (!res.ok) {
      throw new Error('Failed to get status');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error getting status:', error);
    throw new Error('Failed to get status');
  }
};
