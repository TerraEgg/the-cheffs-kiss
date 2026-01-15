import { addSearchTabToNav, modifyExplorePage, handleExploreTabRedirect, hideExploreContent } from '../utils/navigation';
import { fetchAndExtractApiKey, searchProjects } from '../utils/api';
import { getSearchRemaining, decrementSearchRemaining, getActiveFilters, filterProjects } from '../utils/search';
import { displaySearchBox, displaySearchResults, displayApiKeyError } from '../utils/ui';
import { applyRecipieFinderTheme } from '../utils/theme';

async function handleSearch(query: string) {
  const apiKey = localStorage.getItem('cheffs_api_key');
  
  if (!apiKey) {
    alert('API key not found');
    return;
  }

  if (getSearchRemaining() <= 0) {
    alert('Search limit reached. Resets in 1 minute.');
    return;
  }

  decrementSearchRemaining();

  const resultsContainer = document.getElementById('cheffs-search-results');
  if (resultsContainer) {
    resultsContainer.innerHTML = '';
    const loadingDiv = document.createElement('div');
    loadingDiv.style.cssText = 'text-align: center; padding: 20px; color: #666;';
    loadingDiv.textContent = 'Searching...';
    resultsContainer.appendChild(loadingDiv);
  }

  try {
    const projects = await searchProjects(query, apiKey);
    const filters = getActiveFilters();
    const filteredResults = filterProjects(projects, query, filters);
    displaySearchResults(filteredResults);
  } catch (error) {
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'background: #ffe6c4; border: 2px solid #ff6b6b; border-radius: 8px; padding: 16px; color: #2c2c2c; font-weight: 600;';
      errorDiv.textContent = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      resultsContainer.appendChild(errorDiv);
    }
  }
}

async function loadSearchTab() {
  if (handleExploreTabRedirect()) {
    return;
  }

  hideExploreContent();

  const cachedApiKey = localStorage.getItem('cheffs_api_key');
  if (cachedApiKey) {
    displaySearchBox(handleSearch);
  } else {
    const apiKey = await fetchAndExtractApiKey();
    if (apiKey) {
      localStorage.setItem('cheffs_api_key', apiKey);
      displaySearchBox(handleSearch);
    } else {
      displayApiKeyError();
    }
  }
}

export default defineContentScript({
  matches: ['https://flavortown.hackclub.com/*'],
  async main() {
    applyRecipieFinderTheme();
    addSearchTabToNav(loadSearchTab);
    modifyExplorePage();

    if (localStorage.getItem('cheffs_auto_load_search') === 'true') {
      localStorage.removeItem('cheffs_auto_load_search');
      setTimeout(() => {
        loadSearchTab();
      }, 100);
    }
  },
});

function defineContentScript(config: any) {
  return config;
}
