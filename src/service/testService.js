import request1 from '~/core/utils/axios1';
import cookies from 'react-cookies';


const getTestService = async (test) => {
    return await request1.get(
        'test',
    )
}
const getTestByIdService = async (id) => {
    return await request1.get(
        'test/' + id,
    )
}

const createTestDetails = async (body) => {
    const bodyParameters = {
        ...body
    };
    return await request1.post(
        'testdetails',
        bodyParameters
    )
}

const compareTestDetails = async (body) => {
    // const bodyParameters = {
    //     ...body
    // };
    let s = "";
    if (body.userId) {
        s += '?userId=' + body.userId + '';
    }
    if (body.testId) {
        s += '&testId=' + body.testId + '';
    }
    return await request1.get(
        'testdetails' + s,

    )
}

const createTestService = (test, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const bodyParameters = {
        ...test
    };

    return request1.post(
        'test',
        bodyParameters,
        config,
    )
}

export { getTestService, getTestByIdService, createTestService, createTestDetails, compareTestDetails }