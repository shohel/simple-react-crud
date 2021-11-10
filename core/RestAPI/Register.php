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
	}


	public function get_lists( WP_REST_Request $request ) {
		$list_model = new DataList();

		$current_page = (int) $request->get_param( 'current_page' );
		if ( $current_page ) {
			$list_model->current_page = $current_page;
		}

		return $this->send_response( $list_model->paginate() );
	}

	public function send_response( $data ) {
		return new WP_REST_Response( $data, 200 );
	}

	public function add_rest_routes( $l10n ) {
		$l10n['rest_routes'] = [
			'get_lists' => $this->rest_url( 'get-lists' ),
		];

		return $l10n;
	}

	public function rest_url( $slug ) {
		return get_rest_url( null, $this->namespace . $slug );
	}

}