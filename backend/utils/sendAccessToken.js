const sendAccessToken = async (user, statuCode, message, res) => {
  const accessTokon = user.getAccessToken();

  const cookieOptions = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  return res
    .status(statuCode)
    .cookie("accessToken", accessTokon, cookieOptions)
    .json({
      success: true,
      user,
      message,
      accessTokon,
    });
};

export default sendAccessToken;
