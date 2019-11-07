import React, { Component } from 'react';
import "./Sol.scss";

const Sol = (props) => {
  
		return (
			<div className="sol">
				<b>Sol: </b>{props.currSol.solNumber}
				<br/>
				<br/>
				{props.currSol.First_UTC.slice(0, 10)}
				<br />
				<b>AT: </b>{props.currSol.AT.av}
				<br />
				<b>WS: </b>{props.currSol.HWS.av}
				<br />
				<b>PRE: </b>{props.currSol.PRE.av}
			</div>
		)
	
}

export default Sol;