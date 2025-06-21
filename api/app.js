const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const service = require("./services/userApiService");
const connectDataBase = require("./services/databaseConnection");
const userApiRoute = require("./routes/userApiRoute");
const composantRoute = require("./routes/composantRoute");
const partenaireRoute = require("./routes/partenaireRoute");
const configurationRoute = require("./routes/configurationRoute");
const composantCategorieRoute = require("./routes/composantCategorieRoute");
const verifyToken = require("./middlewares/authMiddlewares");

const app = express();
const { swaggerUi, swaggerSpec } = require("./swagger");
const composantCategorie = require("./models/composantCategorie");
const port = 2070;

// Active CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//charge ficher de config
dotenv.config();

//récupère les données au format json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDataBase.connectDataBase();

app.use("/api/user/", userApiRoute);
app.use("/api/composants/", composantRoute);
app.use("/api/partenaires/", partenaireRoute);
app.use("/api/configurations/", configurationRoute);
app.use("api/composantCategories/", composantCategorieRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  console.log(req);
  let email = req.body.email;
  let password = req.body.password;
  // si le login ou le mot de passe ne sont pas renseignés
  if (email == "" || password == "") {
    // réaffiche la vue render avec le message d'erreurs
    res.render("register", { erreurs: "Login ou mot de passe incorrect" });
  } else {
    // redirige sur la home
    res.redirect("/home");
  }
});

// http://localhost:2070/
app.get("/", (req, res) => {
  const page =
    "<h2>Bienvenue sur l'API de gestion des composants</h2> \
  <p>Pour accéder à la documentation de l'API, allez sur <a href='/api-docs'>/api-docs</a></p>";

  res.send(page);
});

app.get("/home", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log("youpiiiii le serveur a démarré  " + port);
});
