<?php

class Get{

    protected $pdo;
    protected $gm;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
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
            JOIN users ON stories.user_id = users.id";
        
            if ($condition != null) {
                $sql .= " WHERE {$condition}
                ORDER BY stars DESC LIMIT 3";
            }

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

        public function addStory($table, $received_data)
        {
            $user_id = $received_data->user_id;
            $title = $received_data->story_title;
            $category = $received_data->story_category;
            $content = $received_data->story_content;
            $storydp = $received_data->story_dp;

            $sql = "INSERT INTO $table (user_id, story_title, story_category, story_content, story_dp) VALUES ('$user_id', '$title', '$category', '$content', '$storydp')";

            $res = $this->gm->executeQuery($sql);

            $sql = "SELECT MAX(id) AS id from $table";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $res = $stmt->fetchAll()[0];
            $order_id = $res['id'];

            $profile = array(
                "id" => $order_id
            );

            return $this->gm->returnPayload($profile, 'success', 'successfully inserted data', 200);
        }

        public function addStoryWithPic($table, $received_data)
        {
            $user_id = $received_data->user_id;
            $title = $received_data->story_title;
            $category = $received_data->story_category;
            $content = $received_data->story_content;

            $sql = "SELECT MAX(id) AS id from stories";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $res = $stmt->fetchAll()[0];
            $id = $res['id'];


            $sql = "UPDATE $table SET user_id = '$user_id', story_title = '$title' , story_category = '$category', story_content = '$content' WHERE id = $id";

            $res = $this->gm->executeQuery($sql);

            return $this->gm->returnPayload(null, 'success', 'successfully inserted data', 200);
        }

        public function editStoryPic($condition_string = null)
        {
            try {

                if ($_FILES['file']['name'] != '') {
                    $test = explode('.', $_FILES['file']['name']);
                    $extension = end($test);
                    $allowedExts = array("jpeg", "jpg", "png");
                    if ((($_FILES["file"]["type"] == "image/jpeg")
                        || ($_FILES["file"]["type"] == "image/jpg")
                        || ($_FILES["file"]["type"] == "image/pjpeg")
                        || ($_FILES["file"]["type"] == "image/x-png")
                        || ($_FILES["file"]["type"] == "image/png")))
                        $name = date("Y-m-d") . rand(100, 999999999999) . '.' . $extension;
                    // $location = '../uploads/'.$name;
                    $location = '../assets/img/' . $name;
                    $img_location = '/assets/img/' . $name;
                    move_uploaded_file($_FILES['file']['tmp_name'], $location);

                    $sql_str = "UPDATE stories set story_dp='$img_location' ";
                    $sql_str .= $condition_string;
                    $sql = $this->pdo->prepare($sql_str);
                    $sql->execute();
                    return $this->gm->returnPayload($sql_str, "success", "image saved", 200);
                }
            }
            // if not..
            catch (Exception $e) {
                $errmsg = $e->getMessage();
                $code = 403;
            }
        }

        public function file($condition_string = null)
        {

        try {

            if ($_FILES['file']['name'] != '') {
                $test = explode('.', $_FILES['file']['name']);
                $extension = end($test);
                $allowedExts = array("jpeg", "jpg", "png");
                if ((($_FILES["file"]["type"] == "image/jpeg")
                    || ($_FILES["file"]["type"] == "image/jpg")
                    || ($_FILES["file"]["type"] == "image/pjpeg")
                    || ($_FILES["file"]["type"] == "image/x-png")
                    || ($_FILES["file"]["type"] == "image/png")))
                    $name = date("Y-m-d") . rand(100, 999999999999) . '.' . $extension;
                // $location = '../uploads/'.$name;
                $location = '../assets/img/' . $name;
                $img_location = '/assets/img/' . $name;
                move_uploaded_file($_FILES['file']['tmp_name'], $location);

                $sql_str = "INSERT INTO stories (`story_dp`) VALUES ('$img_location')";
                $sql = $this->pdo->prepare($sql_str);
                $sql->execute();
                return $this->gm->returnPayload(null, "success", "image saved", 200);
            }


            // // unlink($location);

            // // prepare sql stmts
            // // var_dump($sql);
            // // execute em..
        }
        // if not..
        catch (Exception $e) {
            $errmsg = $e->getMessage();
            $code = 403;
        }
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

        public function getComments($condition = null){
            $sql = "SELECT comments.*, users.user_penname, users.user_dp
            FROM comments
            JOIN users ON users.id = comments.user_id
            JOIN stories ON stories.id = comments.story_id";

            if ($condition != null) {
                $sql .= " WHERE {$condition}";
            }

            $sql .= " ORDER BY created_at ASC";

            $res = $this->gm->executeQuery($sql);
            if ($res['code'] == 200) {
                return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved from table", $res['code']);
            }

            return $this->gm->returnPayload(null, "failed", "failed to retrieve user account details", $res['code']);
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