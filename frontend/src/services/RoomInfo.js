import request from '../utils/request';


export function test(data ) {
    var {client_id,userName} = data;
    return request(`/api/v1_0/room/user/roomcreate?client_id=${client_id}&username=${userName}`);
}

