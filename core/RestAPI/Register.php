<?php

/**
 * Register Rest Routes
 *
 */

namespace ReactJS\DataList\RestAPI;

use ReactJS\DataList\Model\DataList;
use WP_REST_Request;
use WP_REST_Response;

class Register {

	public $namespace;

	public function __construct() {
		$this->namespace = 'rdlist/v1/';
	}

	public function init() {
		add_action( 'rest_api_init', [ $this, 'register_get_lists' ] );
		add_filter( 'rdlist_l10n', [ $this, 'add_rest_routes' ] );
	}

	public function register_get_lists() {
		register_rest_route( $this->namespace, '/get-lists', array(
			'methods'             => 'POST',
			'callback'            => [ $this, 'get_lists' ],
			'permission_callback' => '__return_true',
		) );
		register_rest_route( $this->namespace, '/create-list', array(
			'methods'             => 'POST',
			'callback'            => [ $this, 'create_list' ],
			'permission_callback' => '__return_true',
		) );
		register_rest_route( $this->namespace, '/update-list', array(
			'methods'             => 'POST',
			'callback'            => [ $this, 'update_list' ],
			'permission_callback' => '__return_true',
		) );

		/**
		 * Form Builder
		 */

		register_rest_route( $this->namespace, '/save-form-fields', array(
			'methods'             => 'POST',
			'callback'            => [ $this, 'save_form_fields' ],
			'permission_callback' => '__return_true',
		) );


		register_rest_route( $this->namespace, '/get-form-fields', array(
			'methods'             => 'POST',
			'callback'            => [ $this, 'get_form_fields' ],
			'permission_callback' => '__return_true',
		) );
	}

	public function get_lists( WP_REST_Request $request ) {
		$list_model = new DataList();

		$current_page = (int) $request->get_param( 'current_page' );
		$search_term  = $request->get_param( 'search_term' );
		if ( $current_page ) {
			$list_model->current_page = $current_page;
		}
		$list_model->search_term = $search_term;

		return $this->send_response( array_merge( [ 'success' => true ], $list_model->paginate() ) );
	}

	public function create_list( WP_REST_Request $request ) {
		$list_title       = sanitize_text_field( $request->get_param( 'list_title' ) );
		$description      = sanitize_text_field( $request->get_param( 'description' ) );
		$current_datetime = current_time( 'mysql' );

		if ( empty( $list_title ) ) {
			return $this->send_response( [ 'success' => false ] );
		}

		$list_data = [
			'user_id'     => get_current_user_id(),
			'list_title'  => $list_title,
			'description' => $description,
			'list_status' => 'publish',
			'created_at'  => $current_datetime,
			'updated_at'  => $current_datetime,
		];

		$list_model = new DataList();
		$list_model->save( $list_data );

		return $this->send_response( array_merge( [ 'success' => true ], $list_model->paginate() ) );
	}

	public function update_list( WP_REST_Request $request ) {
		$list_ID       = sanitize_text_field( $request->get_param( 'list_ID' ) );
		$list_title       = sanitize_text_field( $request->get_param( 'list_title' ) );
		$description      = sanitize_text_field( $request->get_param( 'description' ) );

		if ( empty( $list_title ) ) {
			return $this->send_response( [ 'success' => false ] );
		}

		$list_data = [
			'list_ID'  => $list_ID,
			'list_title'  => $list_title,
			'description' => $description,
			'updated_at'  => current_time( 'mysql' ),
		];

		$list_model = new DataList();
		$list_model->save( $list_data );

		return $this->send_response( array_merge( [ 'success' => true ] ) );
	}

	/**
	 * Save form fields
	 *
	 * @param  WP_REST_Request  $request
	 *
	 * @return WP_REST_Response
	 */

	public function save_form_fields( WP_REST_Request $request ) {
		$fields = sanitize_text_field( $request->get_param( 'fields' ) );

		update_option( 'rdlist_form_fields', $fields );

		return $this->send_response( [ 'success' => true ] );
	}

	public function get_form_fields(){
		$fields = get_option( 'rdlist_form_fields', '[]' );

		return $this->send_response( [ 'success' => true, 'fields' => wp_unslash( $fields ) ] );
	}


	public function send_response( $data ) {
		return new WP_REST_Response( $data, 200 );
	}

	public function add_rest_routes( $l10n ) {
		$l10n['rest_routes'] = [
			'get_lists'   => $this->rest_url( 'get-lists' ),
			'create_list' => $this->rest_url( 'create-list' ),
			'update_list' => $this->rest_url( 'update-list' ),
			'save_form_fields' => $this->rest_url( 'save-form-fields' ),
			'get_form_fields' => $this->rest_url( 'get-form-fields' ),
		];

		return $l10n;
	}

	public function rest_url( $slug ) {
		return get_rest_url( null, $this->namespace . $slug );
	}

}