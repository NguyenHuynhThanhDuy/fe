import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '~/components/Layout/AdminLayout/Header';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { Roles, Notify } from '~/core/constant';
import cookies from 'react-cookies';
import { faEye, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import { handleError, handelNotify } from '~/core/utils/req';
import { useNavigate } from "react-router-dom";
import {
    createTestService, getTestByIdService,
    getTestService
} from '~/service/testService'
function start() {
    // Request permission to capture the screen
    navigator.mediaDevices.getDisplayMedia({ video: true }).then(stream => {
        // Create a new MediaRecorder
        const recorder = new MediaRecorder(stream);

        // Start recording
        recorder.start();

        // Create an empty buffer to hold the recorded data
        const buffer = [];

        // Listen for data available events and add the data to the buffer
        recorder.addEventListener('dataavailable', event => {
            buffer.push(event.data);
        });

        // Listen for the stop event and create an MP4 file from the buffer
        recorder.addEventListener('stop', () => {
            const blob = new Blob(buffer, { type: 'video/mp4' });
            // Create a download link and trigger a download
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'screen-recording.mp4';
            a.click();
        });

        // Stop recording after 5 seconds
        setTimeout(() => {
            recorder.stop();
        }, 100000);
    });
}

function Test() {
    const navigate = useNavigate();
    const token = cookies.load('Tokenadmin');
    const limit = 10;
    const [test, setTest] = useState({
        limit: limit,
        page: 1,
        name: '',
        startDate: '',
        time: '',
        teacherId: '',
        classId: '',
    });

    const getListTest = async (list) => {
        try {
            const res = await getTestService(list)
            const data = (res && res.data) ? res.data : [];
            setTest(data.tests);
            console.log(data)
        } catch (error) {
        }
    }

    const getTest = async (id) => {

        navigate('/doExam/' + id)
        start()
    }

    useEffect(() => {
        getListTest(test)
    }, [setTest])
    return (
        <>

            <div id="main" className="layout-navbar">
                <Header />
                <div id="main-content">
                    <div className="page-heading">

                        <section className="section">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table mb-0 table-danger" id="table1">
                                            <thead>
                                                <tr>
                                                    <th>Tên bài thi</th>
                                                    <th>Loại bài thi</th>
                                                    <th>Ngày bắt đầu</th>
                                                    <th>Thời lượng</th>
                                                    <th>Tác Vụ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    test && test.length > 0 &&
                                                    test.map(item => {
                                                        let s = 'table-info';
                                                        if ((test.indexOf(item) + 1) % 2 !== 0) {
                                                            s = 'table-light';
                                                        } return (
                                                            <tr className={s}>
                                                                <td>{item.name}</td>
                                                                <td className='text-break'>{item.type}</td>
                                                                <td className='text-break'>{item.startDate}</td>
                                                                <td className='text-break'>{item.time}</td>
                                                                <td className='text-break'>
                                                                    <button onClick={(e) => getTest(item.id)} >Làm bài</button>
                                                                </td>

                                                            </tr>
                                                        )

                                                    })
                                                }

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div >

        </>
    )
}

export default Test;