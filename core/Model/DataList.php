<?php

/**
 * Responsible for interacting with database.
 *
 */

namespace ReactJS\DataList\Model;

class DataList extends Model {

	protected $table = 'rd_lists';

	public function get_items() {
		$this->total = $this->db->get_var( " 
			SELECT COUNT(list_ID)
			FROM {$this->table} WHERE 1 = 1;" );

		$results = $this->db->get_results( " 
			SELECT * 
			FROM {$this->table} WHERE 1 = 1 {$this->get_limit_sql()};" );

		return (array) $results;
	}

}