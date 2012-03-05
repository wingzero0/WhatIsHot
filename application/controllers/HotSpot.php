<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class HotSpot extends CI_Controller {
	/* getting or setting the hotspot from this class
	 **/
	function __construct(){
		parent::__construct();
		//$this->load->library('session');
		$this->load->database();
	}

	private function CheckPostField($ret_array, $fields){
		foreach($fields as $i => $name)
			if ( !isset($_POST[$name]) ){
				$ret_array["error_msg"] = "please specify the $name in post method";
				echo json_encode($ret_array);
				return false;
			}
		return true;
	}
	public function GetHotSpot(){
		$postFields = array("minLat", "minLong", "maxLat", "maxLong");
		$ret_array["result"] = false;
		$ret_array["error_msg"] = null;
		
		if ( ! $this->CheckPostField($ret_array, $postFields) ){
			return false;
		} 
		$sql = sprintf(
			"select * from `Activity` 
			where `Lat` >= %f and `Lat` <= %f and `Long` >= %f and `Long` <= %f", 
			$_POST["minLat"], $_POST["maxLat"], $_POST["minLong"], $_POST["maxLong"]
		);
		$query = $this->db->query($sql);

		$ret_array["num"] = $query->num_rows();

		if ($query->num_rows() > 0){
			$i= 0;
			foreach ($query->result() as $row)
			{
				$ret_array["spot"][$i]["lat"] = $row->Lat;
				$ret_array["spot"][$i]["long"] = $row->Long;
				$ret_array["spot"][$i]["title"] = $row->Title;
				$ret_array["spot"][$i]["description"] = $row->Description;
				$ret_array["spot"][$i]["start"] = $row->StartTime;
				$ret_array["spot"][$i]["end"] = $row->EndTime;
				$i++;
			}
		}
		$ret_array["result"] = true;
		echo json_encode($ret_array);
	}

	public function index()
	{
		$this->load->view('welcome_message');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
