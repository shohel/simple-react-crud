import React, { useReducer, useState, useEffect } from 'react';
import Header from './elements/Header';
import Table from './elements/Table';
import reducer from './reducer';
import ListContext from './ListContext';
import defaultLists from './Data'

function AppWrap(){
	const [listState, listDispatch]  = useReducer(reducer, defaultLists );

	const template = (
		<ListContext.Provider value={ {listState, listDispatch} }>
			<>
				<Header />
				<Table />
			</>
		</ListContext.Provider>
	);

	return template;
}

export default AppWrap;