<?php

class Rest {
    
    const API_BASE  = "http://www.admin.rolls-royce/svc/";
    public $controller;
    public $action;
    public $request_data;
    public $data;
    public $service_url;
    public $method;

    public function __construct() {

        $this->request_data = json_decode(file_get_contents('php://input'));
        $this->method =  $_SERVER['REQUEST_METHOD'];
        $this->process_request();
        $this->process_input();
        $this->handler();
        
    }
    
    private function process_request(){
        if(is_object($this->request_data)){
            $this->controller = isset($this->request_data->basic->controller) ? $this->request_data->basic->controller : '';
            $this->action = isset($this->request_data->basic->action) ? $this->request_data->basic->action : '';
            $this->data = isset($this->request_data->formdata) ? $this->request_data->formdata : '';
            $this->data = (array) $this->data;
            
        }
           
    }

    private function handler() {
        $this->service_url = self::API_BASE . $this->controller . "/" . $this->action;
        $json = $this->receive_data();
        echo $json;
        exit;
    }

    private function receive_data() {

        //invoking curl
        $ch = curl_init();
        //set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $this->service_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $this->data);
        //execute post
        $result = curl_exec($ch);
        //echo '<pre/>';print_r($result);
        //close connection
        curl_close($ch);
        return $result;
    }

    private function process_input() {
        $fields_string = '';
        foreach($this->data as $key => $value) {
            if($fields_string != ''){
               $fields_string .=  '&';
            }
            $fields_string .= $key.'='.$value;
            
        }
        $this->data  = $fields_string;
    }

}

$Rest = new Rest();

