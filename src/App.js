import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Axios from 'axios';
import Sol from './components/Sol/Sol';
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data /* see data tab */ }) => (
	<ResponsiveLine
		data={data}
		margin={{
			top: 50,
			right: 50,
			bottom: 50,
			left: 50
		}}
		yScale={{
			type: 'linear', 
			stacked: false, 
			min: 'auto', 
			max: 'auto'
		}}
		xScale={{
			type: "time",
			precision: "day",
			format: "native"
		}}
		axisBottom={{
			format: "%b %d"
		}}
		// axisLeft={{
        //     orient: 'left',
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: {{data.id}}, // not working
        //     legendOffset: -40,
        //     legendPosition: 'middle'
        // }}

	/>
)

function App() {

	const [sols, setSols] = useState([]);
	const [ATdataArr, setATdataArr] = useState([{
		id: "AT",
		"data": []
	}]);
	const [PREdataArr, setPREdataArr] = useState([{
		id: "PRE",
		"data": []
	}]);

	const [WSdataArr, setWSdataArr] = useState([{
		id: "WP",
		"data": []
	}]);

	useEffect(() => {
		Axios.get("https://api.nasa.gov/insight_weather/?api_key=tsGCE22GDvhxJbssPpCtznaQVPqBI3QdAD71Zufp&feedtype=json&ver=1.0").then(response => {
			return response.data
		}).then(data => {
			const solsArray = [];
			const tempATdataArr = [];
			const tempPREdataArr = [];
			const tempWSdataArr = [];

			data.sol_keys.forEach((ele, index) => {
				data[ele].solNumber = ele;
				solsArray.push(data[ele])

				tempATdataArr.push({
					x: new Date(data[ele].First_UTC.slice(0, 10)),
					// y: Math.floor(Math.random()*10)
					y: data[ele].AT.av
				})

				tempPREdataArr.push({
					x: new Date(data[ele].First_UTC.slice(0, 10)),
					// y: Math.floor(Math.random()*10)
					y: data[ele].PRE.av
				})

				tempWSdataArr.push({
					x: new Date(data[ele].First_UTC.slice(0, 10)),
					// y: Math.floor(Math.random()*10)
					y: data[ele].HWS.av
				})
				
			});
			setSols(solsArray);
			
			setATdataArr([{ id: "AT", "data": tempATdataArr }])
			setPREdataArr([{ id: "PRE", "data": tempPREdataArr }])
			setWSdataArr([{ id: "WS", "data": tempWSdataArr }])

		});
		return () => {
			//
		};
	}, []);

	return (
		<div className="App">
			<div id="sols">
				<h1>Latest Weather at Elysium Planitia</h1>
				<p>InSight is taking daily weather measurements (temperature, wind, pressure) <br /> on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars’ equator.</p>
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
			<div id="charts">
				<h1>Air Temprature</h1>
				<MyResponsiveLine key={1} data={ATdataArr} />
				<h1>Pressure</h1>
				<MyResponsiveLine key={2} data={PREdataArr} />
				<h1>Wind Speed</h1>
				<MyResponsiveLine key={2} data={WSdataArr} />
			</div>
		</div>
	);
}

export default App;
