<?php

function getToken()
{
  $bearerToken = null;
  if (isset($_SERVER['AUTHORIZATION'])) {
    $bearerToken = $_SERVER['AUTHORIZATION'];
  } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
    $bearerToken = $_SERVER["HTTP_AUTHORIZATION"];
  } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
    $bearerToken = $_SERVER["REDIRECT_HTTP_AUTHORIZATION"];
  } else {
    $headers = apache_request_headers();
    foreach ($headers as $header => $value) {
      if ($header == "Authorization") {
        $bearerToken = $value;
      }
    }
  }
  return $bearerToken;
}
