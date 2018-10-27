let pCon = document.querySelector(".pCon");

fetch(`https://data.nasa.gov/resource/9g7e-7hzz.json?$select=facility,location,city,state`)
  .then(res => res.json())
  .then(response => {
    console.log(response)
    response.forEach(fac => {
      let tr = document.createElement("tr");
      let lat = Number(fac.location.coordinates[0])
      let lon = Number(fac.location.coordinates[1])

      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=6268f82cfeef6ef9c10379818572f5ad`)
        .then(res => res.json())
        .then(response => {
          let weather = -(response.main.temp)

          tr.innerHTML = `<tr>
          <td>${fac.facility}</td>
          <td>${fac.city}</td>
          <td>${fac.state}</td>
          <td>${weather}</td>
          </tr>
          `

          pCon.appendChild(tr)
        })
        .catch(err => {
          weather = undefined
        });
    })
  })
  .catch(err => {
    console.log(`error ${err}`)
    alert("sorry, there are no results for your search")
  });
