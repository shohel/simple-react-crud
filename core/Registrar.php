<?php

namespace ReactJS\DataList;

class Registrar {

	public static function instance() {
		static $instance = null;

		// Only run these methods if they haven't been run previously
		if ( null === $instance ) {
			$instance = new self();
			$instance->run();
		}

		// Always return the instance
		return $instance;
	}

	/**
	 * Responsible for the plugin's registry
	 * Fire install or uninstall method
	 */

	public function run() {
		load_plugin_textdomain(
			'reactjs-data-list',
			false,
			basename( RDLIST_PATH ) . '/languages'
		);

		register_activation_hook(
			RDLIST_FILE,
			[ $this, 'install' ]
		);
		register_deactivation_hook(
			RDLIST_FILE,
			[ $this, 'uninstall' ]
		);
	}

	/**
	 * Install and keep the footprint that the plugin has been installed
	 *
	 */

	public function install() {
		if ( ! get_option( 'rdlist_version' ) ) {
			$this->install_databases();
		}

		update_option( 'rdlist_version', RDLIST_VERSION );

		return true;
	}

	/**
	 * Clean the DB data related this plugin
	 *
	 *
	 *
	 * @return bool
	 */

	public function uninstall() {
		if ( get_option( 'rdlist_delete_data' ) ) {
			delete_option( 'rdlist_version' );
		}

		return true;
	}

	/**
	 * Install necessary database tables
	 *
	 * @since 1.0.0
	 */

	public function install_databases() {
		global $wpdb;

		$prefix          = $wpdb->prefix;
		$charset_collate = $wpdb->get_charset_collate();

		if ( ! function_exists( 'dbDelta' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		}

		$data_list_table = "CREATE TABLE IF NOT EXISTS {$prefix}rd_lists (
            list_ID bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
            user_id int(11) DEFAULT NULL,
            list_title text DEFAULT NULL,
            description longtext DEFAULT NULL,
            list_options text DEFAULT NULL,
            list_status varchar(20) DEFAULT NULL,            			
            created_at datetime DEFAULT NULL,
            updated_at datetime DEFAULT NULL,
            KEY user_id (user_id),
            KEY list_title (list_title(255)),
            KEY list_status (list_status)
		) {$charset_collate};";

		dbDelta( $data_list_table );
	}

}
