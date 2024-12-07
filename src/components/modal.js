import React, { useEffect, useState,useMemo } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import LeaveType from '../service/leaveType';


function calculateDays(fromDate, toDate) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffInMilliseconds = end - start;
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
  
    return diffInDays;
}

const LeaveModal = React.memo(function LeaveModal({ show, handleClose, handleSave }) {

    const [leaveTypeId, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [comment, setComment] = useState('');
    const [List, setList] = useState([]);

    const daysDifference = useMemo(() => calculateDays(startDate, endDate), [startDate, endDate]);

    const ListTypes = async () => {
        await LeaveType.getTypes().then((res) => {
            if (res.status == 200) {
                setList(res.data)
            } else {
                setList([])
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            leaveTypeId,
            leave: daysDifference,
            leavesDate: startDate,
            leaveeDate: endDate,
            comments: comment,
        };
        handleSave(formData);
        handleClose();
    };

    useEffect(() => {
        ListTypes()
    }, [])

    useEffect(() => {
        setLeaveType("")
        setComment("")
        setStartDate(null)
        setEndDate(null)
    }, [show])
    
    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Form validated onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Leave Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="leaveType">
                        <Form.Label>Leave Type</Form.Label>
                        <Form.Control
                            required
                            as="select"
                            value={leaveTypeId}
                            onChange={(e) => setLeaveType(e.target.value)}
                        >
                            <option value="">Select Leave Type</option>
                            {
                                List?.map((data, index) => <option key={data['_id']} value={data['_id']}>{data['leaveName']}</option>)
                            }

                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            required
                            as="input"
                            type='Date'
                            rows={3}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="endDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            required
                            as="input"
                            type='Date'
                            min={startDate?new Date(startDate).toISOString().slice(0, 10):new Date().toISOString().slice(0, 10)}
                            rows={3}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} type='button'>
                        Cancel
                    </Button>
                    <Button variant="primary" type='submit'>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
});

export default LeaveModal;
