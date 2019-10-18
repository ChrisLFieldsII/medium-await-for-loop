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
async function badForLoop(numIds = 5) {
  var ids = getRandomIds(numIds);

  console.time('badForLoop');
  for (let x = 0; x < ids.length; x++) {
    var id = ids[x];
    var user = await getUser({ id });
    console.log(`User #${x + 1}`, user);
  }
  console.timeEnd('badForLoop');
}

/**
 *
 * @param {Number} numIds How many ids to generate
 * @desc An example of a "good" Array.forEach() loop in which each iteration
 * kicks off an async function without waiting for the previous iterations
 * async function to complete like the badForLoop example.
 */
function goodForEachLoop(numIds = 5) {
  var ids = getRandomIds(numIds);

  console.time('goodForEachLoop');
  ids.forEach(async (id, index) => {
    var user = await getUser({ id });
    console.log(`User #${index + 1}`, user);
  });
  console.timeEnd('goodForEachLoop');
}

/**
 *
 * @param {Number} numIds How many ids to generate
 * @desc An example of a "good" for-loop in which each iteration
 * calls an async function without awaiting and instead pushes the promise into
 * an array where Promise.all() is used to resolve the promises once the loop is done.
 */
async function goodForLoop(numIds = 5) {
  var ids = getRandomIds(numIds);

  console.time('goodForLoop');
  const promises = [];
  for (let x = 0; x < ids.length; x++) {
    const id = ids[x];
    promises.push(getUser({ id }));
  }
  const res = await Promise.all(promises);
  console.log(res);
  console.timeEnd('goodForLoop');
}

/**
 * @desc This async function simulates fetching a user
 * from a database with an id. The id is just used to index
 * the USERS array
 */
async function getUser({ id = 0 }) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(USERS[id]);
    }, 1000 * 3);
  });
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
