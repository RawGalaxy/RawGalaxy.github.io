$(document).ready(function() {
  $.ajax({
    url: 'https://api-berita-indonesia.vercel.app/antara/politik/',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      if(data.success) {
        displayNews(data.data);
      } 
      else {
        console.error('Failed to fetch news:', data.message);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: ", error);
    }
  });
  function displayNews(news) {
    $('#navbar-logo').attr('src', news.image);
    $('.navbar-brand').attr('href', news.link);
    $('#navbarText1').text(news.title);
    $('#navbarText2').text(news.description);
    let output = '';
    $.each(news.posts, function(index, post) {
      let desc = post.description
      let cutDesc = desc.substr(0, 100) + "...";
      output += `
      <div class="col-md-4 mb-4 d-flex">
        <div class="card flex-fill">
          <img class="card-img-top" src="${post.thumbnail}" alt="News Story Image">
          <div class="card-body shadow d-flex flex-column">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text flex-grow-1 text-justify">${cutDesc}</p>
            <a href="${post.link}" class="btn btn-primary btn-danger">Lihat Selengkapnya</a>
          </div>
        </div>
      </div>
      `;
    });
    $('#newsList').append(output);
  }
});