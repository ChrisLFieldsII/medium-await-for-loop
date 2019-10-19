function getRandomFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function jitter(baseValue, range) {
  const rangeArr = new Array(range).fill(0).map((_, index) => {
    return index + 1;
  });
  const jitterArr = rangeArr.reduce((accum, num) => {
    accum.push(num, -num);
    return accum;
  }, []);
  return getRandomFromArr(jitterArr) + baseValue;
}

/**
 *
 * @param {Number} numIds How many ids to generate
 * @desc A helper to get an array of ids to index the USERS array with
 * @returns An array of ints
 */
function getRandomIds(numIds = 5) {
  var ids = [];
  for (let x = 0; x < numIds; x++) {
    ids.push(Math.floor(Math.random() * USERS.length));
  }
  return ids;
}

/**
 *
 * @param {Number} numIds How many ids to generate
 * @desc An example of a "bad" for-loop in which each iteration
 * awaits an async function call causing the function to seem slow
 */
async function badForLoop(numIds = 5, useJitter = false) {
  var ids = getRandomIds(numIds); // array of ints to get user by
  var users = []; // array to accumulate users into for further processing

  console.time('badForLoop');
  for (let x = 0; x < ids.length; x++) {
    var id = ids[x];
    var user = await getUser({ id }, useJitter);
    users.push(user);
    console.log(`User #${x + 1}`, user);
  }
  console.timeEnd('badForLoop');
  console.log('badForLoop Users:', users);
}

/**
 *
 * @param {Number} numIds How many ids to generate
 * @desc An example of a "good" Array.forEach() loop in which each iteration
 * kicks off an async function without waiting for the previous iterations
 * async function to complete like the badForLoop example.
 * Unlike the goodForLoop example though it is kind of tricky to
 * get an array of Users to play with.
 */
function goodForEachLoop(numIds = 5, useJitter = false, useSync = false) {
  var ids = getRandomIds(numIds);
  var users = [];

  console.time('goodForEachLoop');
  if (!useSync) {
    ids.forEach(async (id, index) => {
      var user = await getUser({ id }, useJitter);
      users.push(user);
      console.log(`User #${index + 1}`, user);
    });
  } else {
    ids.forEach((id, index) => {
      var user = getUserSync({ id });
      users.push(user);
      console.log(`User #${index + 1}`, user);
    });
  }
  console.timeEnd('goodForEachLoop');
  console.log('goodForEachLoop', users); // this will be empty...
  // we'd have to use some tactic like a hardcoded timeout to wait for the async functions
  // passed into the forEach() loop to resolve and push their user into the array
  // I really only use this method if I dont care about the response from the async function
  // otherwise its kinda messy if you need to accumulate the responses
}

/**
 *
 * @param {Number} numIds How many ids to generate
 * @desc An example of a "good" for-loop in which each iteration
 * calls an async function without awaiting and instead pushes the promise into
 * an array where Promise.all() is used to resolve the promises once the loop is done.
 */
async function goodForLoop(numIds = 5, useJitter = false) {
  var ids = getRandomIds(numIds);

  console.time('goodForLoop');
  const promises = [];
  for (let x = 0; x < ids.length; x++) {
    const id = ids[x];
    promises.push(getUser({ id }, useJitter));
  }
  const users = await Promise.all(promises);
  console.log(users);
  console.timeEnd('goodForLoop');
}

/**
 * @desc This async function simulates fetching a user
 * from a database with an id. The id is just used to index
 * the USERS array.
 * Can optionally pass useJitter as true so responses resolve out of order
 */
async function getUser({ id = 0 }, useJitter = false) {
  var waitTime = 3;
  if (useJitter) {
    waitTime = jitter(waitTime, 1);
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(USERS[id]);
    }, 1000 * waitTime);
  });
}

function getUserSync({ id }) {
  return USERS[id];
}

/**
 * @desc This function can be awaited within a for-loop
 * to pause for the desired amount of seconds for example.
 * @param {Number} pauseTimeSec How many seconds to wait before resolving the promise
 */
async function pauseLoop(pauseTimeSec) {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 1000 * pauseTimeSec);
  });
}

/**
 *
 * @param {Number} numIterations How many times you want to do the loop
 * @param {Number} pauseTimeSec How many seconds to pause between each loop
 */
async function testPauseLoop(numIterations = 5, pauseTimeSec = 3) {
  for (let x = 0; x < numIterations; x++) {
    var timeStr = `Iteration ${x + 1}`;
    console.time(timeStr);
    await pauseLoop(pauseTimeSec);
    console.timeEnd(timeStr);
  }
  console.log('testPauseLoop done');
}

// generated thanks to faker.js
// tip: ever need lots of fake data real quick??
// head to here: https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#name
// open the console and type in faker. You can access the faker api real quick this way
// use this to quickly create an array of users in the console
// you may have to JSON.stringify the array for quick copy to your code editor
var USERS = [
  { name: 'Marlee Beier' },
  { name: 'Mrs. Kennith Carter' },
  { name: 'Everette Hauck' },
  { name: 'Mr. Veronica Stehr' },
  { name: 'Letitia Harvey' },
  { name: 'Santina Schumm' },
  { name: 'Jarret Jast' },
  { name: 'Mr. Meghan Parker' },
  { name: 'Rico Nienow' },
  { name: 'Jermain Mante' },
  { name: 'Barry Legros' },
  { name: 'Liliana Beahan' },
  { name: 'Sydnee King' },
  { name: 'Savion Rippin' },
  { name: 'Luna Russel' },
  { name: 'Frankie Ward' },
  { name: 'Tressa McGlynn' },
  { name: 'Kaela Yost' },
  { name: 'Dr. Mathilde Schneider' },
  { name: 'Danika Rippin' },
  { name: 'Aracely Lindgren' },
  { name: 'Danielle Bernier' },
  { name: 'Lucienne Leuschke' },
  { name: 'Niko Kertzmann' },
  { name: 'Anastacio Kutch' },
  { name: 'Giuseppe Kilback PhD' },
  { name: 'Bart Purdy' },
  { name: 'Murphy Bauch' },
  { name: 'Adam Koepp' },
  { name: 'Maxie Rogahn' },
  { name: 'Zella McCullough' },
  { name: 'Omer Sporer' },
  { name: 'Katharina Bode' },
  { name: 'Audra Pacocha' },
  { name: 'Edyth Reinger' },
  { name: 'Everette Tillman' },
  { name: 'Bennie Schiller' },
  { name: 'Tia Padberg I' },
  { name: 'Ines Tremblay' },
  { name: 'Cora Lehner' },
  { name: 'Miss Kaylah Jones' },
  { name: 'Winona Dooley' },
  { name: 'Rae Schiller' },
  { name: 'Linnie Johnson' },
  { name: 'Dr. Shanna Renner' },
  { name: 'Litzy Lehner' },
  { name: 'Dixie Watsica' },
  { name: 'Amir Marquardt' },
  { name: 'Mrs. Minnie Botsford' },
  { name: 'Ari Kiehn' },
];
