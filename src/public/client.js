let store = {
  user: { name: 'Student' },
  apod: '',
  rovers: {},
};

// add our markup to the page
const root = document.getElementById('root');

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = state => {
  let { rovers, apod } = state;
  return `
      <header></header>
      <main>
          ${Greeting(store.user.name)}
          <section>
              <h3>Put things on the page!</h3>
              <p>Here is an example section.</p>
              <p>
                  One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                  the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                  This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                  applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                  explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                  but generally help with discoverability of relevant imagery.
              </p>
   
          </section>
        ${displayRoverData(store.rovers)}
      </main>
      <footer></footer>
  `;
};

// listening for load event because page should load before any JS is called
window.addEventListener('DOMContentLoaded', () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = name => {
  if (name) {
    return `
          <h1>Welcome, ${name}!</h1>
      `;
  }
  return `
      <h1>Hello!</h1>
  `;
};

const displayRoverData = rover => {
  if (rover.rover !== undefined) {
    const { id, img_src, earth_date } = rover;
    const { name, landing_date, launch_date, status } = rover.rover;
    console.log(rover);
    console.log(rover);
    return `<div class="rover_container">
  <div class="rover_child">
  <h1>${name}</h1> 
  <img src=${img_src} alt="">
  <p>landing_date: ${landing_date}</p>
    <p>launch_date : ${launch_date}</p>
    <p>Earth date : ${earth_date}</p>

    <p>Status: ${status}</p>
  </div>
</div>`;
  } else {
    return `<h1>Loading rover......</h1>`;
  }
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = apod => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
  }

  // check if the photo of the day is actually type video!
  if (apod.media_type === 'video') {
    return `
          <p>See today's featured video <a href="${apod.url}">here</a></p>
          <p>${apod.title}</p>
          <p>${apod.explanation}</p>
      `;
  } else {
    return `
          <img src="${
            apod ? apod.image.url : ''
          }" height="350px" width="100%" />
          <p>${apod ? apod.image.explanation : ''}</p>
      `;
  }
};

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = state => {
  let { apod } = state;
  fetch(`http://localhost:3000/apod`)
    .then(res => res.json())
    .then(apod => updateStore(store, { apod }));
  return apod;
};

//get Rover data
const getRoverData = rover => {
  fetch(`http://localhost:3000/${rover}`)
    .then(res => res.json())
    .then(data => {
      let rovers = data.image.photos[0];
      updateStore(store, { rovers });
    });
};

getRoverData('spirit');

rovers.addEventListener('input', e => {
  let roverData = document.querySelector('#rovers');
  getRoverData(roverData.value);
});
