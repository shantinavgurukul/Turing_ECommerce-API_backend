module.exports = (knex,app) => {
    app.get('/attributes',(req,res) => {
        knex.select('*').from('attribute').then((data) => {
            res.send(data);
            console.log(data);
    
        }).catch((err) => {
            console.log(err);
            res.send(err);
        })
    
    })
    app.get('/attributes/:attribute_id',(req,res) => {
        knex.select('*').from('attribute').where('attribute_id',req.params.attribute_id)
        .then((data) => {
            console.log(data);
            res.send(data);
    
        }).catch((err) => {
            console.log(err);
            res.send(err)
        })
    })
    app.get('/attributes/values/:attribute_id',(req,res) => {
        var attribute = req.params.attribute_id
        knex("attribute")
            .select('attribute_value.attribute_value_id','value')
            .join("attribute_value","attribute.attribute_id","attribute_value.attribute_id")
            .where('attribute_value.attribute_value_id', attribute)
            .then((data) => {
                res.send(data);
                console.log(data);
    
            }).catch((err) => {
                res.send(err);
                console.log(err);
            })
    })
    
    
    app.get('/attributes/inProduct/:product_id',(req,res) => {
        var products = req.params.product_id
        knex("attribute")
            .select('attribute_value.attribute_value_id',"value","name")
            .join("attribute_value","attribute.attribute_id","=","attribute_value.attribute_id")
            .join("product_attribute" ,"attribute_value.attribute_value_id","=","product_attribute.attribute_value_id")
            .where('product_attribute.product_id',products)
            .then((data) => {
                res.send(data);
                console.log(data);
    
            }).catch((err) => {
                console.log(err);
                res.send(err);
            })
    })
}