

import { test, expect } from '../../src/fixtures/apifixtures'

const TOKEN = process.env.API_Token!;
const AUTH_HEADER = {Authorization: `Bearer ${TOKEN}` };

let userId: number;


//GROUPING TEST CASES and 'serial' will run in sequential mode/sequential execution - NOT RIGHT WAY!
test.describe.serial('running e2e go rest crud api tests', () => {

//GET test: fetch all data
test('GET API - get all users', async ({apiHelper}) =>{

    let response = await apiHelper.get('/public/v2/users/', AUTH_HEADER)
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
});


test('POST API - create a user', async ({apiHelper}) =>{
     let userData = {
        name: 'Naveen API',
        email: `automation_${Date.now()}@open.com`, //unique email - create new email and hence entry for new user each time
        gender: 'male',
        status: 'active'
    };

    let response = await apiHelper.post('/public/v2/users/', userData, AUTH_HEADER)
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
    userId = response.body.id;
    console.log('Created User Id ', userId);
});

test('PUT API - Update a user', async ({apiHelper}) =>{
     let userUpdatedData = {
        name: 'Naveen API Updated',
        status: 'inactive'
    };

    let response = await apiHelper.put(`/public/v2/users/${userId}`, userUpdatedData, AUTH_HEADER)
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userUpdatedData.name);
    expect(response.body.status).toBe(userUpdatedData.status);
   
})

test('DELETE API - delete a specific user', async ({apiHelper}) =>{
    

    let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER)
    expect(response.status).toBe(204);
    
   
})

});