<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost/");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");


include_once 'DbConnect.php';
include_once 'Product.php';
include_once 'ProductOperation.php';
include_once 'ProductFactory.php';

$objDb = new DbConnect;
$conn = $objDb->getConnection();

$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case "GET":
        $sql = "SELECT * FROM products";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($user);
        break;

    case "POST":
        $user = json_decode(file_get_contents('php://input'), true);
        $requestData = json_decode(file_get_contents('php://input'), true);


        if (isset($requestData['deleteOperation']) && $requestData['deleteOperation'] === true) {
            $ids = $requestData['ids'];

            if (!empty($ids)) {
                $idList = implode(",", $ids);
                $sql = "DELETE FROM products WHERE id IN ($idList)";
                $stmt = $conn->prepare($sql);

                if ($stmt->execute()) {
                    http_response_code(204);
                    echo json_encode([]);
                } else {
                    http_response_code(500);
                    echo json_encode(['status' => 0, 'message' => 'Failed to delete records']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['status' => 0, 'message' => 'No records selected for deletion']);
            }
        } else {


            if (!isset($user['ProductType'])) {
                $user['ProductType'] = null;
            }
            $sql = "INSERT INTO products(id,SKU,Name,Price,Size,Weight,Height,Width,Length) VALUES(null,:SKU,:Name,:Price,:Size,:Weight,:Height,:Width,:Length)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':SKU', $user['SKU']);
            $stmt->bindParam(':Name', $user['Name']);
            $stmt->bindParam(':Price', $user['Price']);

            $stmt->bindParam(':Size', $user['Size']);
            $stmt->bindParam(':Weight', $user['Weight']);
            $stmt->bindParam(':Height', $user['Height']);
            $stmt->bindParam(':Width', $user['Width']);
            $stmt->bindParam(':Length', $user['Length']);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'failed to create record'];
            }
            echo json_encode($response);
        }
        break;
}
