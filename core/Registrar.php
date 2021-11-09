<?php

namespace ReactJS\DataList;

class Registrar {

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
			[ __CLASS__, 'install' ]
		);
		register_deactivation_hook(
			RDLIST_FILE,
			[ __CLASS__, 'uninstall' ]
		);
	}

	/**
	 * Install and keep the footprint that the plugin has been installed
	 *
	 */

	public static function install() {
		if ( ! get_option( 'rdlist_version' ) ) {
			update_option(
				'rdlist_version',
				RDLIST_VERSION
			);
		}

		return true;
	}

	/**
	 * Clean the DB data related this plugin
	 *
	 *
	 *
	 * @return bool
	 */

	public static function uninstall() {
		if ( get_option( 'rdlist_delete_data' ) ) {
			delete_option( 'rdlist_version' );
		}

		return true;
	}
}
