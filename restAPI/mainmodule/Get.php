<?php

class Get{

    protected $pdo;
    protected $gm;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }

    public function file($table, $data, $condition_string){
        // so i got bored and copied the insert code..
        // and changed some stuff..
        // some arrays..
        //try
        // $profile_location = $data->profile_pic;
        $id = $_GET['id'];
        try{
            
            if($_FILES['file']['name'] != ''){
                $test = explode('.', $_FILES['file']['name']);
                $extension = end($test);    
                $allowedExts = array("jpeg", "jpg", "png");
            if ((($_FILES["file"]["type"] == "image/jpeg")
                || ($_FILES["file"]["type"] == "image/jpg")
                || ($_FILES["file"]["type"] == "image/pjpeg")
                || ($_FILES["file"]["type"] == "image/x-png")
                || ($_FILES["file"]["type"] == "image/png"))
            && ($_FILES["file"]["size"] < 200000000)
            // for 15 mb 
            // && ($_FILES["file"]["size"] < 15000)
            && in_array($extension, $allowedExts)
             )
                $name = date("Y-m-d").rand(100,999999999999).'.'.$extension;
                // $location = '../uploads/'.$name;
                $location = '../assets/recipeimages/'.$name;
                move_uploaded_file($_FILES['file']['tmp_name'], $location);
                
            }
        //     $sql_str1 = "SELECT profile_picture FROM $table WHERE id = '$id'";
            
        //     // prepare sql stmts
        //     $sql1 = $this->pdo->prepare($sql_str1);
        //    // var_dump($sql);
        //     // execute em..
        //     $sql1->execute();
        //     unlink($location);
        $sql_str = "UPDATE $table SET img_location = '$location' WHERE id = '$id'";
        // unlink($location);
        
        // prepare sql stmts
        $sql = $this->pdo->prepare($sql_str);
       // var_dump($sql);
        // execute em..
        $sql->execute();
        
            
            
            // if worked ..
            // return array("Successfully uploaded!");
        }
        // if not..
        catch(Exception $e){
            $errmsg = $e->getMessage();
            $code = 403;
        }
        // // return whatever..
        // return array("code"=>$code, "errmsg"=>$errmsg);
    }


        // get booking function
        public function get_story($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT stories.*, users.user_penname FROM stories
            JOIN users ON stories.user_id = users.id";
            if ($condition != null) {
                $sql .= " WHERE {$condition}
                ORDER BY stories.created_at DESC";
            }
    
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        }

        public function get_leaderboards($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT stories.*, users.user_penname, (SELECT count(stars.story_id) FROM stars WHERE stars.story_id = stories.id) as stars
            FROM stories 
            JOIN users ON stories.user_id = users.id
            ORDER BY stars DESC LIMIT 5";
        
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        }

        public function get_stars($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT count(story_id) as stars FROM stars";
            if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }
    
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        }

        // // get booking function
        // public function get_story($table, $condition = null){
        //     // 2-Confirm 1-Tentative 0-Cancel	
        //     $sql = "SELECT stories.*, users.user_penname FROM stories
        //     JOIN users ON stories.user_id = users.id";
        //     if ($condition != null) {
        //         $sql .= " WHERE {$condition}";
        //     }
    
        //     $res = $this->gm->executeQuery($sql);
        //     if ($res['code'] == 200) {
        //         return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
        //     }
    
        //     return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        // }

        //get my stories
        public function get_mystories($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT stories.*, users.user_penname FROM stories
            JOIN users ON users.id=stories.user_id";
            if ($condition != null) {
                $sql .= " WHERE {$condition}
                ORDER BY stories.created_at DESC";
            }
    
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        }


        public function view_recipe_details($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT recipes.*, users.fullname FROM recipes
            JOIN users ON recipes.user_id = users.id";
            if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }
    
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        }

        public function get_personal_recipe($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT recipes.*, users.fullname FROM recipes
            JOIN users ON recipes.user_id = users.id";

            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        }

        public function get_bookmarked_story($table, $condition = null){
            // 2-Confirm 1-Tentative 0-Cancel	
            $sql = "SELECT stories.*, users.user_penname FROM bookmarks JOIN stories ON bookmarks.story_id = stories.id JOIN users ON bookmarks.user_id = users.id";

            if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved Booking History", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve Booking History", $res['code']);
        }


        // get customer accounts
        public function get_account($table, $condition = null){
            $sql = "SELECT * FROM $table";
            if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }
            
            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
        }



    //     public function uploadimage($received_data)
    // {
    //     $file = $received_data['file'];
    //     $product_id = $received_data['product_id'];
    //     $location = fileuploadmodule($file);
    //     if ($location == "file exist") {
    //         $code = 403;
    //         return $this->gm->returnPayload(null, "Failed", "File already exist in the directory!", $code);
    //     } else {
    //         $data = array(
    //             "location" => $location
    //         );
    //         $result = $this->gm->update("products", $data, " WHERE id = '$product_id'");
    //         $code = 200;
    //         return $this->gm->returnPayload(null, "success", "Image Successfully uploaded!", $code);
    //     }
    // }



        // get_common for user accounts
        public function get_common($table, $condition = null){

            
            $sql = "SELECT * FROM $table";
            if($condition!=null){
                $sql .= " WHERE {$condition}";
            }
          
            $res = $this->gm->executeQuery($sql);
            if($res['code']==200){
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
            }
    
            return $this->gm->returnPayload(null, "failed", "failed to retrieve data", $res['code']);
        }




        public function username_check($received_data)
        {
            $username = $received_data->username;
    
            $sql = "SELECT username 
            FROM cdm_guest
            WHERE username = '$username'";
    
            $stmt = $this->pdo->prepare($sql);
            try {
                $stmt->execute();
                if ($stmt->rowCount() == 0) {
                    return $this->gm->returnPayload(null, 'success', 'Username available', 200);
                } else {
                    $code = 401;
                    $remarks = "failed";
                    $message = "Username unavailable";
                    $payload = null;
                    return $this->gm->returnPayload($payload, $remarks, $message, $code);
                }
            } catch (Exception $e) {
                $code = 401;
                $remarks = "failed";
                $message = "Invalid username or password.";
                $payload = null;
                return $this->gm->returnPayload($payload, $remarks, $message, $code);
            }
        }
}