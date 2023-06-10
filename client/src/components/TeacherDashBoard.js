import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Dropdown, Table } from 'react-bootstrap'


const TeacherDashBoard = () => {
  const [isShow, invokeModal] = useState(false)
  const [test, setTest] = useState({
    testExplanation: "",
    hint: "",
    sampleCode: "",
    filename: "src-1",
    extension: ".c",
    language: "c"
  })
  const [alltests, setAllTests] = useState([])

  const uploadTest = () => {
    return invokeModal(!false)
  }

  const close = () => {
    return invokeModal(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setTest({
      ...test,
      [name]: value
    })
  }

  const upload = () => {
    axios.post("http://localhost:8000/uploadtest", test)
      .then((res) => {
        console.log('hemamma skjdnakjn', res.data)
        alert(res.data.message)
        const at = alltests;
        at.push(res.data.test);
        setAllTests(at);
      })
  }

  useEffect(async () => {
    await axios.get("http://localhost:8000/alltests")
      .then((res) => {
        setAllTests(res.data)
      })
  }, [])


  return (
    <div>
      <div className="container-fluid" style={{ marginTop: "30px" }}>
        <div className="row">
          <div className="col-6">
            <div>
              <img className="card-img-top" style={{ height: "30vh" }} src="../../Capture" alt="Can't load Image" />
              <div className="card-body">
                <h5 className="card-title">Asim Riaz</h5>
                <p className="card-text">Upload tests here. Educate one Student, You Empower his whole Genration</p>
              </div>
              <div style={{ marginTop: "2 rem" }}>
                <Button variant="success" onClick={uploadTest} style={{ marginTop: "20px" }}>
                  Upload Test
                </Button>
                <Modal show={isShow}>
                  <Modal.Header closeButton onClick={close}>
                    <Modal.Title>Enter Credentials To Upload test</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* controlId="formBasicPassword" */}
                    <Form>
                      <Form.Group className="mb-3" >
                        <Form.Label>Test Explaination.</Form.Label>
                        <Form.Control as="textarea" placeholder="Test" onChange={handleChange} name="testExplanation" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Add Hint.</Form.Label>
                        <Form.Control as="textarea" placeholder="hint" onChange={handleChange} name="hint" />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label>Sample Code.</Form.Label>
                        <Form.Control as="textarea" placeholder="sample-code" onChange={handleChange} name="sampleCode" />
                      </Form.Group>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Select Language.
                        </Dropdown.Toggle>
                        {/* href="#/action-3" */}
                        <Dropdown.Menu>
                          <Dropdown.Item>C</Dropdown.Item>
                          <Dropdown.Item >JAVA</Dropdown.Item>
                          <Dropdown.Item >PYHTON</Dropdown.Item>
                          <Dropdown.Item >C#</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={close}>
                      Close
                    </Button>
                    <Button variant="dark" onClick={upload}>
                      Upload
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
          <div className="col-4 overflow-x-auto" >
            <Table striped bordered hover className="table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Test Explanation</th>
                  <th>Hint</th>
                  <th>Sample Code</th>
                  <th>Language</th>
                </tr>
              </thead>
              <tbody>
                {alltests.map((test, index) => (
                  <tr key={test._id}>
                    <td>{index + 1}</td>
                    <td>{test.testExplanation}</td>
                    <td>{test.hint}</td>
                    <td>{test.sampleCode}</td>
                    <td>{test.language}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashBoard