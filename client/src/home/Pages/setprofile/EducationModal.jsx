import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EducationModal = ({ show, handleClose, handleSave, education }) => {
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldofstudy, setFieldOfStudy] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (education) {
      setSchool(education.school);
      setDegree(education.degree);
      setFieldOfStudy(education.fieldofstudy);
      setFrom(education.from);
      setTo(education.to);
      setCurrent(education.current);
      setDescription(education.description);
    } else {
      setSchool('');
      setDegree('');
      setFieldOfStudy('');
      setFrom('');
      setTo('');
      setCurrent(false);
      setDescription('');
    }
  }, [education]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSave({
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{education ? 'Edit Education' : 'Add Education'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId='formSchool'>
            <Form.Label>School/College</Form.Label>
            <Form.Control
              type='text'
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formDegree'>
            <Form.Label>Degree</Form.Label>
            <Form.Control
              type='text'
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formFieldOfStudy'>
            <Form.Label>Field of Study</Form.Label>
            <Form.Control
              type='text'
              value={fieldofstudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
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
          <Button variant='primary' type='submit'>
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EducationModal;
