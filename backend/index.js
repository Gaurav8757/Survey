import express from "express";
import connectDB from "./connection/connection.js";
import cors from "cors";
import Routes from "./routes/userRoutes.js";
const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(currentModuleDir, "F:/policy/policy-bazaar/src/admin/uploads")));

// routes
app.use('/', Routes);

// middleware call
connectDB();
app.listen(port, (err)=>{
    if(err){
        console.log(`Server is not running on ${port}`);
    }else{
        console.log(`Server is running on ${port}`);
    }
})


