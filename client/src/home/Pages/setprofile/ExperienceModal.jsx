import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const ExperienceModal = ({ show, handleClose, handleSave, experience }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (experience) {
      setTitle(experience.title);
      setCompany(experience.company);
      setLocation(experience.location);
      setFrom(experience.from);
      setTo(experience.to);
      setCurrent(experience.current);
      setDescription(experience.description);
    } else {
      setTitle('');
      setCompany('');
      setLocation('');
      setFrom('');
      setTo('');
      setCurrent(false);
      setDescription('');
    }
  }, [experience]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSave({
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{experience ? 'Edit Experience' : 'Add Experience'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId='formTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formCompany'>
            <Form.Label>Company</Form.Label>
            <Form.Control
              type='text'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formLocation'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formFrom'>
            <Form.Label>From</Form.Label>
            <Form.Control
              type='date'
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formTo'>
            <Form.Label>To</Form.Label>
            <Form.Control
              type='date'
              value={to}
              onChange={(e) => setTo(e.target.value)}
              disabled={current}
            />
          </Form.Group>
          <Form.Group controlId='formCurrent'>
            <Form.Check
              type='checkbox'
              label='Current'
              checked={current}
              onChange={(e) => setCurrent(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId='formDescription'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExperienceModal;
