const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt; 

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não encontrado. Acesso não autorizado.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); 
    req.usuario = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ mensagem: 'Token inválido. Acesso não autorizado.' });
  }
};

module.exports = verifyToken;
