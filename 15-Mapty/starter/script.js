'use strict';

//////////////////////////////////////////////
// 232. Using the Geolocation API
class Workout {
  // date = new Date();
  // id = (Date.now() + '').slice(-10);
  // clicks = 0;
  layer;

  constructor(coords, distance, duration, clicks = null, date = null) {
    // this.date = ...
    this._setId(date);
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
    this.date = date ? new Date(date) : new Date();
    this.clicks = clicks || 0;
  }

  set distance(val) {
    this._distance = val;
  }

  set duration(val) {
    this._duration = val;
  }

  get distance() {
    return this._distance;
  }

  get duration() {
    return this._duration;
  }

  _setId(existingDate) {
    const date = existingDate ? Date.parse(existingDate) : Date.now();

    this.id = (date + '').slice(-10);
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence, clicks = null, date = null) {
    super(coords, distance, duration, clicks, date);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  set cadence(val) {
    this._cadence = val;
  }

  get cadence() {
    return this._cadence;
  }

  // Темп
  calcPace() {
    // min/km
    this.pace = this._duration / this._distance;
  }
}
class Cycling extends Workout {
  type = 'cycling';

  constructor(
    coords,
    distance,
    duration,
    elevationGain,
    clicks = null,
    date = null
  ) {
    super(coords, distance, duration, clicks, date);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  set elevationGain(val) {
    this._elevationGain = val;
  }

  get elevationGain() {
    return this._elevationGain;
  }

  calcSpeed() {
    // min/km
    this.speed = this._distance / (this._duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);

//////////////////////////////////////////////
// APPLICATION ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    // Event handler function will always have the this keyword of the DOM element
    // onto which it is attached. In this case, that's gonna be the form element
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    containerWorkouts.addEventListener('click', this._editWorkout.bind(this));
    containerWorkouts.addEventListener('click', this._deleteWorkout.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // We have to use bind here, not 'this._loadMap'.
        // _loadMap is called by 'getCurrentPosition' function here.
        // It's treated as a regular function call, not as a method call.
        // Since this is a callback function, we are not calling it ourselves.
        // When 'getCurrentPosition' calls this method ('this._loadMap'), then it
        // does so as a regular function call. In a regular function call, the
        // 'this' keyword is set to undefined.
        this._loadMap.bind(this),
        function () {
          alert("Couldn't get your position");
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    // L here is namespace
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _validInputs(...inputs) {
    return inputs.every(inp => Number.isFinite(inp));
  }

  _allPositive(...inputs) {
    return inputs.every(inp => inp > 0);
  }

  _showInvalidInputsMsg() {
    alert('Inputs have to be positive numbers!');
  }

  _newWorkout(e) {
    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !this._validInputs(distance, duration, cadence) ||
        !this._allPositive(distance, duration, cadence)
      )
        return this._showInvalidInputsMsg();

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !this._validInputs(distance, duration, elevation) ||
        !this._allPositive(distance, duration)
      )
        return this._showInvalidInputsMsg();

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    workout.layer = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _generateWorkoutHTML(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <button type="button" class="workout__action workout__action--edit">✏️</button>
      <button type="button" class="workout__action workout__action--delete">❌</button>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
  `;

    if (workout.type === 'running') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;
    }

    if (workout.type === 'cycling')
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>
    `;

    return html;
  }

  _renderWorkout(workout) {
    const html = this._generateWorkoutHTML(workout);

    form.insertAdjacentHTML('afterend', html);
  }

  _findWorkoutById(id) {
    return this.#workouts.find(work => work.id === id);
  }

  // Local storage is blocking (it's very bad)
  _setLocalStorage() {
    const replacer = (key, value) => {
      if (key == 'layer') return undefined;
      return value;
    };
    localStorage.setItem('workouts', JSON.stringify(this.#workouts, replacer));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    data.forEach(work => {
      let workout;

      if (work.type == 'running') {
        workout = new Running(
          work.coords,
          work._distance,
          work._duration,
          work._cadence,
          work.clicks,
          work.date
        );
      }

      if (work.type == 'cycling') {
        workout = new Cycling(
          work.coords,
          work._distance,
          work._duration,
          work._elevationGain,
          work.clicks,
          work.date
        );
      }

      this.#workouts.push(workout);
      this._renderWorkout(workout);
    });
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;
    if (e.target.classList.contains('workout__action--delete')) return;

    const workout = this._findWorkoutById(workoutEl.dataset.id);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    workout.click();

    this._setLocalStorage();
  }

  _eventListenerFor(workout, isAdded = true) {
    const editForm = document.querySelector(`[data-id="${workout.id}"]`);

    if (isAdded) {
      editForm.addEventListener('submit', this._updateWorkout.bind(this));
    } else {
      editForm.removeEventListener('submit', this._updateWorkout);
    }
  }

  _updateWorkout(e) {
    e.preventDefault();

    const workout = this._findWorkoutById(e.target.dataset.id);

    const selector = `[data-id="${e.target.dataset.id}"] .form__input`;
    const distance = +document.querySelector(`${selector}--distance`).value;
    const duration = +document.querySelector(`${selector}--duration`).value;

    if (workout.type === 'running') {
      const cadence = +document.querySelector(`${selector}--cadence`).value;

      if (
        !this._validInputs(distance, duration, cadence) ||
        !this._allPositive(distance, duration, cadence)
      )
        return this._showInvalidInputsMsg();

      workout.cadence = cadence;
      workout.distance = distance;
      workout.duration = duration;
    }

    if (workout.type === 'cycling') {
      const elevation = +document.querySelector(`${selector}--elevation`).value;

      if (
        !this._validInputs(distance, duration, elevation) ||
        !this._allPositive(distance, duration)
      )
        return this._showInvalidInputsMsg();

      workout.elevationGain = elevation;
      workout.distance = distance;
      workout.duration = duration;
    }

    this._setLocalStorage();
    this._eventListenerFor(workout, false);

    const html = this._generateWorkoutHTML(workout);

    e.target.outerHTML = html;
  }

  _editFormHtml(workout) {
    const html = `
      <form class="form" data-id=${workout.id}>
        <div class="form__row">
          <label class="form__label">Type</label>
          <select class="form__input form__input--type" disabled>
            <option value="running" ${
              workout.type === 'running' ? 'selected' : ''
            }>Running</option>
            <option value="cycling" ${
              workout.type === 'cycling' ? 'selected' : ''
            }>Cycling</option>
          </select>
        </div>
        <div class="form__row">
          <label class="form__label">Distance</label>
          <input class="form__input form__input--distance" placeholder="km" value="${
            workout.distance
          }"/>
        </div>
        <div class="form__row">
          <label class="form__label">Duration</label>
          <input
            class="form__input form__input--duration"
            placeholder="min" value="${workout.duration}"
          />
        </div>
        <div class="form__row ${
          workout.type === 'cycling' ? 'form__row--hidden' : ''
        }">
          <label class="form__label">Cadence</label>
          <input
            class="form__input form__input--cadence"
            placeholder="step/min" value="${workout.cadence}"
          />
        </div>
        <div class="form__row ${
          workout.type === 'running' ? 'form__row--hidden' : ''
        }">
          <label class="form__label">Elev Gain</label>
          <input
            class="form__input form__input--elevation"
            placeholder="meters" value="${workout.elevationGain}"
          />
        </div>
        <button class="form__btn">OK</button>
      </form>
    `;

    return html;
  }

  _editWorkout(e) {
    if (!e.target.classList.contains('workout__action--edit')) return;

    const workoutEl = e.target.closest('.workout');
    const workout = this._findWorkoutById(workoutEl.dataset.id);

    workoutEl.outerHTML = this._editFormHtml(workout);

    this._eventListenerFor(workout);
  }

  _deleteWorkout(e) {
    if (!e.target.classList.contains('workout__action--delete')) return;

    const workoutEl = e.target.closest('.workout');
    const index = this.#workouts.findIndex(
      work => work.id === workoutEl.dataset.id
    );
    const workout = this.#workouts.splice(index, 1)[0];

    workoutEl.classList.add('form__row--hidden');
    workout.layer.remove();

    this._setLocalStorage();
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();

//////////////////////////////////////////////
// 233. Displaying a Map Using a Leaflet Library
// https://leafletjs.com
// CDN - Content Delivery Network

//////////////////////////////////////////////
// 234. Displaying a Map Marker

//////////////////////////////////////////////
// 235. Rendering Workout Input Form

//////////////////////////////////////////////
// 236. Project Architechture

//////////////////////////////////////////////
// 237. Refactoring for Project Architecture

//////////////////////////////////////////////
// 238. Managing Workout Data: Creating Classes

//////////////////////////////////////////////
// 239. Creating a New Workout

//////////////////////////////////////////////
// 240. Rendering Workouts

//////////////////////////////////////////////
// 241. Move to Marker On Click

//////////////////////////////////////////////
// 242. Working with localStorage
