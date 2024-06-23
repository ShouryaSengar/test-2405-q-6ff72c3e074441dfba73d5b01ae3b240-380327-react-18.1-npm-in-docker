// src/components/JobList.js

import React from 'react';
import './JobList.css';  // Import the CSS for JobList

const JobList = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className={`job-list-${job.id}`}>
          <img src={job.logo} alt={job.company} className="job-logo" />
          <div className="job-details">
            <h3>{job.company}</h3>
            <p><strong>{job.position}</strong></p>
            <p>{job.experience} | {job.contract} | {job.location}</p>
            <div className="technologies">
            <p className="tech-badge">{job.role} </p>
              {job.technology.map((tech, index) => (
                <span key={index} className="tech-badge">{tech}</span>
              ))} 
              <p className="tech-badge">{job.ctc} LPA</p>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
