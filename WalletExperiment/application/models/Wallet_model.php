<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Wallet_model extends CI_Model {

	function __construct() {
	    parent::__construct();
	    $this->load->database();
	}
	public function SaveSurvey($SurveyData)
	{
                $this->db->insert('Demographic', $SurveyData);
	}
	public function SaveExperiment($ExperimentData)
	{
                $this->db->insert('Apps', $ExperimentData);
	}
	public function SavePostSurvey($PostSurveyData)
	{
                $this->db->insert('PostSurvey', $PostSurveyData);
	}
}

