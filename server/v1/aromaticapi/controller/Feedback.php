<?php

require_once('db.php');

try {
    $writeDB = DB::connectWriteDB();
} catch (PDOException $ex) {
    error_log("Connection error -".$ex,0);
    exit;
}

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
   $res = array();
   header('Content-type: application/json; charset=UTF-8 ');
   $res["status"] = 405;
   $res["msg"] = "Method Not allowed";
   echo json_encode($res);
    exit;
}


if($_SERVER['CONTENT_TYPE'] !== 'application/json'){
    $res = array();
    header('Content-type: application/json; charset=UTF-8 ');
    $res["status"] = 400;
    $res["msg"] = "Content type is not JSON";
    echo json_encode($res);
    exit;
}

$rawPostData = file_get_contents('php://input');

if(!$jsonData = json_decode($rawPostData)){
    $res = array();
    header('Content-type: application/json; charset=UTF-8 ');
    $res["status"] = 400;
    $res["msg"] = "Request Body is not valid JSON";
    exit;
}
$response = array();
try {
    $query = $writeDB->prepare("insert into feedback (CustName, Custemail, CustMob, q1, q2, q3, q4) values(:name, :email, :mob, :q1, :q2, :q3, :q4)");
    $query->bindParam(":name", $jsonData->customerName, PDO::PARAM_STR);
    $query->bindParam(":email", $jsonData->customerEmail, PDO::PARAM_STR);
    $query->bindParam(":mob", $jsonData->customerMobile, PDO::PARAM_STR);
    $query->bindParam(":q1", $jsonData->Q1, PDO::PARAM_STR);
    $query->bindParam(":q2", $jsonData->Q2, PDO::PARAM_STR);
    $query->bindParam(":q3", $jsonData->Q3, PDO::PARAM_STR);
    $query->bindParam(":q4", $jsonData->Q4, PDO::PARAM_STR);
    $query->execute();

    $rowCount = $query->rowCount();
    if($rowCount === 0){
        header('Content-type: application/json; charset=UTF-8 ');
        $response["status"] = 500;
        $response["msg"] = "Failed to add task";
        echo json_encode($response);
        exit;
    }
    
    $response["status"] = 200;
    $response["msg"] = "Form submitted successfully!!";
    header('Content-type: application/json; charset=UTF-8 ');
    echo json_encode($response);

} catch (PDOException $ex) {
    error_log("Database query error - ".$ex,0);
    exit;
    
}


?>