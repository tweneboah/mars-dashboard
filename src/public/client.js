let store = {
  user: { name: 'Student' },
};

// add our markup to the page
const root = document.getElementById('root');

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

const render = (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = state => {
  return `
  ${displayRoverDetails(store)}
  <section class="container">
  ${displayRoverImages(store)}
  </section>
  
  `;
};

// listening for load event because page should load before any JS is called
window.addEventListener('DOMContentLoaded', () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// ------------------------------------------------------  API CALLS

//get Rover data
const getRoverData = async rover => {
  console.log('I was called');
  const res = await fetch(`http://localhost:3000/${rover}`);
  const data = await res.json();
  updateStore(store, data);
};

getRoverData('spirit');

//Display rover details

const displayRoverDetails = rover => {
  console.log(rover.roverData);
  if (rover.roverData === undefined) {
    return '';
  } else {
    return `<div class="rover-container">
    <h2>Rover Details</h2>
    <div class="child">
      <div class="card">
        <div class="header">
          <h1>${rover.roverData.rover.name}</h1>
        </div>
        <div class="container-child">
          <p>Lunch-Date: ${rover.roverData.rover.launch_date}</p>
          <p>Landing-Date: ${rover.roverData.rover.landing_date}</p>
          <p>Status: ${rover.roverData.rover.status}</p>
        </div>
      </div>
    </div>
  </div>
`;
  }
};

const displayRoverImages = roverImages => {
  if (roverImages.roverImages !== undefined) {
    return roverImages.roverImages.map(rover => {
      console.log('Details', rover);
      return `<div>
      <img src=${rover.img_src} alt="First description" />
      <span class="description">${rover.earth_date}</span>
  </div>
  `;
    });
  } else {
    return '<h1>Loading</h1>';
  }
};

const rovers = document.querySelector('#rovers');
rovers.addEventListener('input', e => {
  console.log(e.target.value);
  getRoverData(e.target.value);
  let roverData = document.querySelector('#rovers');
});
