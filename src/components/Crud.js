import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../CSS/Crud.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const Crud = () => {
  const [data, setData] = useState([]);
  console.log(data);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(0);
  console.log("isActive", isActive);

  const [editid, setEditId] = useState();
  const [editname, setEditName] = useState("");
  const [editage, setEditAge] = useState("");
  const [editisActive, setEditIsActive] = useState(0);
  console.log("editisActive", editisActive);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("https://localhost:7059/api/Employee").then((result) => {
      setData(result.data);
    });
  };

  const handleEdit = (item) => {
    handleShow();
    setEditName(item.name);
    setEditAge(item.age);
    setEditIsActive(item.isActive);
    setEditId(item.id);
    //return "Edited Successfully";
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this employee") == true) {
      axios
        .delete(`https://localhost:7059/api/Employee/${id}`)
        .then((result) => {
          if (result.status == 200) {
            getData();
            return "Deleted Successfully";
          }
        });
    }
  };

  const handelCheck = (e) => {
    console.log("hi");
    if (e.target.checked) {
      setIsActive(1);
    } else {
      setIsActive(0);
    }
  };
  const handelCheckEdit = (e) => {
    if (e.target.checked) {
      setEditIsActive(1);
    } else {
      setEditIsActive(0);
    }
  };

  const onSubmit = () => {
    const data = {
      name: name,
      age: age,
      isActive: isActive,
    };

    axios.post("https://localhost:7059/api/Employee", data).then((result) => {
      getData();
      onClear();
    });
  };

  const onClear = () => {
    setName("");
    setAge("");
    setIsActive(0);
  };

  const handleUpdate = () => {
    const data = {
      id: editid,
      name: editname,
      age: editage,
      isActive: editisActive,
    };
    console.log("");
    axios
      .put(`https://localhost:7059/api/Employee/${editid}`, data)
      .then((result) => {
        getData();
        onClear();
        setShow(false);
        return "Edited Successfully";
      });
  };

  return (
    <Fragment>
      <Container className="custom-container">
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            ></input>
          </Col>
          <Col>
            <input
              type="checkbox"
              checked={isActive === 1 ? true : false}
              onChange={(e) => handelCheck(e)}
              value={isActive}
            ></input>
            &nbsp;
            <label>isActive</label>
          </Col>
          <Col>
            <Button variant="success" onClick={onSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
      <br />

      <Table className="custom-table" striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>isActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={1}>
                      <Button
                        variant="primary"
                        className="mr-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>{" "}
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            : "Loading...."}
        </tbody>
      </Table>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-container">
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={editname}
                onChange={(e) => setEditName(e.target.value)}
              ></input>
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                value={editage}
                onChange={(e) => setEditAge(e.target.value)}
              ></input>
            </Col>
            <Col>
              <input
                type="checkbox"
                checked={editisActive === 1 ? true : false}
                onChange={(e) => handelCheckEdit(e)}
                value={editisActive}
              ></input>
              &nbsp;
              <label>isActive</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Crud;
