import React from 'react';
import './AboutUs.css';

import chrisImg from '../assets/chris.jpg';
import rogerImg from '../assets/rogerimg.jpg';
import vinnieImg from '../assets/vinnie.jpg';
import srikanthImg from '../assets/Srikanth.jpg';

const teamMembers = [
  {
    name: 'Christian Mijangos',
    role: 'Software Engineer',
    description: 'I am a passionate Software Engineering student at Brigham Young University - Idaho, specializing in Software Design and Software Quality Assurance. I am skilled in developing scalable software solutions, automating processes, and creating engaging user experiences.',
    imageUrl: chrisImg, // Replace with actual path to the image
  },
  {
    name: 'Roger Galan',
    role: 'Backend Developer',
    description: 'I am a passionate learner of software development, web, and cloud technologies. I enjoy working on personal projects where I can practice coding in Javascript, C#, and Python. My experience lies in IT customer service and efficient software design. In free time, I enjoy movies, food, and sports with friends.',
    imageUrl: rogerImg, 
  },
  {
    name: 'Vinnie Castro',
    role: 'Cloud Specialist',
    description: 'Im a Software Engineering major at BYU-I, Im from Brazil and a love spending time with friends.',
    imageUrl: vinnieImg,
  },

  {
    name: 'Srikanth Gubbala',
    role: 'AI specialist',
    description: 'skilled Product Manager with expertise in IT, data analytics, and business development, leading cross-functional teams to deliver innovative solutions that align with business goals and improve efficiency.',
    imageUrl: srikanthImg, 
  },

];

const AboutUs = () => {
    return (
      <div className="about-us-page">
        <h2 className="about-us-title">About Us</h2>
        <div className="about-us-team-members">
          {teamMembers.map((member, index) => (
            <div className="about-us-card" key={index}>
              <img src={member.imageUrl} alt={`${member.name}`} className="about-us-card-image" />
              <div className="about-us-card-content">
                <h3>{member.name}</h3>
                <p className="about-us-card-role">{member.role}</p>
                <p className="about-us-card-description">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default AboutUs;