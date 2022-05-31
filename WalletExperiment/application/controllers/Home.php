<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index()
	{
		$_SESSION['group'] = $_GET['group'];
		$_SESSION['pid'] = $_GET['PROLIFIC_PID'];
		$this->load->view('InformationSheet');
	}
	public function InformationSheet()
	{
		$this->load->view('Survey');

	}
	public function Survey()
	{
		$this->load->model('Wallet_model', 'Wallet');
		$this->Wallet->SaveSurvey( 
			array ( 'pid' => $_SESSION['pid'], 'demographic' => json_encode($_POST) ) 
		);
		$data['group'] = ($_SESSION['group']!=1);
		$this->load->view('CryptoWallets',$data);
	}
	public function submitApps()
	{
		$this->load->model('Wallet_model', 'Wallet');
		$this->Wallet->SaveExperiment(
			array( 'pid' => $_SESSION['pid'], 'choices' => json_encode($_POST), 'control' => ($_SESSION['group']!=1) )
		);
		print_r('success');
		return 0;
	}
	public function PostSurvey()
	{
		$this->load->view('PostSurvey');
	}
	public function Finish()
	{
		$this->load->model('Wallet_model', 'Wallet');
		$this->Wallet->SavePostSurvey(
			array( 'pid' => $_SESSION['pid'], 'PostSurvey' => json_encode($_POST) )
		);
		$this->load->view('Finish');
	}
}
