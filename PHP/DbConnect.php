<?php

class DbConnect
{
    private $server = 'localhost';
    private $port = "3306";
    private $dbname = 'id21665119_productslist';
    private $user = 'id21665119_bekaab';
    private $pass = 'Beka_12345';
    private $conn;

    public function __construct()
    {
        $this->connect();
    }

    public function connect()
    {
        try {
            $this->conn = new PDO('mysql:host=' . $this->server . ';port=' . $this->port . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
            die();
        }
    }

    public function getConnection()
    {
        if (!$this->conn) {
            $this->connect();
        }
        return $this->conn;
    }
}
