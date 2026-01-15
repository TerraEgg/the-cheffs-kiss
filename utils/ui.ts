export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function displaySearchResults(projects: any[]) {
  const resultsContainer = document.getElementById('cheffs-search-results');
  if (!resultsContainer) return;

  resultsContainer.innerHTML = '';

  if (projects.length === 0) {
    const empty = document.createElement('div');
    empty.style.cssText = 'text-align: center; padding: 20px; color: #666;';
    empty.textContent = 'No projects found.';
    resultsContainer.appendChild(empty);
    return;
  }

  projects.forEach(project => {
    const article = document.createElement('article');
    article.className = 'post post--devlog post--theme-certified';
    article.style.cssText = 'background: white; border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
    
    const content = document.createElement('div');
    content.className = 'post__content';
    
    const header = document.createElement('header');
    header.className = 'post__header';
    
    const meta = document.createElement('div');
    meta.className = 'post__meta';
    
    const author = document.createElement('div');
    author.className = 'post__author';
    author.style.marginBottom = '8px';
    const title = document.createElement('strong');
    title.style.cssText = 'color: #2c2c2c; font-size: 16px;';
    title.textContent = project.title;
    author.appendChild(title);
    
    const time = document.createElement('div');
    time.className = 'post__time';
    time.style.cssText = 'color: #888; font-size: 14px;';
    time.textContent = `Created ${new Date(project.created_at).toLocaleDateString()}`;
    
    meta.appendChild(author);
    meta.appendChild(time);
    header.appendChild(meta);
    
    const body = document.createElement('div');
    body.className = 'post__body';
    body.style.cssText = 'margin: 12px 0; color: #2c2c2c; line-height: 1.5;';
    const desc = document.createElement('p');
    desc.textContent = project.description || 'No description';
    body.appendChild(desc);
    
    const links = document.createElement('div');
    links.style.cssText = 'display: flex; gap: 12px; margin-top: 12px; flex-wrap: wrap;';
    
    if (project.repo_url) {
      const a = document.createElement('a');
      a.href = project.repo_url;
      a.target = '_blank';
      a.style.cssText = 'padding: 8px 12px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;';
      a.textContent = 'Repository';
      links.appendChild(a);
    }
    
    if (project.demo_url) {
      const a = document.createElement('a');
      a.href = project.demo_url;
      a.target = '_blank';
      a.style.cssText = 'padding: 8px 12px; background: #ff8a50; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;';
      a.textContent = 'Demo';
      links.appendChild(a);
    }
    
    if (project.readme_url) {
      const a = document.createElement('a');
      a.href = project.readme_url;
      a.target = '_blank';
      a.style.cssText = 'padding: 8px 12px; background: #ffc26d; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;';
      a.textContent = 'Readme';
      links.appendChild(a);
    }
    
    const view = document.createElement('a');
    view.href = `https://flavortown.hackclub.com/projects/${project.id}`;
    view.target = '_blank';
    view.style.cssText = 'padding: 8px 12px; background: #6bafff; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;';
    view.textContent = 'View';
    links.appendChild(view);
    
    content.appendChild(header);
    content.appendChild(body);
    content.appendChild(links);
    article.appendChild(content);
    resultsContainer.appendChild(article);
  });
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
  
  searchContainer.innerHTML = '';
  
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'padding: 20px; margin: 0; background: none; border: none;';
  
  const controls = document.createElement('div');
  controls.style.cssText = 'max-width: 1200px; margin: 0 auto; padding: 0 40px; display: flex; gap: 8px; align-items: center;';
  
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'cheffs-search-input';
  searchInput.placeholder = 'Search for projects...';
  searchInput.style.cssText = 'flex: 1; padding: 12px; border: 1.5px solid #ff6b6b; border-radius: 8px; font-size: 16px; box-sizing: border-box; background: white; outline: none;';
  
  const searchBtn = document.createElement('button');
  searchBtn.id = 'cheffs-search-btn';
  searchBtn.style.cssText = 'background: linear-gradient(90deg, #ff6b6b, #ff8a50); color: white; border: none; border-radius: 8px; padding: 12px 24px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; height: 46px; display: flex; align-items: center;';
  searchBtn.textContent = 'Search';
  
  const filtersToggle = document.createElement('button');
  filtersToggle.id = 'cheffs-filters-toggle';
  filtersToggle.style.cssText = 'background: #f0f0f0; color: #2c2c2c; border: 1.5px solid #ddd; border-radius: 8px; padding: 12px 16px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; height: 46px; display: flex; align-items: center; white-space: nowrap;';
  filtersToggle.textContent = 'Filters';
  
  controls.appendChild(searchInput);
  controls.appendChild(searchBtn);
  controls.appendChild(filtersToggle);
  
  const filtersContainer = document.createElement('div');
  filtersContainer.id = 'cheffs-search-filters';
  filtersContainer.style.cssText = 'margin-top: 12px; margin-left: 70px; display: none; gap: 16px; flex-wrap: wrap; padding: 12px 0;';
  
  const filterLabels = [
    { id: 'cheffs-filter-github', text: 'Has GitHub' },
    { id: 'cheffs-filter-readme', text: 'Has README' },
    { id: 'cheffs-filter-demo', text: 'Has Demo' },
    { id: 'cheffs-filter-description', text: 'Has Description' },
  ];
  
  filterLabels.forEach(({ id, text }) => {
    const label = document.createElement('label');
    label.style.cssText = 'display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px; color: #2c2c2c;';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.style.cssText = 'cursor: pointer; width: 16px; height: 16px;';
    
    const span = document.createElement('span');
    span.textContent = text;
    
    label.appendChild(checkbox);
    label.appendChild(span);
    filtersContainer.appendChild(label);
  });
  
  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'cheffs-search-results';
  resultsContainer.style.cssText = 'margin-top: 16px; margin-left: 70px;';
  
  wrapper.appendChild(controls);
  wrapper.appendChild(filtersContainer);
  wrapper.appendChild(resultsContainer);
  searchContainer.appendChild(wrapper);
  searchContainer.style.display = '';

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) onSearch(query);
    }
  });
  searchInput.focus();

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) onSearch(query);
  });

  filtersToggle.addEventListener('click', () => {
    const isHidden = filtersContainer.style.display === 'none';
    filtersContainer.style.display = isHidden ? 'flex' : 'none';
    filtersToggle.style.background = isHidden ? '#ffebee' : '#f0f0f0';
    filtersToggle.style.borderColor = isHidden ? '#ff6b6b' : '#ddd';
  });
}

export function displayApiKeyError() {
  let errorContainer = document.getElementById('cheffs-search-container');
  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.id = 'cheffs-search-container';
  }
  
  errorContainer.innerHTML = '';
  
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'padding: 20px; margin: 0; background: none; border: none;';
  
  const inner = document.createElement('div');
  inner.style.cssText = 'max-width: 1200px; margin: 0 auto; padding: 0 20px;';
  
  const message = document.createElement('div');
  message.style.cssText = 'background: #ffe6c4; border: 2px solid #ff6b6b; border-radius: 8px; padding: 16px; text-align: center; color: #2c2c2c; font-weight: 600;';
  message.textContent = 'Please generate your API key';
  
  inner.appendChild(message);
  wrapper.appendChild(inner);
  errorContainer.appendChild(wrapper);
  
  const footer = document.querySelector('.dev-footer');
  if (footer && footer.parentNode) {
    footer.parentNode.insertBefore(errorContainer, footer);
  } else {
    document.body.appendChild(errorContainer);
  }
}
