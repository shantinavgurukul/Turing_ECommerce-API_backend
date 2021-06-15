module.exports = (knex,app) => {
    app.get('/departments',(req,res) => {
        knex.select('*').from('department').then((data)=> {
            console.log(data);
            res.send(data);
    
        }).catch((err) => {
            console.log(err);
            res.send(err);
        })
    })
    app.get('/departments/:department_id',(req,res) => {
        knex.select('*').from('department').where('department_id',req.params.department_id)
        .then((data) => {
            console.log(data);
            res.send(data);
    
        }).catch((err) => {
            console.log(err);
            res.send(err)
        })
    
    })
    
    
}




