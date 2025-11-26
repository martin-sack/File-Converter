import React from 'react';

interface SettingsProps {
  onBack: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, theme, setTheme }) => {
  return (
    <div className="converter-view">
      <button onClick={onBack} className="back-btn">← Back</button>
      <h2>Settings</h2>
      
      <div className="form-group">
        <label>Theme</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="form-group">
        <label>About</label>
        <p>Universal File Converter v1.0.0</p>
        <p>A production-ready desktop application for file conversions</p>
      </div>
    </div>
  );
};

export default Settings;
