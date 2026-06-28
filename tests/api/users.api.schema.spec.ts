//schema : type of response data
//Producer ---> Consumer
//ajv --> node lib for the schema validation
//npm install ajv


//validation tools: transform.tools/json-to-json-schema


import { test, expect } from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';

let TOKEN = process.env.API_TOKEN;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

//creating new objective of ajv
//setup the AJV:
let ajv = new Ajv();

//define JSON schema:
let userSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};


let userArraysSchema = {
    "type": "array",
    "items": userSchema
};



test('GET -- get a user', async ({ apiHelper }) => {

    let userData = {
        name: 'schema test',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };


    //post -- create a user
    let createResponse = await apiHelper.post("/public/v2/users", userData, AUTH_HEADER);
    let userId = createResponse.body.id;

    //get - get a user
    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);

    //schema validation code:
    let validate = ajv.compile(userSchema);//will behave like a function expression
    let isSchemaValid = validate(getUserResponse.body) //validate schema 

    if (!isSchemaValid) {
        console.log("Schema Errors: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();

});


test('GET -- get all users', async ({ apiHelper }) => {

    //get - get a user
    let getUsersResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect(getUsersResponse.status).toBe(200);

    //schema validation code:
    let validate = ajv.compile(userArraysSchema);
    let isSchemaValid = validate(getUsersResponse.body)

    if (!isSchemaValid) {
        console.log("Schema Errors: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();

});