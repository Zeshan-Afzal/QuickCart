const sendShopAccessToken = async (shop, statuCode, message, res) => {
  const shopAccessTokon = shop.getAccessToken();

  const cookieOptions = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  return res
    .status(statuCode)
    .cookie("shop_token", shopAccessTokon, cookieOptions)
    .json({
      success: true,
      shop,
      message,
      shopAccessTokon,
    });
};

export default sendShopAccessToken;
