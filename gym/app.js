// // RnD1YEGVaB1l5VcJ

// const express = require("express");
// const mongoose = require("mongoose");
// const router = require("./Routes/UserRoutes");

// const app = express();

// //Middleware
// app.use(express.json());
// app.use("/users",router);


// mongoose.connect("mongodb+srv://admin:RnD1YEGVaB1l5VcJ@cluster0.rzmvegs.mongodb.net/")
// .then(()=>console.log("Connected to MongoDB"))
// .then(()=> {
//     app.listen(5000);
// })
// .catch((err)=> console.log((err)));


require('dotenv').config(); // Load env variables

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use("/users", router);

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((err) => console.log("DB Error:", err));
