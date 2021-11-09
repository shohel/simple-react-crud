<?php
namespace ReactJS\DataList\Admin;

class Notice {

	public function noComposer() {
		$class   = 'notice notice-error';
		$message = sprintf(
			__(
				'No Composer Found to run the %s plugin, please follow the below procedure to install the composer properly',
				'reactjs-data-list'
			),
			'<strong> ReactJS Data List </strong>'
		);
		$message .= $this->autoP(
			__(
				'1. Open the terminal',
				'reactjs-data-list'
			)
		);
		$message .= $this->autoP(
			sprintf(
			/* translators: %s: Plugin_Path. */

				__(
					'2. Navigate to %s',
					'reactjs-data-list'
				),
				'<code> ' . RDLIST_PATH . ' </code>'
			)
		);
		$message .= $this->autoP(
			sprintf(
				__(
					'3. Run the command %s',
					'reactjs-data-list'
				),
				'<code> composer install </code>'
			)
		);
		$message .= $this->autoP(
			__(
				'You are all set. Now the plugin should be load',
				'reactjs-data-list'
			)
		);

		printf(
			'<div class="%1$s"><p>%2$s</p></div>',
			esc_attr( $class ),
			$message  // phpcs:ignore WordPress.Security.EscapeOutput
		);
	}

	/**
	 * Generate new line with the p tag
	 *
	 * @param  string  $line
	 *
	 * @return string
	 */

	public function autoP( $line = '' ) {
		if ( empty( $line ) ) {
			return '';
		}

		return "<p>{$line}</p>";
	}
}
