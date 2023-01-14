const db = require("../models");
const bcrypt = require("bcrypt");
const { signToken, decode } = require("../lib/jwt");
const fs = require("fs");
const handlebars = require("handlebars");
const emailer = require("../lib/emailer");

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const findEmail = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (findEmail) {
        return res.status(400).json({
          message: "Email has been used",
        });
      }

      const generateOTP = () => {
        let digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 4; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      };

      const otp = generateOTP();
      const hashedPassword = bcrypt.hashSync(password, 5);
      const hashedOtp = bcrypt.hashSync(otp, 5);

      const createUser = await db.User.create({
        username,
        email,
        password: hashedPassword,
        is_verify: false,
        otp: hashedOtp,
      });

      const verificationToken = signToken({
        id: createUser.id,
      });

      const verificationLink = ` ${process.env.BASE_URL_FE}register/verification?verification_token=${verificationToken}`;

      const rawHTML = fs.readFileSync("templates/verification.html", "utf-8");

      const compiledHTML = handlebars.compile(rawHTML);

      const htmlResult = compiledHTML({
        username,
        otp,
        verificationLink,
      });

      await emailer({
        to: email,
        html: htmlResult,
        subject: "Verify your account",
        text: "please verify your account",
      });

      return res.status(200).json({
        message: "User Registered",
        data: createUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
  verification: async (req, res) => {
    try {
      const { otp, token } = req.body;

      const decodedToken = decode(token);

      const findUser = await db.User.findOne({
        where: {
          id: decodedToken.id,
          is_verify: false,
        },
      });

      if (!findUser) {
        return res.status(400).json({
          message: "User has been verified",
        });
      }

      const otpValid = bcrypt.compareSync(otp, findUser.otp);

      if (!otpValid) {
        return res.status(400).json({
          message: "OTP invalid",
        });
      }

      await db.User.update(
        {
          is_verify: true,
        },
        {
          where: {
            id: findUser.id,
          },
        }
      );

      return res.status(200).json({
        message: "User verified",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const findUser = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (!findUser) {
        return res.status(400).json({
          message: "Email not found",
        });
      }

      if (findUser.is_verify === false) {
        return res.status(400).json({
          message: "Email not verified",
        });
      }

      const passwordValid = bcrypt.compareSync(password, findUser.password);

      if (!passwordValid) {
        return res.status(400).json({
          message: "Password invalid",
        });
      }

      delete findUser.dataValues.password;

      const token = signToken({
        id: findUser.id,
      });

      return res.status(201).json({
        message: "User logged in",
        data: findUser,
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
};

module.exports = authController;
