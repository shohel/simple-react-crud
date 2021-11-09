<?php
namespace ReactJS\DataList\ShortCode;

class ListDataPlaceHolder {

	public function init() {
		add_shortcode( 'data-list-placeholder', [ $this, 'generate' ] );

		return $this;
	}

	public function generate() {
		return '<div id="rdlist_wrapper"><div id="rdlist_js_placeholder"></div></div>';
	}

}