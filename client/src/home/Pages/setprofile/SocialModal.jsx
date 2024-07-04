import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SocialModal = ({ show, handleClose, handleSave, social }) => {
  const [socialData, setSocialData] = useState({
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  });

  useEffect(() => {
    if (social) {
      setSocialData(social);
    }
  }, [social]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveClick = () => {
    handleSave(socialData);
    console.log(socialData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Social Media Links</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>YouTube</Form.Label>
            <Form.Control
              type="text"
              name="youtube"
              value={socialData.youtube}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Twitter</Form.Label>
            <Form.Control
              type="text"
              name="twitter"
              value={socialData.twitter}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Facebook</Form.Label>
            <Form.Control
              type="text"
              name="facebook"
              value={socialData.facebook}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>LinkedIn</Form.Label>
            <Form.Control
              type="text"
              name="linkedin"
              value={socialData.linkedin}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Instagram</Form.Label>
            <Form.Control
              type="text"
              name="instagram"
              value={socialData.instagram}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SocialModal;