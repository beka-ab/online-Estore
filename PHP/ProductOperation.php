<?php
include_once 'Product.php';
class ProductOperation extends Product
{
    public function save(PDO $conn)
    {
        $sql = "INSERT INTO products(id,SKU,Name,Price,Size,Weight,Height,Width,Length) VALUES(null,:SKU,:Name,:Price,:Size,:Weight,:Height,:Width,:Length)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':SKU', $this->SKU);
        $stmt->bindParam(':Name', $this->Name);
        $stmt->bindParam(':Price', $this->Price);
        $stmt->bindParam(':Size', $this->Size);
        $stmt->bindParam(':Weight', $this->Weight);
        $stmt->bindParam(':Height', $this->Height);
        $stmt->bindParam(':Width', $this->Width);
        $stmt->bindParam(':Length', $this->Length);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'failed to create record'];
        }

        return json_encode($response);
    }
}