const Auth = require("../models/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register fonksiyonu
const register = async (req, res) => {
  try {
    //kullanıcıdan request(req) ile username, password, email alma işlemi (parametre alıyoruz)
    const { username, email, password } = req.body;

    // mevcut email ile kullanıcının varlığı kontrolü, Oluşturduğumuz modelden alıyoruz. Mongoose kütüphanesi ile
    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(500).json({ message: "e-mail account available !!" });
    }
    //parola kontrolü
    if (password.length < 6) {
      return res
        .status(500)
        .json({ message: "Password should not be less than 6 digits." });
    }
    //parola hash'leme
    const passwordHash = await bcrypt.hash(password, 12);

    //benzersiz kullanıcı oluşturma işlemi
    const newUser = await Auth.create({ username, email, passwordHash });

    //token oluşturma işlemi
    const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    //response olarak 200, newUser ve userToken'i return ettik
    res.status(200).json({
      status: "OK",
      newUser,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Login fonksiyonu
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "User not found!!" });
    }

    //parolaları kıyaslıyoruz
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(500).json({ message: "Password is wrong!!" });
    }

    //token oluşturuldu
    const userToken = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    //response olarak 200, user ve userToken'i return ettik
    res.status(200).json({
      status: "OK",
      user,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
