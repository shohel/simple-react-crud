<?php
namespace ReactJS\DataList\ShortCode;

class Load {

	public $data_list_placeholder;

	public function init() {
		$this->data_list_placeholder = ( new ListDataPlaceHolder() )->init();

		return $this;
	}

}