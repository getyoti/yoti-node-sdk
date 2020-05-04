module.exports = async (req, res) => {
  let error = 'An unknown error occurred';

  if (req.query.yotiErrorCode) {
    error = `Error Code: ${req.query.yotiErrorCode}`;
  }

  res.render('pages/error', { error });
};
