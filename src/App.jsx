import { useState } from 'react'
import './App.css'

function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  // use for find city name
  const[userAddress,setUserAddress] = useState()
  // use for user address
  const [address,setAddress] = useState()

  const geo = navigator.geolocation

  geo.watchPosition(userCoords)   
  function userCoords(position){
    let userlatitude = position.coords.latitude
    let userlongitude = position.coords.longitude

    setLatitude(userlatitude)
    setLongitude(userlongitude)
  }

  const getUserAddress = async () =>{
    let url = `https://api.opencagedata.com/geocode/v1/json?key=b964b8bb0e5140d3b3a43ea4983a361a&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`

    const loc = await fetch(url)
    const data = await loc.json()
    // use for find city name
    setUserAddress(data.results[0].components.city)  
    // use for formatted data
    setAddress(data.results[0].formatted)   
  }
  const handleGetUserAddress = () =>{
    getUserAddress()
  }
  
  return (
    <> 
       <h1>GPS Location Tracker</h1>
       <h2>Latitude : {latitude}</h2>
       <h2>Longitude : {longitude}</h2>

       <h2>City : {userAddress}</h2>
       <h2>Address : {address}</h2>

       <button onClick={handleGetUserAddress}>Find Address: </button>
    </>
  )
}

export default App
