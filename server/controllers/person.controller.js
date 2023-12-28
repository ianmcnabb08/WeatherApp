const Person = require('../models/person.model');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
};

module.exports.createPerson = (request, response) => {

    Person.create(request.body) 
    .then(person => response.json(person))
    .catch(err => response.json(err));
}