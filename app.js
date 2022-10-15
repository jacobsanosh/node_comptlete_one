const express = require('express')
const bdparse = require('body-parser')
const app = express()
const port = 3000;


app.use(bdparse.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
    //lodash is used to to remove unwanted thing from params link _~!@#$%$^@ like these
const _ = require('lodash');
//decalring an  global variable to store the data from compose 
let note_arr = [];

//constant string
const home_content = "this is an home section"
const about_content = "this is an about section"
const contact_content = "this is an contact section"
app.get('/', (req, res) => {
    //get code here

    res.render('home', { home_c: home_content, res: note_arr });
})

app.post('/', (req, res) => {
    //post code here
})

app.get('/about', (req, res) => {
    res.render('about', { about_c: about_content })
})

//for contact section
app.get('/contact', (req, res) => {
    res.render('contact', { contact_c: contact_content })
})



//for compose section
app.get('/compose', (req, res) => {
        res.render('compose');
    })
    //post method to accespt notes
app.post('/compose', (req, res) => {
        console.log("in post method")
        console.log(req.body.title, req.body.note)
            //creating an object to store the data
        let data = {
            title: req.body.title,
            note: req.body.note
        };
        note_arr.push(data); //pushing into the array
        //printing the o/p
        // for (let i = 0; i < note_arr.length; i++) {
        //     console.log(note_arr[i])
        // }
        res.redirect('/');
    })
    //they are used to make dynamic url
app.get('/post/:values', (req, res) => {
    // console.log(req.params.values); //it will print anything
    let post = req.params.values;
    console.log("params" + post)
    note_arr.forEach((ele) => {

        if (_.toLower(ele.title) == _.toLower(post)) {
            // res.redirect('/',ele);
            console.log("match found");
            res.render('post', { res: ele });
        }

    })
})
app.listen(port, () => {
    console.log('started at port 3000')
})