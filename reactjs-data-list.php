<?php
/*
 * Plugin Name: ReactJS Data List
 * Plugin URI: https://github.com/shohel
 * Description: Simple Module to show a list of data using ReactJS
 * Version: 1.0.0
 * Author: Shohel
 */

namespace ReactJS\DataList;

use Exception;
use ReactJS\DataList\Admin\Notice;

if (! defined('ABSPATH')) {
	exit();
}

/**
 * Defining required constant
 */

define( 'RDLIST_VERSION', '1.0.0' );
define( 'RDLIST_FILE', __FILE__ );
define( 'RDLIST_URL', trailingslashit( plugin_dir_url(__FILE__ ) ) );
define( 'RDLIST_PATH', __DIR__ . '/' );

$composer_autoloader = RDLIST_PATH . 'vendor/autoload.php';

try {
	if ( file_exists( $composer_autoloader ) && is_readable( $composer_autoloader ) ) {
		require_once $composer_autoloader;

		$bootstrap = new BootStrap();
		$bootstrap->init(); //Kick Start the plugin...
	} else {
		throw new Exception( 'composer_not_installed' );
	}

} catch (Exception $exception) {
	if ( 'composer_not_installed' === $exception->getMessage() ) {
		if ( ! class_exists( Notice::class ) ) {
			require_once RDLIST_PATH . 'core/Admin/Notice.php';
		}

		$notice = new Notice();
		add_action(
			'admin_notices',
			[ $notice, 'noComposer' ]
		);
	}

}