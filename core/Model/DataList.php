<?php

/**
 * Responsible for interacting with database.
 *
 */

namespace ReactJS\DataList\Model;

class DataList extends Model {

	protected $table = 'rd_lists';

	public function get_items() {

		if ( ! empty( $this->search_term ) ) {
			$this->search_sql = " AND ( list_title LIKE '%{$this->search_term}%' ) ";
		}

		$this->total = $this->db->get_var( " 
			SELECT COUNT(list_ID)
			FROM {$this->table} WHERE 1 = 1 {$this->search_sql} ;" );

		$results = $this->db->get_results( " 
			SELECT * 
			FROM {$this->table} WHERE 1 = 1 {$this->search_sql} {$this->order_by()} {$this->get_limit_sql()};" );

		return (array) $results;
	}

	public function order_by() {
		return " ORDER BY list_ID DESC ";
	}

	public function save( $args ) {
		if ( empty( $args['list_ID'] ) ) {
			return $this->db->insert( $this->table, $args );
		}

		$list_ID = $args['list_ID'];
		unset( $args['list_ID'] );

		return $this->db->update( $this->table, $args, [ 'list_ID' => $list_ID ] );
	}

}