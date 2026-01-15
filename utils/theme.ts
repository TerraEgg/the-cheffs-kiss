export function applyRecipieFinderTheme() {
  const settingsModal = document.getElementById('settings-modal');
  if (!settingsModal) return;

  if (!document.querySelector('link[href*="fontawesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }

  const style = document.createElement('style');
  style.textContent = `
    #settings-modal {
      background: linear-gradient(135deg, #ffd89b 0%, #ffe6c4 100%) !important;
      border: 3px solid #ff6b6b !important;
      border-radius: 16px !important;
      box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3) !important;
    }

    #settings-modal .modal__title {
      background: linear-gradient(90deg, #ff6b6b, #ff8a50) !important;
      color: white !important;
      padding: 16px !important;
      border-radius: 12px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important;
      margin: 0 !important;
    }

    #settings-modal .settings-form {
      padding: 24px !important;
    }

    #settings-modal .settings-form__field {
      margin-bottom: 20px !important;
    }

    #settings-modal .settings-form__label {
      color: #2c2c2c !important;
      font-weight: 600 !important;
      font-size: 14px !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
    }

    #settings-modal .settings-form__input,
    #settings-modal .settings-form__checkbox input {
      border: 2px solid #ff6b6b !important;
      border-radius: 8px !important;
      padding: 10px 12px !important;
      background: white !important;
      color: #2c2c2c !important;
      transition: all 0.3s ease !important;
    }

    #settings-modal .settings-form__input:focus,
    #settings-modal .settings-form__checkbox input:focus {
      outline: none !important;
      border-color: #ff8a50 !important;
      box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1) !important;
      transform: scale(1.02) !important;
    }

    #settings-modal .settings-form__checkbox {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      cursor: pointer !important;
    }

    #settings-modal .settings-form__checkbox input {
      width: 18px !important;
      height: 18px !important;
      cursor: pointer !important;
      accent-color: #ff6b6b !important;
    }

    #settings-modal .settings-form__checkbox span {
      color: #2c2c2c !important;
      font-weight: 500 !important;
    }

    #settings-modal .settings-form__hint {
      color: #666 !important;
      font-size: 12px !important;
      margin-top: 6px !important;
      display: block !important;
    }

    #settings-modal .api-key-section {
      background: rgba(255, 255, 255, 0.7) !important;
      padding: 20px !important;
      border-radius: 12px !important;
      margin: 20px 0 !important;
      border: 2px dashed #ff6b6b !important;
    }

    #settings-modal .api-key-display {
      background: #f0f0f0 !important;
      padding: 12px !important;
      border-radius: 8px !important;
      font-family: 'Courier New', monospace !important;
      font-size: 12px !important;
      word-break: break-all !important;
      border: 1px solid #ddd !important;
    }

    #settings-modal .modal__actions {
      display: flex !important;
      gap: 12px !important;
      justify-content: flex-end !important;
      margin-top: 20px !important;
      padding-top: 20px !important;
      border-top: 2px solid rgba(255, 107, 107, 0.2) !important;
    }

    #settings-modal .modal__actions-close {
      padding: 10px 20px !important;
      border: none !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
    }

    #settings-modal input[type="submit"].modal__actions-close {
      background: linear-gradient(90deg, #ff6b6b, #ff8a50) !important;
      color: white !important;
    }

    #settings-modal input[type="submit"].modal__actions-close:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3) !important;
    }

    #settings-modal button.modal__actions-close {
      background: #e9ecef !important;
      color: #2c2c2c !important;
    }

    #settings-modal button.modal__actions-close:hover {
      background: #dee2e6 !important;
      transform: translateY(-2px) !important;
    }

    .recipie-finder-footer {
      text-align: center !important;
      padding: 12px !important;
      margin-top: 12px !important;
      border-top: 2px solid rgba(255, 107, 107, 0.1) !important;
      font-size: 11px !important;
      color: #ff6b6b !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 1.5px !important;
      background: rgba(255, 107, 107, 0.05) !important;
      border-radius: 0 0 12px 12px !important;
    }
  `;

  document.head.appendChild(style);

  let footer = document.querySelector('.recipie-finder-footer');
  if (!footer) {
    footer = document.createElement('div');
    footer.className = 'recipie-finder-footer';
    footer.textContent = 'Recipie Finder v0.0.1';
    settingsModal.appendChild(footer);
  }

  const apiSection = settingsModal.querySelector('.api-key-section');
  if (apiSection && !apiSection.querySelector('svg')) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', '#ff6b6b');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('style', 'margin-right: 8px; vertical-align: middle;');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M12 2L15.09 8.26H22L17.55 12.37L19.64 18.63L12 14.52L4.36 18.63L6.45 12.37L2 8.26H8.91L12 2Z');

    svg.appendChild(path1);
  }
}
