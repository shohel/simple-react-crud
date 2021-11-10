<?php

/**
 * BootStrap class for the Plugin
 * Responsible for the load the plugin
 *
 */

namespace ReactJS\DataList;


use ReactJS\DataList\ShortCode\Load;
use ReactJS\DataList\View\Assets;

final class BootStrap {

	public $shortcodes;

	public function init() {
		//Run the registry service
		$registrar = new Registrar();
		$registrar->run();
		$this->includes();
		$this->init_wp_cli();

		//Load the Plugin
		add_action(
			'init',
			[ $this, 'run' ]
		);
	}

	/**
	 * Responsible for the plugin's registry
	 * Fire install or uninstall method
	 */

	public function registry() {
		register_activation_hook(
			RDLIST_FILE,
			[ __CLASS__, 'install' ]
		);
		register_deactivation_hook(
			RDLIST_FILE,
			[ __CLASS__, 'uninstall' ]
		);
	}

	public function run() {
		do_action( 'rdlist_before_init' );

		//Load assets, like css and JS
		$this->loadAssets();

		if ( is_admin() ) {
			//
		}

		$this->initComponent();

		do_action( 'rdlist_after_init' );
	}

	/**
	 * Install and keep the footprint that the plugin has been installed
	 *
	 *
	 */

	public static function install() {
		if ( ! get_option( 'RDLIST_version' ) ) {
			update_option(
				'RDLIST_version',
				RDLIST_VERSION
			);
			update_option(
				'RDLIST_endpoint',
				'reactjs-data-list-list'
			);
			update_option(
				'should_flush_rewrite',
				true
			);
		}
	}

	/**
	 * Clean the DB data related this plugin
	 *
	 *
	 */

	public static function uninstall() {
		delete_option( 'RDLIST_version' );
		delete_option( 'RDLIST_endpoint' );
		delete_option( 'should_flush_rewrite' );
	}

	public function includes() {

		//
	}

	public function init_wp_cli() {
		if ( ! defined( 'WP_CLI' ) || ! WP_CLI ) {
			return;
		}

		\WP_CLI::add_command( 'rdlist', RDListCLI::class );
	}

	public function loadAssets() {
		$assets = new Assets();
		$assets->init();
	}

	public function initComponent() {
		$this->shortcodes = ( new Load() )->init();
	}
}