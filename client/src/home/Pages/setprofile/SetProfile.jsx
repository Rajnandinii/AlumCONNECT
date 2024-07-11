import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import EducationModal from './EducationModal';
import ExperienceModal from './ExperienceModal';
import SocialModal from './SocialModal';
import './setProfile.css'

const SetProfile = () => {
  const token = localStorage.getItem('token');

  const [educationModalShow, setEducationModalShow] = useState(false);
  const [experienceModalShow, setExperienceModalShow] = useState(false);
  const [socialModalShow, setSocialModalShow] = useState(false);
  const [educationIndex, setEducationIndex] = useState(null);
  const [experienceIndex, setExperienceIndex] = useState(null);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [socialLinks, setSocialLinks] = useState({
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  });

  const handleEducationModalClose = () => {
    setEducationModalShow(false);
    setEducationIndex(null);
  };

  const handleEducationModalShow = (index) => {
    setEducationIndex(index);
    setEducationModalShow(true);
  };

  const handleExperienceModalClose = () => {
    setExperienceModalShow(false);
    setExperienceIndex(null);
  };

  const handleExperienceModalShow = (index) => {
    setExperienceIndex(index);
    setExperienceModalShow(true);
  };

  const handleEducationSave = (education) => {
    if (educationIndex !== null) {
      const updatedEducations = [...educations];
      updatedEducations[educationIndex] = education;
      setEducations(updatedEducations);
    } else {
      setEducations([...educations, education]);
    }
    handleEducationModalClose();
  };

  const handleExperienceSave = (experience) => {
    if (experienceIndex !== null) {
      const updatedExperiences = [...experiences];
      updatedExperiences[experienceIndex] = experience;
      setExperiences(updatedExperiences);
    } else {
      setExperiences([...experiences, experience]);
    }
    handleExperienceModalClose();
  };

  const handleSocialModalClose = () => {
    setSocialModalShow(false);
  };

  const handleSocialModalShow = () => {
    setSocialModalShow(true);
  };

  const handleSocialSave = (socialData) => {
    setSocialLinks(socialData);
    handleSocialModalClose();
  };

  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [interests, setInterests] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [skills, setSkills] = useState('');


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getprofile`, {
          withCredentials: true
        });
        const { data } = response;
        console.log(data)
        
        setProfileImg(data.user.profileImg);
        setCoverImg(data.user.coverImg);
        setInterests(data.user.interests);
        setCountry(data.user.country);
        setState(data.user.state);
        setCity(data.user.city);
        setSkills(data.user.skills);
        setEducations(data.user.educations|| []);
        setExperiences(data.user.experiences || []);
        setSocialLinks(data.user.socialLinks || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, [token]);

  const handleSubmit = (e) => {

    const formData = new FormData();
  
  // Append file fields
  if (profileImg) formData.append('profileImg', profileImg);
  if (coverImg) formData.append('coverImg', coverImg);
  
  // Append other fields
  formData.append('interests', interests);
  formData.append('skills', skills);
  formData.append('country', country);
  formData.append('state', state);
  formData.append('city', city);
  formData.append('educations', JSON.stringify(educations));
  formData.append('experiences', JSON.stringify(experiences));
  formData.append('socialLinks', JSON.stringify(socialLinks));

  axios.post(`${import.meta.env.VITE_SERVER_URL}/api/setprofile`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
      .then(response => {
        if (response.data.status) {
          console.log('will navigate to home');
          navigate('/profile')
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="setprofile-container">
   
      <div className="setprofile-content">
      <h2 className='label heading'>Edit Your Profile Details</h2>
      <label className='label'>Country</label>
      <input className='form-control mb-3' type="text"  value={country}
        onChange={(e) => { setCountry(e.target.value) }}
      />
      <label className='label'>State</label>
      <input className='form-control mb-3' type="text" value={state}
        onChange={(e) => { setState(e.target.value) }}
      />
      <label className='label'>City</label>
      <input className='form-control mb-3' type="text" value={city}
        onChange={(e) => { setCity(e.target.value) }}
      />
      <label className='label'>Skills</label>
      <input className='form-control mb-3' type="text" value={skills}
        onChange={(e) => { setSkills(e.target.value) }}
      />
      <label className='label'>Interests</label>
      <input className='form-control mb-3' type="text" value={interests}
        onChange={(e) => { setInterests(e.target.value) }}
      />
      <label className='label'>Education</label>
      <div className='education '>
        {educations && educations.map((education, index) => (
          <div key={index} className='mb-2'>
          <Button variant='secondary' onClick={() => handleEducationModalShow(index)}>
                Edit Education {index + 1}
              </Button>
          </div>
        ))}
        {/* { educations.length < 3 && ( */}
            <Button variant='primary' onClick={() => handleEducationModalShow(null)}>
              Add Education
            </Button>
          {/* )} */}
        <EducationModal
          show={educationModalShow}
          handleClose={handleEducationModalClose}
          handleSave={handleEducationSave}
          education={educationIndex !== null ? educations[educationIndex] : null}
        />
      </div>
      <label className='label'>Experience</label>
      <div className='experience'>
        {experiences && experiences.map((experience, index) => (
          <div key={index} className='mb-2'>
          <Button variant='secondary' onClick={() => handleExperienceModalShow(index)}>
                Edit Experience {index + 1}
              </Button>
          </div>
        ))}
        
            <Button variant='primary' onClick={() => handleExperienceModalShow(null)}>
              Add Experience
            </Button>
         
        <ExperienceModal
          show={experienceModalShow}
          handleClose={handleExperienceModalClose}
          handleSave={handleExperienceSave}
          experience={experienceIndex !== null ? experiences[experienceIndex] : null}
        />
      </div>
      <div className='mb-2'>
      <label className='label'>Social Media Links</label>
      <div>
      <Button variant='primary' onClick={handleSocialModalShow}>
        Update Your Socials
      </Button>
      <SocialModal
        show={socialModalShow}
        handleClose={handleSocialModalClose}
        handleSave={handleSocialSave}
        social={socialLinks}
      />
      </div>
        <div>
      <label className='label'>Upload Profile Picture</label>
      <input className='form-control mb-3' name="profileImg" type="file" onChange={(e) => setProfileImg(e.target.files[0])} />
      </div>
    
      <label className='label'>Upload Cover Picture</label>
      <input className='form-control mb-3' name="coverImg" type="file" onChange={(e) => setCoverImg(e.target.files[0])} />
      <button onClick={handleSubmit} className='btn btn-primary my-3'>Submit</button>
      </div>
    </div>
   </div>
  )
}

export default SetProfile;
