
import { ApiHelper } from '../../src/api/ApiHelper';
import { test, expect } from '../../src/fixtures/apifixtures'

const TOKEN = process.env.API_Token!;
const AUTH_HEADER = {Authorization: `Bearer ${TOKEN}` };

//post-->get
//post-->put
//post-->get
//post-->delete

//BEST WAY - parallel execution

//helper --> generic function: CREATE A FRESH USER
async function createUser(apiHelper: any){
   let userData = {
          name: 'Naveen API',
          email: `automation_${Date.now()}@open.com`,
          gender: 'male',
          status: 'active'
      };
  
      let response = await apiHelper.post('/public/v2/users/', userData, AUTH_HEADER)
      expect(response.status).toBe(201);
      return response.body;
      
 
}

//Test 1: Create a user test + verify: AAA = Arrange, Act, Assert
//POST--->userId--> GET /userId --> verify
test('POST - create a user', async ({apiHelper}) =>{
    //create a user:
    let userResponse = await createUser(apiHelper);

    //get the user
    let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Naveen API")

})

//Test 2:Update a user
//POST--->userId--> PUT --> GET /userId --> verify
test('PUT - update a user', async ({apiHelper}) =>{
    //create a user:
    let userResponse = await createUser(apiHelper);
     let userUpdatedData = {
        name: 'Naveen API Updated',
        status: 'inactive'
    };

    //update the user
    let response = await apiHelper.put(`/public/v2/users/${userResponse.id}`, userUpdatedData, AUTH_HEADER)
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userUpdatedData.name);
    expect(response.body.status).toBe(userUpdatedData.status);


    //get the user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name)
    expect(getResponse.body.status).toBe(userUpdatedData.status)

    });


    //Test 3:Delete a user
//POST--->Delete --> GET /userId --> verify
test('DELETE - delete a user', async ({apiHelper}) =>{
    //create a user:
    let userResponse = await createUser(apiHelper);
    

    //delete the user
    let response = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
    expect(response.status).toBe(204);


    //get the user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
    expect(getResponse.status).toBe(404); //not Found
    expect(getResponse.body.message).toBe("Resource not found");

    });

    //Test 2:Partial update a user
//POST--->userId--> PATCH --> GET /userId --> verify
test('PATCH - partially update a user', async ({apiHelper}) =>{
    //create a user:
    let userResponse = await createUser(apiHelper);
     let userUpdatedData = {
        name: 'Naveen API Updated PATCH',
      
    };

    //partially update the user
    let response = await apiHelper.patch(`/public/v2/users/${userResponse.id}`, userUpdatedData, AUTH_HEADER)
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userUpdatedData.name);
   


    //get the user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name)
    

    });

    //ASSIGNMENT:
    //automate this api - CRUD
    //1. restful-booker.herokuapp.com/apidoc/index.html
    //2. https://thinking-tester-contact-list.herokuapp.com/addUser
    //Sign up>>Create username and password>>>Api documentation - practice