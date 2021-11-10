<?php

namespace ReactJS\DataList;

class RDListCLI {

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
				$user_id = $administrators[0]->ID;

				foreach ( $generated_posts as $generated_post ) {
					$post_arr = [
						'post_title'   => $generated_post->title,
						'post_content' => $generated_post->body,
						'post_status'  => 'publish',
						'post_author'  => $user_id,
						'post_type'    => 'rdlist'
					];

					wp_insert_post( $post_arr );
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
		//Delete all posts

		$allposts = get_posts( [ 'post_type' => 'rdlist', 'numberposts' => - 1 ] );
		foreach ( $allposts as $eachpost ) {
			wp_delete_post( $eachpost->ID, true );
		}

		\WP_CLI::success( 'All data base been deleted' );
	}

}