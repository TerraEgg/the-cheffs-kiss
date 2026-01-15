export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function displaySearchResults(projects: any[]) {
  const resultsContainer = document.getElementById('cheffs-search-results');
  if (!resultsContainer) return;

  if (projects.length === 0) {
    resultsContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">No projects found.</div>';
    return;
  }

  resultsContainer.innerHTML = projects.map(project => `
    <article class="post post--devlog post--theme-certified" style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div class="post__content">
        <header class="post__header">
          <div class="post__meta">
            <div class="post__author" style="margin-bottom: 8px;">
              <strong style="color: #2c2c2c; font-size: 16px;">${escapeHtml(project.title)}</strong>
            </div>
            <div class="post__time" style="color: #888; font-size: 14px;">Created ${new Date(project.created_at).toLocaleDateString()}</div>
          </div>
        </header>
        <div class="post__body" style="margin: 12px 0; color: #2c2c2c; line-height: 1.5;">
          <p>${escapeHtml(project.description || 'No description')}</p>
        </div>
        <div style="display: flex; gap: 12px; margin-top: 12px; flex-wrap: wrap;">
          ${project.repo_url ? `<a href="${project.repo_url}" target="_blank" style="padding: 8px 12px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">Repository</a>` : ''}
          ${project.demo_url ? `<a href="${project.demo_url}" target="_blank" style="padding: 8px 12px; background: #ff8a50; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">Demo</a>` : ''}
          ${project.readme_url ? `<a href="${project.readme_url}" target="_blank" style="padding: 8px 12px; background: #ffc26d; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">Readme</a>` : ''}
          <a href="https://flavortown.hackclub.com/projects/${project.id}" target="_blank" style="padding: 8px 12px; background: #6bafff; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">View</a>
        </div>
      </div>
    </article>
  `).join('');
}

export function displaySearchBox(onSearch: (query: string) => void) {
  let searchContainer = document.getElementById('cheffs-search-container');
  if (!searchContainer) {
    searchContainer = document.createElement('div');
    searchContainer.id = 'cheffs-search-container';
    
    const footer = document.querySelector('.dev-footer');
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(searchContainer, footer);
    } else {
      document.body.appendChild(searchContainer);
    }
  }
  
  searchContainer.innerHTML = `<div style="padding: 20px; margin: 0; background: none; border: none;">
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 40px; display: flex; gap: 8px; align-items: center;">
      <input type="text" id="cheffs-search-input" placeholder="Search for projects..." style="flex: 1; padding: 12px; border: 1.5px solid #ff6b6b; border-radius: 8px; font-size: 16px; box-sizing: border-box; background: white; outline: none;">
      <button id="cheffs-search-btn" style="background: linear-gradient(90deg, #ff6b6b, #ff8a50); color: white; border: none; border-radius: 8px; padding: 12px 24px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; height: 46px; display: flex; align-items: center;">Search</button>
      <button id="cheffs-filters-toggle" style="background: #f0f0f0; color: #2c2c2c; border: 1.5px solid #ddd; border-radius: 8px; padding: 12px 16px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; height: 46px; display: flex; align-items: center; white-space: nowrap;">Filters</button>
    </div>
    <div id="cheffs-search-filters" style="margin-top: 12px; margin-left: 70px; display: none; gap: 16px; flex-wrap: wrap; padding: 12px 0;">
      <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px; color: #2c2c2c;">
        <input type="checkbox" id="cheffs-filter-github" style="cursor: pointer; width: 16px; height: 16px;">
        <span>Has GitHub</span>
      </label>
      <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px; color: #2c2c2c;">
        <input type="checkbox" id="cheffs-filter-readme" style="cursor: pointer; width: 16px; height: 16px;">
        <span>Has README</span>
      </label>
      <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px; color: #2c2c2c;">
        <input type="checkbox" id="cheffs-filter-demo" style="cursor: pointer; width: 16px; height: 16px;">
        <span>Has Demo</span>
      </label>
      <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px; color: #2c2c2c;">
        <input type="checkbox" id="cheffs-filter-description" style="cursor: pointer; width: 16px; height: 16px;">
        <span>Has Description</span>
      </label>
    </div>
    <div id="cheffs-search-results" style="margin-top: 16px; margin-left: 70px;"></div>
  </div>`;

  searchContainer.style.display = '';

  const searchInput = document.getElementById('cheffs-search-input') as HTMLInputElement;
  const searchBtn = document.getElementById('cheffs-search-btn') as HTMLButtonElement;
  const filtersToggle = document.getElementById('cheffs-filters-toggle') as HTMLButtonElement;
  const filtersContainer = document.getElementById('cheffs-search-filters') as HTMLElement;

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) onSearch(query);
      }
    });
    searchInput.focus();
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) onSearch(query);
    });
  }

  if (filtersToggle) {
    filtersToggle.addEventListener('click', () => {
      if (filtersContainer) {
        const isHidden = filtersContainer.style.display === 'none';
        filtersContainer.style.display = isHidden ? 'flex' : 'none';
        filtersToggle.style.background = isHidden ? '#ffebee' : '#f0f0f0';
        filtersToggle.style.borderColor = isHidden ? '#ff6b6b' : '#ddd';
      }
    });
  }
}

export function displayApiKeyError() {
  let errorContainer = document.getElementById('cheffs-search-container');
  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.id = 'cheffs-search-container';
  }
  
  errorContainer.innerHTML = `<div style="padding: 20px; margin: 0; background: none; border: none;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
    <div style="background: #ffe6c4; border: 2px solid #ff6b6b; border-radius: 8px; padding: 16px; text-align: center; color: #2c2c2c; font-weight: 600;">
      Please generate your API key
    </div>
  </div>
</div>`;
  
  const footer = document.querySelector('.dev-footer');
  if (footer && footer.parentNode) {
    footer.parentNode.insertBefore(errorContainer, footer);
  } else {
    document.body.appendChild(errorContainer);
  }
}
