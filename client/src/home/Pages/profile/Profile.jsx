import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import { FaYoutube, FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProfileRightBar from "./ProfileRightBar";
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getprofile`, {
           withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserDetails();
  }, []);


  const socialIcons = [
    { name: 'youtube', icon: FaYoutube },
    { name: 'twitter', icon: FaTwitter },
    { name: 'facebook', icon: FaFacebook },
    { name: 'linkedin', icon: FaLinkedin },
    { name: 'instagram', icon: FaInstagram },
  ];
  

  return (
    <Container className="profile-container">
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <div className="position-relative">
              <Image 
                src={user.coverPicture || "assets/avatar.svg"}
                alt="Cover"
                className="w-100 profile-cover"
              />
              <Image
                src={user.profilePicture || "assets/avatar.svg"}
                alt="User"
                className="position-absolute profile-picture"
                style={{
                  bottom: '-75px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
                roundedCircle
              />
            </div>
            {/* <Card.Body className="text-center pt-5 mt-4">
              <h2>{user.name}</h2>
            </Card.Body> */}
       

          <Card.Body className="text-center pt-5 mt-4">
              <h1 className="username">{user.name}</h1>
              <div className="social-icons-container">
              <div className="social-icons">
                {socialIcons.map((social) => (
                  user.social && (
                    <Link 
                        to={user.social[social.name]} 
                        key={social.name}
                    >
                      <social.icon className="social-icon" />
                    </Link>
                  )
                ))}
              </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3 text">User Information</h5>
              <Row>
                <Col md={6}>
                  <p><span className="info-label">City:</span> <span className="info-value">{user.city || "N/A"}</span></p>
                  <p><span className="info-label">Country:</span> <span className="info-value">{user.country || "N/A"}</span></p>
                  <p><span className="info-label">State:</span> <span className="info-value">{user.state || "N/A"}</span></p>
                  <p><span className="info-label">Graduation Year:</span> <span className="info-value">{user.gradyear || "N/A"}</span></p>
                </Col>
                <Col md={6}>
                  <p><span className="info-label">Degree:</span> <span className="info-value">{user.degree || "N/A"}</span></p>
                  <p><span className="info-label">Branch:</span> <span className="info-value">{user.branch || "N/A"}</span></p>
                  <p><span className="info-label">Interests:</span> <span className="info-value">{user.interests || "N/A"}</span></p>
                  <p><span className="info-label">Skills:</span> <span className="info-value">{user.skills || "N/A"}</span></p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-4">
  <Card.Body>
    <h5 className="mb-3 text">Education</h5>
    <Row className="education-row">
      {user.education && user.education.length > 0 ? (
        user.education.map((edu, index) => (
          <Col md={6} key={index} className="mb-3">
            <Card className="education-card h-100">
              <Card.Body>
                <h6>{edu.school}</h6>
                <p className="mb-1"><span className="info-label">Degree:</span> <span className="info-value">{edu.degree}</span></p>
                <p className="mb-1"><span className="info-label">Field of Study:</span> <span className="info-value">{edu.fieldofstudy}</span></p>
                <p className="mb-1"><span className="info-label">From:</span> <span className="info-value">{new Date(edu.start).toLocaleDateString()}</span></p>
                <p className="mb-1"><span className="info-label">To:</span> <span className="info-value">{edu.current ? "Present" : new Date(edu.end).toLocaleDateString()}</span></p>
                <p className="mb-0"><span className="info-label">Description:</span> <span className="info-value">{edu.description}</span></p>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Col>
          <p className="noinfo">No education information available.</p>
        </Col>
      )}
    </Row>
  </Card.Body>
</Card>

<Card className="mb-4">
  <Card.Body>
    <h5 className="mb-3 text">Experience</h5>
    <Row className="experience-row">
      {user.experience && user.experience.length > 0 ? (
        user.experience.map((exp, index) => (
          <Col md={6} key={index} className="mb-3">
            <Card className="experience-card h-100">
              <Card.Body>
                <h6>{exp.title}</h6>
                <p className="mb-1"><span className="info-label">Company:</span> <span className="info-value">{exp.company}</span></p>
                <p className="mb-1"><span className="info-label">Location:</span> <span className="info-value">{exp.location}</span></p>
                <p className="mb-1"><span className="info-label">From:</span> <span className="info-value">{new Date(exp.start).toLocaleDateString()}</span></p>
                <p className="mb-1"><span className="info-label">To:</span> <span className="info-value">{exp.current ? "Present" : new Date(exp.end).toLocaleDateString()}</span></p>
                <p className="mb-0"><span className="info-label">Description:</span> <span className="info-value">{exp.description}</span></p>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Col>
          <p className="noinfo">No experience information available.</p>
        </Col>
      )}
    </Row>
  </Card.Body>
</Card>
        </Col>
        <Col lg={4}>
          <ProfileRightBar />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;