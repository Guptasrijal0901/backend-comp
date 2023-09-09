const express = require("express");
const app = express();
const { connectDatabase } = require ("./Connection/Connect")
const collection = require ("./Models/Model")
const cors = require('cors');
app.use(express.json());
app.use(cors());

// app.get('/message', (req, res)=>{
//   res.json({message: "hello"})
// });
// create
app.post("/api/create", async (req, res)=>{
  try {
    const newobject = {
        name:  req.body.name,
        email:  req.body.email,
        branch: req.body.branch,
        roll: req.body.roll,
        date: req.body.date,
        phone: req.body.phone,
        comp: req.body.comp
          }
          console.log(newobject);
          const tabledata = new collection(newobject);
          await tabledata.save();
          return res.status(200).json({success: true, message: "Data saved succesfully"})      
  }
  catch (error) {
    console.log(error);
    return res.status(400)
    .json({success: false, error: error.message});
  }
  });

  
 //read
app.get("/api/read", async (req, res) => {
  try {
    const read = await collection.find().sort({ createdAt: -1 });
    // console.log(compdata);
    return res.status(400).json({ success: true, read: read });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
  // res.json("hi there")
});

 //delete
app.delete("/delete/:id", async (req, res) => {
    try {
      const tabledelete = await collection.findByIdAndDelete(req.params.id);
      console.log(tabledelete)
      return res.json({
        success: true,
        message: "Table deleted",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  });

// // update
app.put("/update/:comp/:id",async(req,res)=>{
    try {
      const update = await collection.findByIdAndUpdate(req.params.id,
        {comp: req.params.comp})
      console.log(update)
      return res.status(400).json({success:true,message:"Updated Successfully"})
    } catch (error) {
      return res.status(400).json({
        success:false, error:error.message,
      });
    }
  });
connectDatabase();
const PORT = 5050;
// const PORT = process.env.PORT || 5000

// app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname + "/client/build/index.html"),
//       function (err) {
//         if (err) {
//           console.log(err);
//         }
//       }
// );
//  });
app.listen(PORT , async ()=>{
  console.log(`Server is running at port ${PORT}`);
})
