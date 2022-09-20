const USER_DATA = [
  {
    firstName: "Annette",
    lastName: "Rodrigo",
    imageUrl:
      "https://images.unsplash.com/photo-1518833895278-e789e65b2b93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    major: "Cinematography",
    address:
      "583 Dicki Field, Apt. 372, 61094-2639, Port Gabriella, Nebraska, United States",
    regNum: "1",
    contactNumber: "(441) 543-6972",
  },
  {
    firstName: "David",
    lastName: "Gosling",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=r-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    major: "Entomology",
    address:
      "760 Koss Centers, Apt. 764, 67308, East Evansside, Kentucky, United States",
    regNum: "2",
    contactNumber: "(335) 861-7362",
  },
  {
    firstName: "Yeiwon",
    lastName: "Baek",
    imageUrl:
      "https://images.unsplash.com/photo-1482482097755-0b595893ba63?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    major: "Biochemistry",
    address:
      "426 Myrl Burgs, Suite 880, 14477-9062, Berylfort, Virginia, United States",
    regNum: "3",
    contactNumber: "(830) 573-1394",
  },
  {
    firstName: "Julian",
    lastName: "Wan",
    imageUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    major: "Biochemical Engineering",
    address:
      "091 Bergstrom Track, Apt. 064, 77095-9244, Port Brandtland, Kansas, United States",
    regNum: "4",
    contactNumber: "(441) 543-6972",
  },
];

// ! Load test table row on startup (TEST FUNCTIONALITY)
const tableContainer = document.querySelector(".content__tableBody");
const createButtonSubmit = document.querySelector(".create__buttonSubmit");
const createButtonCancel = document.querySelector(".create__buttonCancel");
const contentButtonBlue = document.querySelector(".content__button--blue");
const overlay = document.querySelector(".overlay");
const createWindow = document.querySelector(".create__window");
const updateWindow = document.querySelector(".update__window");
const userForm = document.querySelector("#userForm");

const updateForm = document.querySelector("#updateForm");
const updateButtonCancel = document.querySelector(".update__buttonCancel");
const updateButtonSubmit = document.querySelector(".update__buttonSubmit");
let dataIdStore;
let targetUpdateElement;

window.addEventListener("load", () => {
  if (!localStorage.getItem("regNum")) {
    localStorage.setItem("regNum", "5");
  }

  USER_DATA.forEach((userData) => {
    const markup = `
    <tr class="content__tableBodyRow" data-rowId="${userData.regNum}">
      <td class="content__firstName">
        <div class="content__user">
          <img
            src="${userData.imageUrl}"
            alt="${`${userData.firstName} ${userData.lastName}`}"
            class="content__userImage"
          />
          <span class="content__userName">${userData.firstName}</span>
        </div>
      </td>
      <td class="content__lastName">${userData.lastName}</td>
      <td class="content__major">${userData.major}</td>
      <td class="content__address">
        ${userData.address}
      </td>
      <td class="content__regNum">${userData.regNum}</td>
      <td class="content__contact">${userData.contactNumber}</td>
      <td class="content__contact">
        <div class="content__box">
          <div class="content__ionDelete">
            <ion-icon name="close-outline"></ion-icon>
          </div>
          <div class="content__ionUpdate">
            <ion-icon name="create-outline"></ion-icon>
          </div>
        </div>
      </td>
    </tr>
      `;

    tableContainer.insertAdjacentHTML("beforeend", markup);
  });
});

tableContainer.addEventListener("click", deleteRow);
contentButtonBlue.addEventListener("click", toggleHidden);
overlay.addEventListener("click", everyHidden);
createButtonCancel.addEventListener("click", toggleHidden);
userForm.addEventListener("submit", createRow);
updateButtonCancel.addEventListener("click", everyHidden);
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(updateForm);
  let updateData = {};

  for (const pair of formData.entries()) {
    updateData[pair[0]] = pair[1];
  }

  updateData["regNum"] = dataIdStore;
  console.table(updateData);

  const markup = `
    <tr class="content__tableBodyRow" data-rowId="${updateData.regNum}">
      <td class="content__firstName">
        <div class="content__user">
          <img
            src="${updateData.imageUrl}"
            alt="${`${updateData.firstName} ${updateData.lastName}`}"
            class="content__userImage"
          />
          <span class="content__userName">${updateData.firstName}</span>
        </div>
      </td>
      <td class="content__lastName">${updateData.lastName}</td>
      <td class="content__major">${updateData.major}</td>
      <td class="content__address">
        ${updateData.address}
      </td>
      <td class="content__regNum">${updateData.regNum}</td>
      <td class="content__contact">${updateData.contactNumber}</td>
      <td class="content__contact">
        <div class="content__box">
          <div class="content__ionDelete">
            <ion-icon name="close-outline"></ion-icon>
          </div>
          <div class="content__ionUpdate">
            <ion-icon name="create-outline"></ion-icon>
          </div>
        </div>
      </td>
    </tr>
      `;

  targetUpdateElement.innerHTML = markup;
  updateForm.reset();
  everyHidden();
});

// ? Function definition
function deleteRow(event) {
  const name = event.target.name;

  if (!name) return;

  if (name.includes("close")) {
    const tableRowToRemove = event.target.closest(".content__tableBodyRow");
    tableRowToRemove.remove();
  }

  if (name.includes("create")) {
    overlay.classList.toggle("hidden");
    updateWindow.classList.toggle("hidden");
    targetUpdateElement = event.target.closest(".content__tableBodyRow");
    dataIdStore = targetUpdateElement.dataset.rowid;

    console.log(
      Array.from(tableContainer.children).indexOf(targetUpdateElement)
    );
    console.log(dataIdStore);
  }
}

// ? Toggle Hidden for overlay and create user modal
function toggleHidden() {
  overlay.classList.toggle("hidden");
  createWindow.classList.toggle("hidden");
}

// ? Turn everything off
function everyHidden() {
  overlay.classList.add("hidden");
  createWindow.classList.add("hidden");
  updateWindow.classList.add("hidden");
}

// ? Create User
function createRow(e) {
  e.preventDefault();

  const formData = new FormData(userForm);
  let userData = {};

  for (const pair of formData.entries()) {
    userData[pair[0]] = pair[1];
  }

  console.log("Inserting data");
  console.table(userData);

  const newRegKey = +localStorage.getItem("regNum") + 1;
  localStorage.setItem("regNum", newRegKey);
  userData["regNum"] = newRegKey;

  const markup = `
    <tr class="content__tableBodyRow" data-rowId="${userData.regNum}">
      <td class="content__firstName">
        <div class="content__user">
          <img
            src="${userData.imageUrl}"
            alt="${`${userData.firstName} ${userData.lastName}`}"
            class="content__userImage"
          />
          <span class="content__userName">${userData.firstName}</span>
        </div>
      </td>
      <td class="content__lastName">${userData.lastName}</td>
      <td class="content__major">${userData.major}</td>
      <td class="content__address">
        ${userData.address}
      </td>
      <td class="content__regNum">${userData.regNum}</td>
      <td class="content__contact">${userData.contactNumber}</td>
      <td class="content__contact">
        <div class="content__box">
          <div class="content__ionDelete">
            <ion-icon name="close-outline"></ion-icon>
          </div>
          <div class="content__ionUpdate">
            <ion-icon name="create-outline"></ion-icon>
          </div>
        </div>
      </td>
    </tr>
      `;

  tableContainer.insertAdjacentHTML("beforeend", markup);
  userForm.reset();
  toggleHidden();
}
