module.exports = (knex,app) => {
    app.get('/categories',(req,res) => {
        knex.select('*').from('category').then((data) => {
            res.send(data)
            console.log(data);
    
        }).catch((err) => {
            res.send(err);
            console.log(err);
        })
    })
    //category
    
    app.get('/categories/:category_id',(req,res) => {
        knex.select('*').from('category').where('category_id',req.params.category_id).
        then((data) => {
            res.send(data);
            console.log(data);
    
        }).catch((err) => {
            res.send(err)
            console.log(err);
        })
    })
    app.get('/categories/inProduct/:product_id',(req,res) => {
        knex.select('*').from('product').where('product_id',req.params.product_id)
        .then((data) => {
            res.send(data);
            console.log(data);
    
        }).catch((err) => {
            console.log(err);
            res.send(err);
        })
    })
    app.get('/categories/inDepartment/:department_id',(req,res) => {
        knex.select('*').from("department").where('department_id',req.params.department_id)
        .then((data)=>{
            res.send(data);
            console.log(data);
    
        }).catch((err) => {
            console.log(err);
            res.send(err);
        })
    })
}