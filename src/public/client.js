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
  return `${displayRoverDetails(store)}
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

getRoverData('opportunity');

//Display rover details

const displayRoverDetails = rover => {
  if (rover.roverData === undefined) {
    return `<h1>Loading</h1>`;
  } else {
    return `<div class="rover-container">
    <h1>Rover Name</h1>
    <div class="child">
      <div class="card">
        <div class="header">
          <h1>1</h1>
        </div>
        <div class="container-child">
          <p>January 1, 2016</p>
          <p>January 1, 2016</p>
          <p>January 1, 2016</p>
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
      return `<div>
      <img src=${rover.img_src} alt="First description" />
      <span class="description">First description</span>
  </div>
  `;
    });
  } else {
    return '<h1>Loading</h1>';
  }
};
// rovers.addEventListener('input', e => {
//   let roverData = document.querySelector('#rovers');
//   getRoverData(roverData.value);
// });
