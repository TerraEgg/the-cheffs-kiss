export async function fetchAndExtractApiKey(): Promise<string | null> {
  try {
    const response = await fetch('https://flavortown.hackclub.com/shop');
    const html = await response.text();
    const apiKeyMatch = html.match(/ft_sk_[a-f0-9]{40}/);
    if (!apiKeyMatch) {
      return null;
    }
    return apiKeyMatch[0];
  } catch (error) {
    return null;
  }
}

export async function searchProjects(query: string, apiKey: string): Promise<any[]> {
  const url = `https://flavortown.hackclub.com/api/v1/projects?query=${encodeURIComponent(query)}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Flavortown-Ext-8456': 'true'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`API error: ${response.status} - ${data.error || 'Unknown error'}`);
  }

  return data.projects || [];
}
