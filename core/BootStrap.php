<?php

/**
 * BootStrap class for the Plugin
 * Responsible for the load the plugin
 *
 */

namespace ReactJS\DataList;


use ReactJS\DataList\Admin\Menu;
use ReactJS\DataList\RestAPI\Register;
use ReactJS\DataList\ShortCode\Load;
use ReactJS\DataList\View\Assets;

final class BootStrap {

	public $shortcodes;
	public $rest_api;

	public function init() {
		//Run the registry service
		Registrar::instance();
		$this->init_wp_cli();

		//Load the Plugin
		add_action( 'init', [ $this, 'run' ] );
	}

	public function run() {
		do_action( 'rdlist_before_init' );

		//Load assets, like css and JS
		$this->loadAssets();

		$this->includes();
		$this->initComponent();

		if ( is_admin() ) {
			$adminMenu = new Menu();
			add_action( 'admin_menu', [ $adminMenu, 'addMenuItems' ] );
		}

		do_action( 'rdlist_after_init' );
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
		$this->rest_api   = ( new Register() )->init();
	}
}