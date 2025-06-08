export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export const fetchSkipsByLocation = async (postcode: string, area: string): Promise<Skip[]> => {
  try {
    const response = await fetch(
      `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${encodeURIComponent(postcode)}&area=${encodeURIComponent(area)}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching skips: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Skip[];
  } catch (error) {
    console.error('Failed to fetch skips:', error);
    throw error;
  }
};
