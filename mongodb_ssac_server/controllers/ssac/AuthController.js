const user = require("../../models/user");
const jwtModule = require("../../modules/jwtModule");

const authController = {
  getProfile: (req, res) => {
    const userInfo = req.userInfo;

    if (userInfo){
      //있을 때
      res.status(200).json({
        message: "프로필 조회 성공",
        data: userInfo,
      });
    } else {
      res.status(400).json({
        message: "프로필 조회 실패",
      });
    }
  },



  signUp: async (req, res) => {
    const { name, userId, password } = req.body;
    console.log(req.body);
    try {
      const result = await user.findOne({ userId }); // 아이디 체크

      if (!result) {
        // 중복된 아이디가 없을 경우
        const userModel = new user({ name, userId, password });
        await userModel.save();
        res.status(200).json({
          message: "회원가입 성공",
        });
      } else {
        // 있을 경우
        res.status(409).json({
          message: "중복된 아이디가 존재합니다.",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "DB 서버 에러",
        error: error,
      });
    }
  },

  signIn: async (req, res) => {
    const { userId, password } = req.body;
    try {
      const result = await user.findOne({ userId, password });
      if (result) {
        // 로그인 성공 > 무언가 담긴 객체

        const payload = {
          userId : result.userId, //민감하지 않은 정보들, pw적으면 해킹위험.
          name: result.name,
        };

        const token = jwtModule.create(payload);

        res.status(200).json({
          message: "로그인 성공",
          accessToken: token,
        });
      } else {
        // 로그인 실패 > null
        res.status(409).json({
          message: "로그인 실패",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },
};

module.exports = authController;