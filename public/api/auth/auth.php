<?php

require_once("../config/config.php");
include_once("../config/Database.php");
require("../vendor/autoload.php");
require_once("../functions/auth.php");

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

include("../config/headers.php");
header("Access-Control-Allow-Methods: POST");

$secret_key = API_KEY;

$jwt = null;
$databaseService = new DatabaseService();
$con = $databaseService->getConnection("NORMAL");

$data = json_decode(file_get_contents("php://input"));

$authHeader = getToken();

$arr = explode(" ", $authHeader);

if (is_array($arr)) {
  $jwt = $arr[1];
}

if ($jwt != null) {
  try {
    $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));

    echo json_encode((array(
      "message" => "Access granted"
    )));
  } catch (Exception $e) {
    http_response_code(401);
    echo json_encode(array(
      "message" => "Access denied",
      "error" => $e->getMessage()()
    ));
  }
}
