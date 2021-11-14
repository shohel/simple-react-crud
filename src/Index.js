import React from 'react';
import ReactDOM from 'react-dom';
import AppWrap from './App';
import DynamicFormBuilder from './dynamicFormBuilder';

const letPlaceHolder = document.getElementById('rdlist_js_placeholder');
const formBuilder = document.getElementById('dynamicFormBuilder');

if ( letPlaceHolder ) {
	ReactDOM.render(
		<AppWrap/>,
		document.getElementById( 'rdlist_js_placeholder' )
	);
}

if ( formBuilder ) {
	ReactDOM.render(
		<DynamicFormBuilder/>,
		document.getElementById( 'dynamicFormBuilder' )
	);
}