const mongoose = require('mongoose');



const excels = require('./routes/excels');
const express = require('express');
const app = express();
const cors = require('cors');
const { Excel } = require('./models/excel');
const Db='mongodb+srv://varad:1234@cluster0.g7jqnqz.mongodb.net/Exceldb?retryWrites=true&w=majority';
mongoose.connect(Db,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
console.log(`Connected to MongoDB...`);
}).catch((err) =>
console.log(`no connection`));
app.use(express.json());
app.use(cors())
// app.use('/api/genres', genres);
// app.use('/api/customers', customers);
// app.use('/api/movies', movies);

app.use('/api/excels', excels);
app.post("/insert", async (req, res) => {
    //app.use(bodyParser.urlencoded({extended:false}));
    const fileData = req.body.data;
    console.log("backend", fileData);
    // fileData=XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    try {
        //const Excel=new ExcelModel({fileData:fileData});
        Excel.insertMany(fileData, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })

        res.send("Inserted DATA");
    } catch (error) {
        res.send(error);
        console.log("error", error)
    }


});

app.post("/Login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})

app.post("/Register", (req, res) => {
    const { name, email, password } = req.body;
    //const password = await bcrypt.hash(plainTextPassword,salt);
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new User({
                name,
                email,
                password
            })

            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

})
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));