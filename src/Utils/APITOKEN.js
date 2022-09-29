import axios from "axios";
import qs from "qs";
const getAuthorizationHeader = async () => {
  const parameter = {
    grant_type: "client_credentials",
    client_id: "cc86418520-4ecb892b-0c39-42bf",
    client_secret: "bf01a5eb-436d-487b-8302-d55e95fdf57a",
  };

  let auth_url = `https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token`;
  try {
    let res = await axios({
      method: "POST",
      url: auth_url,
      data: qs.stringify(parameter),
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
    let myToken = res.data.access_token;
    return {
      authorization: `Bearer ${myToken}`,
    };
  } catch (err) {
    return err;
  }
};

export default getAuthorizationHeader;