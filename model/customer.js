const jwt = require('jsonwebtoken')

module.exports = (knex,app) => {
    //customer register data:-

    app.post('/customers/register',(req,res) => {
        knex('customer').insert(req.body
        ).then((data) => {
            // var wholedata = {
            //     customer:{
            //         schema: data

            //     }
            // }
            res.send(data)
            console.log("done");
        }).catch((err) => {
            res.send(err)
            console.log(err);
        })

    })
    // get customer data:-
    app.get('/customer',(req,res) => {
        knex.select('*').from('customer').then((data)=> {
            res.send(data)
            console.log(data);
        }).catch((err) => {
            res.send(err)
            console.log(err);
        })
    })
    app.put('/customer/:customer_id',(req,res) => {
        knex.update(req.body).table('customer').where('customer_id',req.params.customer_id)
        .then(() => {
            res.send("updated data!!")
            console.log("updated data!!");

        }).catch((err) => {
            res.send(err)
            console.log(err);
        })
    })
    app.post('/customers/login',(req,res) => {
        knex.select('*').from('customer').where('email',req.body.email)
        .then((data) => {
            if(data.length >0){
                if(data[0].password == req.body.password){
                    token = jwt.sign({'customer_id':data[0].customer_id},'shanti')
                    // res.cookie(token)
                    console.log(token);
                    console.log({msg: 'you have logged in successfully', token: token})
                    res.json({msg: 'you have logged in successfully', token: token})
                }else{
                    console.log("password are wrong!!");
                }

            }else{
                res,send("email wrong!!")
            }
        }).catch((err) => {
            res.send(err)
            console.log(err);
        })
    })
}