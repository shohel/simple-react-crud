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
			'form' => [
				'title'       => __( 'Title', 'reactjs-data-list' ),
				'description' => __( 'Description', 'reactjs-data-list' ),
				'save'        => __( 'Save', 'reactjs-data-list' ),
				'cancel'      => __( 'Cancel', 'reactjs-data-list' ),
			]
		];

		return $l10n + $new_text;
	}

}