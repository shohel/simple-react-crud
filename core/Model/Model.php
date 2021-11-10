<?php

/**
 * Base Model class
 * Responsible for interacting with database.
 *
 */

namespace ReactJS\DataList\Model;

class Model {

	/**
	 * Database Properties
	 */

	protected $db;
	protected $table;

	/**
	 * Pagination Properties
	 */

	public $total;
	public $start;
	public $per_page;
	public $search_term;
	public $current_page;

	public function __construct() {
		global $wpdb;

		$this->db = $wpdb;

		if ( ! empty( $this->table ) ) {
			$this->table = $wpdb->prefix . $this->table;
		} else {
			$this->table = $wpdb->prefix . strtolower( ( new \ReflectionClass( $this ) )->getShortName() );
		}

		$this->total        = 0;
		$this->start        = 0;
		$this->per_page     = 10;
		$this->search_term  = '';
		$this->current_page = 1;
	}

	public function get_limit_sql() {
		return $this->db->prepare( " LIMIT %d, %d ", $this->start, $this->per_page );
	}

	public function get_items() {
		return [];
	}

	public function paginate() {
		$data = $this->get_items();

		$from = intval( ( $this->current_page - 1 ) * $this->per_page + 1 );

		return [
			'total'        => intval( $this->total ),
			'per_page'     => intval( $this->per_page ),
			'current_page' => intval( $this->current_page ),
			'total_pages'  => intval( ceil( $this->total / $this->per_page ) ),
			'from'         => $from,
			'to'           => intval( $from + $this->per_page - 1 ),
			'data'         => $data,
		];
	}

}
