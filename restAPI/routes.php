<?php
require_once "./config/Connection.php";
require_once "./mainmodule/Get.php";
require_once "./mainmodule/Auth.php";
require_once "./mainmodule/Global.php";

$db = new Connection();
$pdo = $db->connect();
$global = new GlobalMethods($pdo);
$get = new Get($pdo);
$auth = new Auth($pdo);

if(isset($_REQUEST['request'])){
    $req = explode('/', rtrim($_REQUEST['request'], '/'));
}
else{
    $req = array("errorcatcher");
}

switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        switch($req[0]){
//testing
// user-side functions  31/03/23

            // case 'fileupload':
            //     $data = [
            //         'file' => $_FILES,
            //         'product_id' => $_REQUEST['product_id']
            //     ];
            //     echo json_encode($auth->uploadimage($data));
            // break;

            case 'accountRegister':
                echo json_encode($auth->register($data));
                break;

            case 'login':
                echo json_encode($auth->login($data));
                break;
            
            case 'createstory':
                echo json_encode($global->insert("stories",$data));
            break;

            case 'addtobookmark':
                echo json_encode($global->insert("bookmarks",$data));
            break; 

            case 'addtostar':
                echo json_encode($global->insert("stars",$data));
            break; 

            case 'deletebookmark':
                if(count($req)>1){
                    echo json_encode($global->delete('bookmarks', "story_id = '$req[1]' AND user_id = '$req[2]'"));
                }
            break;

            case 'deletestar':
                if(count($req)>1){
                    echo json_encode($global->delete('stars', "story_id = '$req[1]' AND user_id = '$req[2]'"));
                }
            break;

            case 'deletestory':
               echo json_encode($global->update('stories', $data));
            break;

            case 'updateFontSize':
                echo json_encode($global->update('users', $data));
             break;

            case 'checkBookmark':
                if (count($req) > 1) {
                    echo json_encode($get->get_common('bookmarks', "story_id = '$req[1]' AND user_id = '$req[2]'"));
                }
                break;
                
            case 'checkStar':
                if (count($req) > 1) {
                    echo json_encode($get->get_common('stars', "story_id = '$req[1]' AND user_id = '$req[2]'"));
                }
                break;

            case 'addImagefile':
                // if (count($req) > 1) {
                echo json_encode($get->file());
                // }
            break;

            case 'addStory':
                echo json_encode($get->addStory("stories", $data));
                break;

            case 'addStoryWithPic':
                echo json_encode($get->addStoryWithPic("stories", $data));
                break;

            case 'editStoryPic':
                // if (count($req) > 1) {
                echo json_encode($get->editStoryPic("WHERE id = '$req[1]'"));
                // }
            break;

            case 'editUserPic':
                // if (count($req) > 1) {
                echo json_encode($get->editUserPic("WHERE id = '$req[1]'"));
                // }
            break;


            case 'addComment':
                echo json_encode($global->insert("comments", $data));
                break;

            case 'editStory':
                echo json_encode($global->update2("stories", $data));
            break;

            case 'updateStory':
                echo json_encode($global->editStory("stories", $data));
            break;

            case 'updateProfile':
                echo json_encode($global->update('users', $data, NULL));
            break;

            case 'getaccount':
                echo json_encode($get->get_common('users', "id = '$req[1]'"));
            break;

    
                

            case 'username_check':
                // $data = [];
                echo json_encode($get->username_check($data));

                break;

            case 'updateUserPassword':
                echo json_encode($auth->updatePassword($data));
            break;

            case 'fileupload':
                $data = [
                    'file' => $_FILES,
                    'id' => $_REQUEST['id']
                ];
                echo json_encode($global->uploadimage($data));
                break;

            default:
                echo "request not found";
            break;
        }
    break;
    
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            switch($req[0]){
                 // update customer profile request
                    

                    default:
                        echo "request not found";
                    break;
            }
        break;

        case 'GET':
            $data = json_decode(file_get_contents("php://input"));
            switch($req[0]){
                 // update customer profile request
                    
                case 'getstoryblocks':
                    if(count($req)>1){
                        echo json_encode($get->get_story('stories', "status='active' and user_id = '$req[1]'"));
                    }
                    else{
                        echo json_encode($get->get_story('stories', "status='active'"));
                    }   
                break;

                case 'getFilteredStories':
                    echo json_encode($get->get_story('stories', "story_category = '$req[1]' AND status='active'"));
                break;

                case 'getLeaderboardFilteredStories':
                    echo json_encode($get->get_leaderboards('stories', "story_category = '$req[1]' AND status='active'"));
                break;

                case 'getleaderboards':
                    echo json_encode($get->get_leaderboards('stories', "status='active'"));
                break;

                 case 'getstorystars':
                    if(count($req)>1){
                        echo json_encode($get->get_stars('stars', "story_id = '$req[1]'"));
                    }
                    else{
                        echo json_encode($get->get_stars('stars'));
                    }   
                break;

                case 'getmystoryblocks':
                    if(count($req)>1){
                        echo json_encode($get->get_mystories('stories', "status='active' and stories.user_id = '$req[1]'"));
                    } 
                break;

                case 'getBookmarkedStory':
                    if(count($req)>1){
                        echo json_encode($get->get_bookmarked_story('bookmarks', "bookmarks.user_id = '$req[1]' AND status='active'"));
                    }
                break;

                case 'getComments':
                        echo json_encode($get->getComments("stories.id = '$req[1]'"));
                    break;

                case 'getProfileData':
                        echo json_encode($get->get_common("users", "id='$req[1]'"));
                    break;

                case 'getUserFontSize':
                    echo json_encode($get->get_common("users", "id='$req[1]'"));
                break;

                    




                    default:
                        echo "request not found";
                    break;
            }
        break;





    default:
        echo "failed request";
    break;
}


