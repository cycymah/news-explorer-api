const jwt = require("jsonwebtoken");

// eslint-disable-next-line consistent-return
module.exports.autoriz = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Нужно авторизироваться" });
  }
  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, "key-secret");
  } catch (err) {
    return res.status(401).send({ message: "Нет атворизации" });
  }
  req.user = payload;
  next();
};
