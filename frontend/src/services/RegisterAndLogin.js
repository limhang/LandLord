import request from '../utils/request';

export function auth({ username, password }) {
    return request(`/api/v1_0/person/user/login?username=${username}&password=${password}`);
}

export function register(res) {
    const {username,password} = res;
    return request(`/api/v1_0/person/user/register?username=${username}&password=${password}`);
}
