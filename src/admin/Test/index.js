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
import {
    createTestService, getTestByIdService,
    getTestService
} from '~/service/testService'

function Test() {
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
                                                                    <button>Làm bài</button>
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