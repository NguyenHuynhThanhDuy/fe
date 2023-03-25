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
    getTestService, createTestDetails, compareTestDetails
} from '~/service/testService'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function DoExam() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [testdetail, setTestdetail] = useState({
        arrQ: '',
        arrRs: ''
    });
    const user = useSelector(state => state.admin.admin);
    const dispatch = useDispatch()
    const [content, setContent] = useState();
    console.log(id);
    const getTest = async (id) => {
        try {
            const res = await getTestByIdService(id);
            const data = (res && res.data) ? res.data : [];
            setTestdetail(data);
        } catch (error) {
        }
    }

    useEffect(() => {
        getTest(id)
        console.log(testdetail)
        getAnimalsContent(testdetail)
    }, [])
    const getAnimalsContent = animals => {
        let content = []
        for (let i = 0; i < animals.arrQ.length; i++) {
            let s = '';
            s = animals.arrQ[i].split('.');
            content.push(<li>{animals.arrQ[i]}</li>);
            content.push(<li><input type={'radio'} name={s[0]} value={animals.arrRs[i].A[0]} />{animals.arrRs[i].A} <input type={'radio'} name={s[0]} value={animals.arrRs[i].B[0]} />{animals.arrRs[i].B} <input type={'radio'} name={s[0]} value={animals.arrRs[i].C[0]} />{animals.arrRs[i].C} <input type={'radio'} name={s[0]} value={animals.arrRs[i].D[0]} />{animals.arrRs[i].D}</li>);
        }
        setContent(content);
        return content;
    };
    const createTestDetatails = async () => {
        let arr = []
        for (let i = 1; i <= testdetail.arrQ.length; i++) {
            let rates = document.getElementsByName(i);
            let rate_value = '';
            for (let j = 0; j < rates.length; j++) {
                if (rates[j].checked) {
                    rate_value = rates[j].value;
                }
            }
            arr.push({ question: i.toString(), answer: rate_value.toString() })
        }
        const details = arr.map(details => ({
            ...details,
            userId: user.id,
        }))
        await createTestDetails({ testDetails: details, testId: testdetail.test.id });
        const res = await compareTestDetails({ userId: user.id, testId: testdetail.test.id });
        const data = (res && res.data) ? res.data : []
        alert("số câu đúng là: " + data.scd + " / " + data.count + "\n" + "điểm là:" + data.mark);
        console.log(data);
        navigate('/admin/test');
    }
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
                                            {
                                                content
                                            }
                                        </table>

                                    </div>
                                </div>
                                <button onClick={(e) => createTestDetatails()}>ok</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div >

        </>
    )
}

export default DoExam;