<?php

require_once('db.php');

try {
    $readDB = DB::connectReadDB();
} catch (PDOException $ex) {
    error_log("Connection error -".$ex,0);
    exit;
}


if($_SERVER['REQUEST_METHOD'] === 'GET'){
    try {
        $query = $readDB->prepare('select * from feedback');
        $query->execute();
    
        $rowCount = $query->rowCount();
    
        $returnFeed = array();
    
        if($rowCount === 0){
            header('Content-type: application/json; charset=UTF-8 ');
            $returnFeed['status'] = 404;
            $returnFeed['msg'] = "No Data Found";
            $returnFeed['feed'] = null;
            echo json_encode($returnFeed);
            exit;
        }
    
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $feedarray = array();
            $feedarray['Cname'] = $row['CustName'];
            $feedarray['Cemail'] = $row['Custemail'];
            $feedarray['Cmob'] = $row['CustMob'];
            $feedarray['q1'] = $row['q1'];
            $feedarray['q2'] = $row['q2'];
            $feedarray['q3'] = $row['q3'];
            $feedarray['q4'] = $row['q4'];
    
            $tempFeed[] = $feedarray;
        }
    
        header('Content-type: application/json; charset=UTF-8 ');
            $returnFeed['status'] = 200;
            $returnFeed['msg'] = "Data Found Success";
            $returnFeed['feed'] = $tempFeed;
            echo json_encode($returnFeed);
            exit;
    
    
    } catch (PDOException $ex) {
        error_log("Database query error - ".$ex,0);
        exit;
    }    
 }else{
    header('Content-type: application/json; charset=UTF-8 ');
    $res = array();
    $res['status'] = 405;
    $res['msg'] = "Method Not allowed";
    echo json_encode($res);
    exit();
 }
 








?>