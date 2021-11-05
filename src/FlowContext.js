import React, { createContext, useContext } from 'react';

const FlowContext = createContext( {} );

export function useFlowContext() {
	return useContext(FlowContext);
}

export default FlowContext;