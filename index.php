<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");




include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($user);
        break;
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO users(id,name,email,mobile,created_at) VALUES(null,:name,:email,:mobile,:created_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->Email);
        $stmt->bindParam(':mobile', $user->Mobile);
        $stmt->bindParam(':created_at', $user->created_at);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'failed to create record'];
        }
        return json_encode($response);
        break;
    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if ($path[3] === "mass-delete") {

            $requestData = json_decode(file_get_contents('php://input'), true);
            $ids = $requestData['ids'];

            if (!empty($ids)) {
                $idList = implode(",", $ids);
                $sql = "DELETE FROM users WHERE id IN ($idList)";
                $stmt = $conn->prepare($sql);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Records deleted successfully'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete records'];
                }
            } else {
                $response = ['status' => 0, 'message' => 'No records selected for deletion'];
            }
            echo json_encode($response);
        } else {
            $sql = "DELETE FROM users WHERE id= :id";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":id", $path[3]);
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'failed to create record'];
            }
            return json_encode($response);
            break;
        }
}
