import React, { Fragment, useEffect, useState } from "react";
import codes from "./codes";
import IDE from "./IDE";
import "./style.css";
import { Button, Modal, Table } from 'react-bootstrap'
import axios from "axios";
import { useNavigation } from "react-router";

const LiveIDE = () => {
    const [isShow, invokeModal] = useState(false)
    const [alltests, setAllTests] = useState([])

    const uploadTest = () => {
        return invokeModal(!false)
    }

    const close = () => {
        return invokeModal(false)
    }

    useEffect(async () => {
        console.log("hellooo")
        await axios.get("http://localhost:8000/alltests")
            .then((res) => {
                setAllTests(res.data);
            })
    }, [])

    useEffect(() => {
        const navLi = document.querySelectorAll("nav ul li a");
        const sections = document.querySelectorAll("div.sec");

        window.addEventListener("scroll", () => {
            let current = "";
            sections.forEach((div) => {
                let sectionTop = div.offsetTop;
                if (scrollY >= sectionTop - 65) {
                    current = div.getAttribute("id");
                }
            });
            navLi.forEach((li) => {
                li.classList.remove("active");
                document.querySelector(`nav ul li a[href*=${current}]`).classList.add("active");
            });
        });
    }, []);

    //const navigate = useNavigation()
    //const attemptTests = ()=>{
    // console.log("hello from attempt tests")
    // navigate('/attemptTests')
    // }

    //const handleHeiht = (editor) => {};
    console.log(`http://${window.location.host}`);

    return (
        <div className="box">
            <div>
                <Button variant="dark" style={{ margin: "10px" }} onClick={uploadTest} >Attempt tests</Button>
                <Modal show={isShow}>
                    <Modal.Body>
                        <Table striped bordered hover>
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
                                    <tr key={test._id} style={{ cursor: "pointer" }}>
                                        <td>{index + 1}</td>
                                        <td>{test.testExplanation}</td>
                                        <td>{test.hint}</td>
                                        <td>{test.sampleCode}</td>
                                        <td>{test.language}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={close}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="content">
                <main>
                    {codes.map((item, i) => (
                        <div className="sec" id={`ide-${item.filename}`} key={i}>
                            <h4>{item.title}</h4>
                            <IDE item={item} />
                        </div>
                    ))}
                </main>
            </div>
            <div className="scroll">
                <nav>
                    <ul>
                        {codes.map((item, i) => (
                            <li key={i}>
                                <a href={`#ide-${item.filename}`} className={i === 0 ? "active" : ""}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default LiveIDE;