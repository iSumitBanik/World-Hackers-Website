$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
  loadHackathons();
});

async function  loadHackathons()  {
  const API_URL = 'http://gsx2json.com/api?id=1ggI2m98WGjWOStcQWtwHy8SKrMAQpP1haGCougDwVXI&sheet=1';
  await fetch(API_URL)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          console.log(data['rows']);
          for (let k = 0; k < data['rows'].length; k++) {
            $('.hackathon-table').append(`
            <tbody>
              <tr>
                <td><a href="${data['rows'][k]['link']}" target="_blank" class="link">${data['rows'][k]['name']}</a></td>
                <td>${data['rows'][k]['date']},&nbsp; ${data['rows'][k]['year']}</td>
                <td>${data['rows'][k]['leads']}</td>
              </tr>

            </tbody>
`)
          }
          for (let i = 0; i < 5; i += 3) {
            $('.card-decks').append(`  <div class="row">
          <div class="col s12 m4 l4">
            <div class="card medium">
              <div class="card-image">
                <img src="../src/img/placholder.png" class="responsive-img">
                
              </div>
              <div class="card-content">
              <a href="${data['rows'][i]['link']}" class="custom-link" target="_blank"><span class="card-title">${data['rows'][i]['name']}</span></a>
                
              <div class="chip">
                ${data['rows'][i]['leads']}
                </div>
              </div>  
            </div>
          </div>

          <div class="col s12 m4 l4">
          <div class="card medium">
            <div class="card-image">
              <img src="../src/img/placholder.png" class="responsive-img">
            </div>
            <div class="card-content">
            <a href="${data['rows'][i + 1]['link']}"  class="custom-link" target="_blank"><span class="card-title">${data['rows'][i + 1]['name']}</span></a>
              <div class="chip">
              ${data['rows'][i + 1]['leads']}
              </div>
            </div>  
          </div>
        </div>

        <div class="col s12 m4 l4">
        <div class="card medium">
          <div class="card-image">
            <img src="../src/img/placholder.png" class="responsive-img">
          </div>
          <div class="card-content">
          <a href="${data['rows'][i + 2]['link']}"  class="custom-link" target="_blank"><span class="card-title">${data['rows'][i + 2]['name']}</span></a>

            <div class="chip">
            ${data['rows'][i + 2]['leads']}
            </div>
          </div>  
        </div>
      </div>
        </div>`)
          }

        });
      }
    )
    .catch(function (err) {
      console.log(err);
    });
}