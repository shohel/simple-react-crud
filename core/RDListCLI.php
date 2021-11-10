<?php

namespace ReactJS\DataList;

class RDListCLI {

	private $db;
	private $table;

	public function __construct() {
		global $wpdb;
		$this->db    = $wpdb;
		$this->table = $wpdb->prefix . 'rd_lists';
	}

	public function generate( $args, $assoc_args ) {
		//

		$generated_posts = get_transient( 'rdlist_generated_posts' );
		if ( $generated_posts === false ) {
			try {
				$request         = wp_remote_get( 'https://jsonplaceholder.typicode.com/posts',
					[ 'timeout' => 20 ]
				);
				$generated_posts = json_encode( [] );
				if ( is_array( $request ) && ! is_wp_error( $request ) ) {
					$generated_posts = $request['body'];
				}

				set_transient( 'rdlist_generated_posts', $generated_posts, MONTH_IN_SECONDS );
			} catch ( \Exception $exception ) {
				\WP_CLI::error( $exception->getMessage() );
			}
		}

		try {
			$generated_posts = json_decode( $generated_posts );
			if ( is_array( $generated_posts ) && count( $generated_posts ) ) {
				$administrators = get_users( [ 'role__in' => [ 'administrator' ] ] );
				if ( empty( $administrators[0] ) ) {
					throw new \Exception( 'There is no administrators found' );
				}
				$user_id          = $administrators[0]->ID;
				$current_datetime = current_time( 'mysql' );

				foreach ( $generated_posts as $generated_post ) {
					$data_arr = [
						'user_id'     => $user_id,
						'list_title'  => $generated_post->title,
						'description' => $generated_post->body,
						'list_status' => 'publish',
						'created_at'  => $current_datetime,
						'updated_at'  => $current_datetime,
					];

					$this->db->insert( $this->table, $data_arr );
				}
			}
		} catch ( \Exception $exception ) {
			\WP_CLI::error( $exception->getMessage() );
		}

		\WP_CLI::success( 'Data generated' );
	}

	/**
	 * WARNING! This will permanently erase all ReactJS list data
	 *
	 * @param $args
	 * @param $assoc_args
	 */

	public function clean( $args, $assoc_args ) {
		//Delete All Data

		$this->db->query( "DELETE FROM {$this->table} " );

		\WP_CLI::success( 'All data base been deleted' );
	}

}