// src/components/Filters.js

import React from 'react';
import './Filters.css';  // Import the CSS for Filters

const Filters = ({ filters, selectedFilters, onFilterChange }) => {

  const handleCheckboxChange = (event, filterName) => {
    const { value, checked } = event.target;
    if (checked) {
      onFilterChange(filterName, [...selectedFilters[filterName], value]);
    } else {
      onFilterChange(filterName, selectedFilters[filterName].filter(item => item !== value));
    }
  };

  const handleSingleSelectChange = (event, filterName) => {
    onFilterChange(filterName, event.target.value);
  };

  const handleSliderChange = (event) => {
    onFilterChange('ctc', event.target.value);
  };

  return (
    <div className="filters" style={{ backgroundImage: `url(${filters.filterBackgroundImage})` }}>
      <div className="filter">
        <div id='role-filter'>
        <label htmlFor="role-filter">Job Role</label>
        <div className="dropdown">
          <button className="dropdown-button">Select Roles</button>
          <div className="dropdown-content">
            {filters.role.map(role => (
              <label key={role}>
                <input
                  type="checkbox"
                  value={role}
                  checked={selectedFilters.role.includes(role)}
                  onChange={(event) => handleCheckboxChange(event, 'role')}
                />
                {role}
              </label>
            ))}
          </div>
        </div>
        </div>
      </div>
      <div className="filter">
      <div id='technology-filter'>
        <label htmlFor="technology-filter">Technology</label>
        <div className="dropdown">
          <button className="dropdown-button">Select Technologies</button>
          <div className="dropdown-content">
            {filters.technology.map(tech => (
              <label key={tech}>
                <input
                  type="checkbox"
                  value={tech}
                  checked={selectedFilters.technology.includes(tech)}
                  onChange={(event) => handleCheckboxChange(event, 'technology')}
                />
                {tech}
              </label>
            ))}
          </div>
        </div>
        </div>
      </div>
      <div className="filter">

        <label htmlFor="experience-filter">Experience</label>
        <select id="experience-filter" onChange={(event) => handleSingleSelectChange(event, 'experience')}>
          {filters.experience.map(exp => <option key={exp} value={exp}>{exp}</option>)}
        </select>
      </div>
      <div className="filter">
        <label htmlFor="ctc-filter">CTC (in LPA)</label>
        <input type="range" id="ctc-filter" min="0" max="50" step="1" value={selectedFilters.ctc} onChange={handleSliderChange} />
        <div className="ctc-range">
          <span>MIN:0 </span>
          <span>{selectedFilters.ctc} LPA</span>
          <span>MAX:50 </span>
        </div>
      </div>
    </div>
  );
};

export default Filters;
