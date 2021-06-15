module.exports = (knex,app) => {
    app.get('/products',(req,res) => {
        knex.select('*').from('product')
        .then((data) => {
            var alldata = {
                count : data.length,
                Rows : data
            }
            res.send(alldata)
            console.log(alldata);
    
        }).catch((err) => {
            res.send(err);
            console.log(err);
        })
    })
    app.get('/products/:search',(req,res) => {
        knex('product').select('product_id','name','description','price','discounted_price','thumbnail')
        .where('product.name',req.params.search)
        .then((data) => {
            for(var i = 0; i<data.length;i++){
                if(data[i]["name"] === data[i]["name"]){
                    var wholedata = {
                        count : data[i]["name"].length,
                        Rows : data
                    }
                }
            }
            res.send(wholedata);
            console.log(wholedata);
        })
    })
    
    app.get('/product/:product_id',(req,res) => {
        // console.log("@@@@@@@@@");
        var pro_d = req.params.product_id;
        knex.select('*').from('product').where('product_id',pro_d)
        .then((data) => {
            console.log(data);
            res.send(data);
            console.log("....");
    
        }).catch((err) => {
            console.log(err);
            res.send(err)
        })
    })
    app.get('/products/inCategory/:category_id',(req,res) => {
        var products = req.params.category_id
        knex('product')
        .select("product.product_id","name","description","price","discounted_price","thumbnail")
        .join("product_category","product.product_id","product_category.product_id")
        .where("product_category.category_id", products)
        .then((data) => {
            res.send(data);
            console.log(data);
        }).catch((err) => {
            res.send(err);
            console.log(err);
        })
    })
    app.get('/products/inDepartment/:department_id',(req,res) => {
        knex('product').select("product.product_id","product.name","product.description","product.price","product.discounted_price","product.thumbnail")
        .join("department" , "product.product_id" , "department.department_id")
        .where("department_id",req.params.department_id)
        .then((data) => {
            res.send(data);
            console.log(data);
    
        }).catch((err) => {
            res.send(err)
            console.log(err);
        })
    
    })
    app.get('/products/:product_id/details',(req,res) => {
        var prod_id = req.params.product_id;
        knex('product')
            .select("product.product_id","name","description","price","discounted_price","image","image_2")
            .where("product_id",prod_id)
            .then((data) =>{
                res.send(data);
                console.log(data);
    
            }).catch((err) => {
                res.send(err)
                console.log(err);
            })
        })
    app.get('/products/locations/:product_id',(req,res) => {
        // var produt = req.params.product_id;
        knex('product')
            .select("category.category_id",
            "category.name as category_name",
            "department.department_id","department.name as department_name")
            .join("product_category", 'product_category.product_id', '=', 'product.product_id')
            .join("category","category.category_id",'=','product_category.category_id')
            .join("department","department.department_id",'=',"category.department_id")
            .where("product.product_id",req.params.product_id)
            .then((data) => {
                res.send(data)
                console.log(data);
            }).catch((err) => {
                res.send(err)
                console.log(err);
            })
    
    })
    app.get('/products/reviews/:product_id',(req,res) => {
        knex('review').select('product.name','review.review','review.rating','review.created_on')
        .join('product','review.product_id','=','product.product_id')
        .where('product.product_id',req.params.product_id)
        .then((data) => {
            res.send(data)
            console.log(data);
        }).catch((err) => {
            res.send(err)
            console.log(err);
        })
    })
    
    app.post('/post/reviews/:product_id',(req,res) => {
        knex('review').insert({
            // name: req.body.name,
            review: req.body.review,
            rating: req.body.rating,
            created_on: new Date(),
            customer_id : "2",
            product_id : req.params.product_id
        }).where('product.product_id',req.params.product_id).then((data) => {
            res.send(data)
            console.log(data);
        }).catch((err) => {
            res.send(err)
            console.log(err);
        })
    })

}