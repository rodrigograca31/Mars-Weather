import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Axios from 'axios';
import Sol from './components/Sol/Sol';

function App() {

	const [sols, setSols] = useState([]);

	useEffect(() => {
		Axios.get("https://api.nasa.gov/insight_weather/?api_key=tsGCE22GDvhxJbssPpCtznaQVPqBI3QdAD71Zufp&feedtype=json&ver=1.0").then(response => {
			return response.data
		}).then(data => {
			console.log(data);
			
			const solsArray = [];
			data.sol_keys.forEach((ele, index) => {
				data[ele].solNumber = ele;
				solsArray.push(data[ele])
			});
			setSols(solsArray);
			
		});
		return () => {
			//
		};
	}, []);

	return (
		<div className="App">
			<div id="sols">
				<h1>Latest Weather at Elysium Planitia</h1>
				<p>InSight is taking daily weather measurements (temperature, wind, pressure) <br/> on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars’ equator.</p>
				<div className="sols">
					{
						sols.map((currSol, index) => {
							return (
								<Sol key={index} currSol={currSol} />
							)
						})
					}
				</div>
			</div>
		</div>
	);
}

export default App;
