// src/App.js

import React, { useEffect, useState } from 'react';
import JobList from './components/JobList';
import Filters from './components/Filters';
import './App.css';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    role: [],
    technology: [],
    experience: [],
    ctc: 10,
    filterBackgroundImage: '',
  });
  const [selectedFilters, setSelectedFilters] = useState({
    role: [],
    technology: [],
    experience: '',
    ctc: 10,
  });
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    fetch('https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1710/data.json')
      .then(response => response.json())
      .then(data => {
        setJobs(data.data);
        setFilteredJobs(data.data);

        // Extract filter options from data
        const roles = data.role;
        const technologies = data.technology;
        const experiences = data.experience;
        const filterBackgroundImage = data.filterBackgroundImage;

        setFilters(prevFilters => ({
          ...prevFilters,
          role: roles,
          technology: technologies,
          experience: experiences,
          filterBackgroundImage,
        }));
      })
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prevSelectedFilters => ({
      ...prevSelectedFilters,
      [filterName]: value
    }));
  };

  useEffect(() => {
    let updatedJobs = jobs;

    if (selectedFilters.role.length > 0) {
      updatedJobs = updatedJobs.filter(job => selectedFilters.role.includes(job.role));
    }

    if (selectedFilters.technology.length > 0) {
      updatedJobs = updatedJobs.filter(job => job.technology.some(tech => selectedFilters.technology.includes(tech)));
    }

    if (selectedFilters.experience) {
      updatedJobs = updatedJobs.filter(job => selectedFilters.experience === job.experience);
    }

    if (selectedFilters.ctc > 0) {
      updatedJobs = updatedJobs.filter(job => job.ctc <= selectedFilters.ctc);
    }

    setFilteredJobs(updatedJobs);
  }, [selectedFilters, jobs]);

  return (
    <div className="App">
      <Filters filters={filters} selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
      <JobList jobs={filteredJobs} />
    </div>
  );
};

export default App;
