const SignupProducer = require('./RabbitMQ/producer');
const SignupConsumer = require('./RabbitMQ/consumer');
const express = require('express');
const app = express();
const port = 3000;
const signupProducer = new SignupProducer();
const consumer = new SignupConsumer();
consumer.consume();
const user = [];
const questions = [{
    title: "2 states",
    description: "find maximum in the array",
    testcase: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}]
const submissions = []
app.use(express.json());
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    signupProducer.prod(email, password);
    //add logic to decode, body should have email nd pswrd
    //store in user array above,return 200 if user correct
    // res.send('Hello world!');
    res.status(200).json({ message: "you are successfully signedUp!!!", user });
})

app.post('/login', (req, res) => {
    // check if the user exist in the array
    //send back status 200/ and a token (any random string),else return 404
    res.send('Hello world!');
})

app.get('/question', (req, res) => {
    //return all the questions in the array
    res.send('Hello world!');
})

app.get('/submissions', (req, res) => {
    // get the submissions of the user
    res.send('Hello world!');
})

app.post('/submissions', (req, res) => {
    //let user submit a problem,randomly accept or reject
    //stor in the sub array
    res.send('Hello world!');
})

//hard todos
//create a route which let admin add questions
//at the signup give option to be admin or not
//authenticate


app.listen(port, () => {
    console.log(`app listening on port: ${port}`);
})

