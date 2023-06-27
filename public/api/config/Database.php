<?

require_once("config.php");

class DatabaseService
{
  private $db_host;
  private $db_name;
  private $db_user;
  private $db_password;
  private $connection;
  public function getConnection(string $variant = "NORMAL" | "ARCHIVE"): null | PDO
  {
    $this->connection = null;
    $this->db_host = null;
    $this->db_name = null;
    $this->db_user = null;
    $this->db_password = null;

    if ($variant == "ARCHIVE") {
      $this->db_host = ARCHIVE_DB_HOST;
      $this->db_name = ARCHIVE_DB;
      $this->db_user = ARCHIVE_DB_USER;
      $this->db_password = ARCHIVE_DB_PASS;
    }
    if ($variant == "NORMAL") {
      $this->db_host = DB_HOST;
      $this->db_name = DB;
      $this->db_user = DB_USER;
      $this->db_password = DB_PASS;
    }
    if ($this->db_host == null) return null;
    if ($this->db_name == null) return null;
    if ($this->db_user == null) return null;
    if ($this->db_password == null) return null;

    try {
      if ($variant == "ARCHIVE" || $variant == "NORMAL") {
        $this->connection = new PDO("mysql:host=" . $this->db_host . ";dbname=" . $this->db_name . ";charset=utf8", $this->db_user, $this->db_password);
      }
    } catch (PDOException $ex) {
      echo "Connection failed: " . $ex->getMessage();
      return null;
    }

    return $this->connection;
  }
}
