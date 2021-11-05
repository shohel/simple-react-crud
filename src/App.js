import React, { useReducer, useState, useEffect } from 'react';
import Header from './elements/Header';
import Table from './elements/Table';
import reducer from './reducer';
import FlowContext from './FlowContext';
import defaultFlows from './Data'

function AppWrap(){
	const [flowState, flowDispatch]  = useReducer(reducer, defaultFlows );

	const template = (
		<FlowContext.Provider value={ {flowState, flowDispatch} }>
			<div>
				<Header />
				<Table />
			</div>
		</FlowContext.Provider>
	);

	return template;
}

export default AppWrap;