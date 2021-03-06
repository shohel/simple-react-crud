<?php

/**
 * Assets class for the Plugin
 * Responsible for the load the plugin's assets like css and js
 *
 */

namespace ReactJS\DataList\View;

class Assets {

	public function init() {
		add_action(
			'admin_enqueue_scripts',
			[ $this, 'loadAssets' ]
		);
		add_action(
			'wp_enqueue_scripts',
			[ $this, 'loadAssets' ]
		);
	}

	/**
	 * Loading assets.
	 *
	 * If SCRIPT_DEBUG set to true, then the asset will be load unminified version.
	 * RTL language should load the RTL css, generating by Grunt
	 */

	public function loadAssets() {
		//Init Localize
		( new Localize() )->init();

		$suffix  = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		$rtl_dir = is_rtl() ? '-rtl' : '';

		wp_enqueue_style(
			'reactjs-data-list',
			RDLIST_URL . "assets/css{$rtl_dir}/style{$suffix}.css",
			[],
			RDLIST_VERSION
		);
		wp_enqueue_script(
			'reactjs-data-list',
			RDLIST_URL . "assets/js/main{$suffix}.js",
			[ 'jquery' ],
			RDLIST_VERSION,
			true
		);

		$localize_strings = [
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'nonce'   => wp_create_nonce( 'RDLIST_nonce_action' ),
		];

		$localize_strings = $localize_strings + apply_filters( 'rdlist_l10n', [] );

		// phpcs:ignoreFile
		wp_localize_script( 'reactjs-data-list', '_rdlist_object', $localize_strings );
	}
}