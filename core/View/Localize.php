<?php

/**
 * Localize plugins text
 *
 */

namespace ReactJS\DataList\View;

class Localize {

	public function init() {
		add_filter( 'rdlist_l10n', [ $this, 'text_localization' ] );
	}

	public function text_localization( $l10n ) {

		$new_text = [

		];

		return $l10n + $new_text;
	}

}