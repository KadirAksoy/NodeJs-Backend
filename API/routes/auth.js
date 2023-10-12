const express = require("express");
const { register, login } = require("../controller/auth.js");

// Gelen http isteklerini url'e göre yönlendirme işlemleri yapılır.
const router = express.Router();

//post işlemleri // register ve login fonksiyonlarını kullanma işlemi
router.post("/register", register);
router.post("/login", login);

//dışarı aktarma
module.exports = router;
