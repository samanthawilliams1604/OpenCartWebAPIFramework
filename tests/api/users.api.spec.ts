
import {test, expect} from '@playwright/test';

let AUTH_TOKEN = {Authorization: 'Bearer aca8e58f96a535f7b93948b97b5134ad98836368bae6d293ba0a2027e8870b9f'}

test ('get user_test', async ({request}) => {

  let response = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });

   // console.log(response);
   let jsonBody = await response.json();
   console.log(jsonBody);

   console.log(response.status());
   console.log(response.statusText());

   expect(response.status()).toBe(200)

});

test ('create a user test', async ({request}) => {

//JS Object
    let userData = {
        name: 'uday',
        //email: 'uday123@pw.com',
        email: `automation_${Date.now()}@open.com`, //unique email - create new email and hence entry for new user each time
        gender: 'male',
        status: 'active'
    };

    //JS Object to JSON - serialisation 
  let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });

   // console.log(response);
   let jsonBody = await response.json();
   console.log(jsonBody);

   console.log(response.status()); //201
   console.log(response.statusText()); //Created

});


test ('update a user test', async ({request}) => {

//JS Object - updated info for user
    let userData = {
        name: 'uday101',
        //email: 'uday123@pw.com',
        email: `automation_${Date.now()}@open.com`, 
        gender: 'male',
        status: 'inactive'
    };

    //JS Object to JSON - serialisation 
  let response = await request.put('https://gorest.co.in/public/v2/users/8514302', {
        headers: AUTH_TOKEN,
        data: userData
    });

   // console.log(response);
   let jsonBody = await response.json();
   console.log(jsonBody);

   console.log(response.status()); //200
   console.log(response.statusText()); //OK

   });


   test ('delete a user test', async ({request}) => {


    //JS Object to JSON - serialisation 
  let response = await request.delete('https://gorest.co.in/public/v2/users/8514302', {
        headers: AUTH_TOKEN

    });

   
   console.log(response.status()); //204
   console.log(response.statusText()); //No Content

   });