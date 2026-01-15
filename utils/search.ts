export function getSearchRemaining(): number {
  const now = Date.now();
  const dayStart = new Date(now).setHours(0, 0, 0, 0);
  const searchData = JSON.parse(localStorage.getItem('cheffs_search_data') || '{"timestamp": 0, "remaining": 20}');
  
  if (now - searchData.timestamp > 60000 || searchData.timestamp < dayStart) {
    localStorage.setItem('cheffs_search_data', JSON.stringify({timestamp: now, remaining: 20}));
    return 20;
  }
  
  return searchData.remaining;
}

export function decrementSearchRemaining(): boolean {
  const remaining = getSearchRemaining();
  if (remaining <= 0) return false;
  
  const now = Date.now();
  localStorage.setItem('cheffs_search_data', JSON.stringify({timestamp: now, remaining: remaining - 1}));
  updateSearchRemaining();
  return true;
}

export function updateSearchRemaining() {
  const remaining = getSearchRemaining();
  const remainingEl = document.getElementById('cheffs-search-remaining');
  if (remainingEl) {
    remainingEl.textContent = `${remaining} remaining`;
    if (remaining <= 0) {
      remainingEl.style.background = '#999';
    }
  }
}

export function getActiveFilters(): {
  github: boolean;
  readme: boolean;
  demo: boolean;
  description: boolean;
} {
  return {
    github: (document.getElementById('cheffs-filter-github') as HTMLInputElement)?.checked || false,
    readme: (document.getElementById('cheffs-filter-readme') as HTMLInputElement)?.checked || false,
    demo: (document.getElementById('cheffs-filter-demo') as HTMLInputElement)?.checked || false,
    description: (document.getElementById('cheffs-filter-description') as HTMLInputElement)?.checked || false,
  };
}

export function filterProjects(projects: any[], query: string, filters: ReturnType<typeof getActiveFilters>): any[] {
  const lowerQuery = query.toLowerCase();
  const nameMatches = projects.filter((p: any) => (p.title || '').toLowerCase().includes(lowerQuery));
  const descMatches = projects.filter((p: any) => !(p.title || '').toLowerCase().includes(lowerQuery) && (p.description || '').toLowerCase().includes(lowerQuery));
  
  return [...nameMatches, ...descMatches].filter(p => {
    if (filters.github && !p.repo_url) return false;
    if (filters.readme && !p.readme_url) return false;
    if (filters.demo && !p.demo_url) return false;
    if (filters.description && !p.description) return false;
    return true;
  });
}
