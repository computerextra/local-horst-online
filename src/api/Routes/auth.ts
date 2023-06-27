import request from "../connector";
import deleteToken from "../functions/deleteToken";

type authResponse =
  | { message: "Access Granted" }
  | { message: "Access denied"; error: string };

type loginResponse =
  | { message: "Login failed" }
  | {
      message: "Successful Login";
      jwt: string;
      username: string;
      name: string;
      expireAt: string;
    };

const auth = {
  auth: (Token: string) =>
    request.post<authResponse>("/auth/auth.php", {
      Authorization: "JWT " + Token,
    }),
  login: (body: BodyInit) =>
    request.post<loginResponse>("/auth/login.php", body),
  logout: () => deleteToken(),
};

export default auth;
