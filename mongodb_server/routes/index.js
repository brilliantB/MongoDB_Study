var express = require('express');
// const { user } = require('../../../mysql_test/config/mysqlConfig');
var router = express.Router();

const users = require("../models/user");

// Create
router.post("/auth", (req, res)=> {
  const {name, age, gender, likes} = req.body;

  const userModel = new users({
    name,
    age,
    gender,
    likes,
});

  userModel
  .save()
  .then((savedUser)=>{
    console.log(savedUser);
    res.status(200).json({
      message: "생성 성공",
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      message: "DB 서버 에러",
    });
  });
});

// Read All
router.get("/auth", async (req, res) => {
  try{
    const result = await users.find();
    res.statur(200).json({
      message: "조회 성공",
      data : result,
    });
  } catch (error){
    res.status(500).json({
      message: "조회 실패",
      error: error,
    });
  }
});

// Read Datail
router.get("/auth/:id", async (req, res) => {
  const { id } = req.params;
  try{
    const result = await users.findOne({_id : id});
    
    res.status(200).json({
      message: "조회 성공",
      data : result,
  });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "조회 실패",
      error: error,
    });
  }  
});

// Update
router.put("/auth/:id", async (req, res) => {
  const { id } = req.params;
  const {name, age, gender, likes} = req.body;

  try{
    const result = await users.findByIdAndUpdate(id, 
      {
        name,
        age,
        gender,
        likes,
      },
      {new : true}
      );
      res.status(200).json({
        message : "수정 완료",
        data : result,
      });
  } catch (error){
    res.status(500).json({
      message : "수정 실패",
      error : error,
    });
  }
});

// Delete
router.delete("/auth/:id", async (req, res) => {
  const {id} = req.params;
  try {
    await users.findByIdAndDelete(id);
    res.status(200).json({
      message: "삭제 성공"
    });
  } catch(error){
    res.status(500).json({
      message : "삭제 실패",
      error : error,
    });
  }
});

module.exports = router;
