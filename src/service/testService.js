import request1 from '~/core/utils/axios1';
import cookies from 'react-cookies';


const getTestService = (test) => {
    return request1.get(
        'test',
    )
}
const getTestByIdService = (id) => {
    return request1.get(
        'test/' + id,
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

export { getTestService, getTestByIdService, createTestService }