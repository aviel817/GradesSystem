module.exports = (req, res, next) => {
    if (!req.session.isAuth)
    {
        return res.status(400).send()
    }
    next()
  };