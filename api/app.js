const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const service = require("./services/userApiService");
const connectDataBase = require("./services/databaseConnection");
const userApiRoute = require("./routes/userApiRoute");
const verifyToken = require("./middlewares/authMiddlewares");
const app = express();
const port = 2070;

//charge ficher de config
dotenv.config(); 

//récupère les données au format json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


connectDataBase.connectDataBase();

app.use("/api/user/", userApiRoute);


app.set('view engine', "ejs");
app.set("views", __dirname + "/views");

app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", (req, res) => {
    console.log(req);
    let email = req.body.email; 
    let password = req.body.password; 
    // si le login ou le mot de passe ne sont pas renseignés
    if (email == "" || password == "") { 
        // réaffiche la vue render avec le message d'erreurs
        res.render("register", 
            { erreurs:"Login ou mot de passe incorrect"});     
        } else { 
            // redirige sur la home
            res.redirect("/home");     
        } 
})

// http://localhost:2070/
app.get('/', (req, res) => {
    res.send('Accueil à la zeub');
});

app.get('/home', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log('youpiiiii le serveur a démarré sur le port ' + port);
});