<?php
    class Auth{
        protected $pdo;
        protected $gm;

        public function __construct(\PDO $pdo)
        {
            $this->pdo = $pdo;
            $this->gm = new GlobalMethods($pdo);
        }

        private function check_password($password, $existing_hash){
            $hash = crypt($password, $existing_hash);
            if($hash === $existing_hash){
                return true;
            }
            return false;
        }
        
        private function encrypt_password($password_string){
            $hash_format = "$2y$10$";
            $salt_length = 22;
            $salt = $this->generate_salt($salt_length);
            return crypt($password_string, $hash_format . $salt);
        }

        private function generate_salt($length){
            $urs = md5(uniqid(mt_rand(), true));
            $b64_string = base64_encode($urs);
            $mb64_string = str_replace('+', '.', $b64_string);
            return substr($mb64_string, 0, $length);
        }

        private function generate_token($id){
            $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
            $payload = json_encode(['id' => $id]);
            $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
            $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
            $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
            $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
            $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
            return $jwt;
        }

        public function register($received_data){
            $received_data->password = $this->encrypt_password($received_data->password);
            $res = $this->gm->insert("users", $received_data); 
            if($res['code']==200){
                return $this->gm->returnPayload(null, 'success', 'successfully inserted data', $res['code']);
            }
            return $this->gm->returnPayload(null, 'failed', 'failed to insert data', $res['code']);
        }

        public function adminregister($received_data){
            $received_data->password = $this->encrypt_password($received_data->password);
            $res = $this->gm->insert("admin_tbl", $received_data); 
            if($res['code']==200){
                return $this->gm->returnPayload(null, 'success', 'successfully inserted data', $res['code']);
            }
            return $this->gm->returnPayload(null, 'failed', 'failed to insert data', $res['code']);
        }

        public function login($received_data){
            $email = $received_data->user_email; 
            $pword = $received_data->password;
            $sql = "SELECT * FROM users WHERE user_email = ? ";
            $stmt = $this->pdo->prepare($sql);
            try{
                $stmt->execute([$email]);
                if($stmt->rowCount()>0){
                    $res = $stmt->fetchAll()[0];
                    if($this->check_password($pword, $res['password'])){
                       $id = $res['id'];
                       $fname = $res['user_fname'];
                       $lname = $res['user_lname'];
                       $penname = $res['user_penname'];
                       $token = $this->generate_token($res['id']);

                       $code = 200;
                       $remarks = "success";
                       $message = "Logged in successfully.";
                       $payload = array("id"=>$id, "user_fname"=>$fname, "user_lname"=>$lname, "user_penname"=>$penname, "token"=>$token);
                        
                       return $this->gm->returnPayload($payload, $remarks, $message, $code);

                    }
                    else{
                        $code = 401;
                        $remarks = "failed";
                        $message = "Invalid username or password.";
                        $payload = null;    
                    }
                }
                else {
                    $code = 401;
                    $remarks = "failed";
                    $message = "Invalid username or password.";
                    $payload = null;
                }
            }
            catch(Exception $e){
                $code = 401;
                $remarks = "failed";
                $message = "Invalid username or password.";
                $payload = null;
            }
            return $this->gm->returnPayload($payload, $remarks, $message, $code);
        }

        public function adminlogin($received_data){
            $email = $received_data->email; 
            $pword = $received_data->password;
            $sql = "SELECT * FROM admin_tbl WHERE email = ? ";
            $stmt = $this->pdo->prepare($sql);
            try{
                $stmt->execute([$email]);
                if($stmt->rowCount()>0){
                    $res = $stmt->fetchAll()[0];
                    if($this->check_password($pword, $res['password'])){
                       $id = $res['adminnum'];
                       $token = $this->generate_token($res['adminnum']);

                       $code = 200;
                       $remarks = "success";
                       $message = "Logged in successfully.";
                       $payload = array("id"=>$id, "token"=>$token);
                        
                       return $this->gm->returnPayload($payload, $remarks, $message, $code);

                    }
                    else{
                        $code = 401;
                        $remarks = "failed";
                        $message = "Invalid username or password.";
                        $payload = null;    
                    }
                }
                else {
                    $code = 401;
                    $remarks = "failed";
                    $message = "Invalid username or password.";
                    $payload = null;
                }
            }
            catch(Exception $e){
                $code = 401;
                $remarks = "failed";
                $message = "Invalid username or password.";
                $payload = null;
            }
            return $this->gm->returnPayload($payload, $remarks, $message, $code);
        }


        public function updatePassword($received_data){
            $guest_id = $received_data->id;
            // $password = $received_data->password;
            // $password = $received_data->$this->encrypt_password($received_data->password);
            // $received_data->password = $this->encrypt_password($received_data->password);

            // $sql = "UPDATE $table SET password = 'try' WHERE id = $id";
            // $stmt = $this->pdo->prepare($sql);
            // $stmt->execute();

            $data = array(
                "password" => $this->encrypt_password($received_data->password)
            );

            $result = $this->gm->updatePass("cdm_guest", $data, "WHERE id = '$guest_id'"); 
            if ($result['code'] == 200) {
                return $this->gm->returnPayload(null, 'success', 'Successfully updated products table for editing', $result['code']);
            } else {
                $code = 401;
                $remarks = "failed";
                $message = "Failed adding in user_profiles table";
                $payload = $received_data;
                return $this->gm->returnPayload($payload, $remarks, $message, $code);
            }
        }
    }
?>