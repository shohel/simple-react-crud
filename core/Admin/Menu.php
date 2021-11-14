<?php
namespace ReactJS\DataList\Admin;

class Menu {

	public function addMenuItems() {

		add_menu_page( __( 'Data List', 'reactjs-data-list' ), __( 'Data List', 'reactjs-data-list' ), 'manage_options',
			'reactjs-data-list', [ $this, 'data_list_dashboard' ], 'dashicons-list-view', 30 );


		add_submenu_page( 'reactjs-data-list', __( 'Dynamic Form', 'reactjs-data-list' ), __( 'Dynamic Form', 'reactjs-data-list' ), 'manage_options',
			'reactjs-dynamic-form', [ $this, 'dynamic_form' ] );
	}

	public function data_list_dashboard() {
		include RDLIST_PATH . 'core/Admin/views/dashboard.php';
	}

	public function dynamic_form(){
		include RDLIST_PATH . 'core/Admin/views/dynamic_form.php';
	}

}
