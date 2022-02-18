import React from "react";
import "./spa.css"
import { useState,useEffect} from "react";
import { Table } from "react-bootstrap";

const median = (numbers) => {
    const sort = numbers.slice().sort((a, b) => a - b);
    const mid = Math.floor(sort.length / 2);
    if (sort.length % 2 === 0) {
        return (sort[mid - 1] + sort[mid]) / 2;
    }
    return parseFloat(sort[mid]).toFixed(4);
}

const mean = (numbers) => {
    console.log(numbers.reduce((a, b) => a + b, 0))
    return parseFloat(numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(4)

}

const standardDev = (numbers) => {
    let mean = numbers.reduce((acc, curr) => {
        return acc + curr
    }, 0) / numbers.length;
    numbers = numbers.map((k) => {
        return (k - mean) ** 2
    })
    let sum = numbers.reduce((acc, curr) => acc + curr, 0);

    return parseFloat(Math.sqrt(sum / numbers.length)).toFixed(4)
}
const mode = (numbers) =>
    Object.values(
        numbers.reduce((count, e) => {
            if (!(e in count)) {
                count[e] = [0, e];
            }
            count[e][0]++;
            return (count);

        }, {})
    ).reduce((numbers, lat) => lat[0] < numbers[0] ? numbers : lat, [0, null])[1];


function Spa() {

    const [data, setDataset] = useState([])
    const [newitem, Setnewitem] = useState()
    const [Mean, setMean] = useState()
    const [Median, setMedian] = useState()
    const [Stdev, setStdev] = useState()
    const [Mode, setMode] = useState()
    
    useEffect(() => {
        console.log(data);
        setMean(mean(data))
        setMedian(median(data))
        setStdev(standardDev(data))
        setMode(mode(data))
      },[data]);
    
    
    const HandleChange = () => {
        return setDataset(data => data.concat(Number(newitem)))
    }

    return <div className="container">
        
        {data.map((elements) => <li>{elements}</li>)}
        
        <Table striped bordered hover size="md" variant="dark">
            <tbody>
                <tr>
                    <td>Mean</td>
                    <td>{Mean}</td>
                </tr>
                <tr>
                    <td>Median</td>
                    <td>{Median}</td>
                </tr>
                <tr>
                    <td>stDev</td>
                    <td>{Stdev}</td>
                </tr>
                <tr>
                    <td>Mode</td>
                    <td>{Mode}</td>
                </tr>
            
            </tbody>
        </Table>    
            
            
        <form>
            <input type="number" 
            onChange={(event)=> Setnewitem(event.target.value)} />
            <button type="button" onClick={HandleChange} >ADD</button>      
        </form>
        </div>
}

export default Spa;