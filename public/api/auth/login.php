<?php
require_once("../config/config.php");
include_once("../config/Database.php");
require("../vendor/autoload.php");
require_once("../functions/auth.php");

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

include("../config/headers.php");
header("Access-Control-Allow-Methods: POST");

$username = null;
$password = null;

$databaseService = new DatabaseService();
$con = $databaseService->getConnection("NORMAL");

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;

$table_name = "users";

$query = "SELECT id, name, password FROM $table_name WHERE username= ? LIMIT 0,1";

$stmt = $con->prepare($query);
$stmt->bindParam(1, $username);
$stmt->execute();
$num = $stmt->rowCount();

if ($num > 0) {
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  $id = $row["id"];
  $name = $row["name"];
  $password_db = $row["password"];

  if (password_verify($password, $password_db)) {
    $secret_key = API_KEY;
    $issuer_claim = SERVERNAME;
    $audience_claim = "Mitarbeiter";
    $issueDate_claim = time();
    $notBefore_claim = $issueDate_claim; // Not before in Seconds
    $expire_claim = $issueDate_claim + (60 * 60); // expire time: 1 Hour
    $token = array(
      "iss" => $issuer_claim,
      "aud" => $audience_claim,
      "iat" => $issueDate_claim,
      "nbf" => $notBefore_claim,
      "exp" => $expire_claim,
      "data" => array(
        "id" => $id,
        "username" => $username,
        "name" => $name
      )
    );

    http_response_code(200);

    $jwt = JWT::encode($token, $secret_key, "HS256");
    echo json_encode(
      array(
        "message" => "Successful Login",
        "jwt" => $jwt,
        "username" => $username,
        "name" => $name,
        "expireAt" => $expire_claim
      )
    );
  } else {
    http_response_code(401);
    echo json_encode(
      array(
        "message" => "Login failed",
      )
    );
  }
}
