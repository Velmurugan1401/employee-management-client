import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import LeaveType from '../service/leaveType';
import EmployeeApi from '../service/employeeapi';


const LeaveModal = React.memo(function LeaveModal({ show, handleClose, handleSave }) {

    const [leaveTypeId, setLeaveType] = useState('');
    const [employeeId, setemployeeId] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [comment, setComment] = useState('');

    const [List, setList] = useState([]);
    const [Employees, setemployee] = useState([]);

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
    const ListEmployee = async () => {
        await EmployeeApi.getemployee().then((res) => {
            if (res.status == 200) {
                setemployee(res.data)
            } else {
                setemployee([])
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    function calculateDays(fromDate, toDate) {
        const start = new Date(fromDate);
        const end = new Date(toDate);
        const diffInMilliseconds = end - start;
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
        
        return diffInDays;
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            leaveTypeId,
            leave:calculateDays(startDate,endDate),
            employeeId,
            leavesDate:startDate,
            leaveeDate:endDate,
            comments:comment,
        };
        handleSave(formData);
        handleClose();
    };

    useEffect(() => {
        ListTypes()
        ListEmployee()
    }, [])

    useEffect(() => {
        setLeaveType("")
        setComment("")
        setStartDate(null)
        setEndDate(null)
        setemployeeId("")
    }, [show])
    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Form validated onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Leave Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                    <Form.Group className="mb-3" controlId="leaveType">
                        <Form.Label>Select Employee</Form.Label>
                        <Form.Control
                            required={true}
                            as="select"
                            value={employeeId}
                            onChange={(e) => setemployeeId(e.target.value)}
                        >
                            <option value="">Select Leave Type</option>
                            {
                                Employees?.map((data, index) => <option value={data['_id']}>{data['employeeName']}</option>)
                            }

                        </Form.Control>
                    </Form.Group>
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
                                List?.map((data, index) => <option value={data['_id']}>{data['leaveName']}</option>)
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
