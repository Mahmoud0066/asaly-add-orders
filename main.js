let price = document.querySelector("#price"),
  taxes = document.querySelector("#taxes"),
  discount = document.querySelector("#discount"),
  total = document.querySelector("#total"),
  name = document.querySelector("#name"),
  category = document.querySelector("#category"),
  create = document.querySelector("#create"),
  submit = document.querySelector("#submit"),
  tbody = document.querySelector("tbody"),
  search = document.querySelector("#search"),
  tot,
  mood = "create",
  tmp,
  totaly = document.querySelector(".totaly");

window.onload = () => {
  name.focus();
};
// check if localStorage has Data
let dataArr = JSON.parse(localStorage.getItem("new")) || [];
// create prodact

submit.addEventListener("click", function () {
  // getTotal();
  let newPro = {
    name: name.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    total: tot,
    category: category.value.toLowerCase(),
    totaly: totaly,
  };
  // add new order and  update
  if (name.value != "" && price.value != "") {
    if (mood === "create") {
      dataArr.unshift(newPro);
    } else {
      dataArr[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "أضافه طلب جديد";
    }
    clearData();
  }

  // add data to localStorage
  window.localStorage.setItem("new", JSON.stringify(dataArr));

  showData();
});

// get total
function getTotal() {
  let allTotal;
  if (price.value) {
    tot = ` ${+price.value + +taxes.value - +discount.value}`;
    total.innerHTML = "اجمالي الحساب :" + tot;
  }
  allTotal += parseFloat(price);
  totaly = parseFloat(allTotal);
}

// clear data
function clearData() {
  (name.value = ""),
    (price.value = ""),
    (taxes.value = ""),
    (discount.value = ""),
    (total.innerHTML = "اجمالي الحساب :");
}

// read
function showData() {
  let table = "";
  let totalPrice = 0;
  let totalDiscount = 0;
  let totalTaxes = 0;
  let totalTot = 0;

  for (let i = 0; i < dataArr.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataArr[i].name}</td>
        <td>${dataArr[i].price}</td>
        <td>${dataArr[i].taxes}</td>
        <td>${dataArr[i].discount}</td>
        <td>${dataArr[i].total}</td>
        <td>${dataArr[i].category}</td>
        <td onclick="updateData(${i})" id="update">تعديل</td>
        <td onclick="deleteData(${i})" id="delete2">حذف</td>
      </tr>
    `;
    totalPrice += parseFloat(dataArr[i].price);
    totalDiscount += parseFloat(dataArr[i].discount) || 0;
    totalTaxes += parseFloat(dataArr[i].taxes) || 0;
    totalTot += parseFloat(dataArr[i].total);
  }
  tbody.innerHTML = table;

  let deleteAll = document.getElementById("deleteAll");
  if (dataArr.length > 0) {
    deleteAll.innerHTML = `
      <button onclick="deleteAll()"> حذف الكل(${dataArr.length}) </button>
    `;
  } else {
    deleteAll.innerHTML = ``;
  }

  let totalRow = `
    <tr class="bigTotal">
      <td>${dataArr.length}</td>
      <td>الاجمالي</td>
      <td>${totalPrice.toFixed(1)}</td>
      <td>${totalTaxes.toFixed(1)}</td>
      <td>${totalDiscount.toFixed(1)}</td>
      <td>${totalTot.toFixed(1)}</td>
    </tr>
  `;
  tbody.innerHTML += totalRow;
}

showData();
// delete
function deleteData(i) {
  dataArr.splice(i, 1);
  localStorage.new = JSON.stringify(dataArr);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataArr.splice(0);
  showData();
}

// update
function updateData(i) {
  name.value = dataArr[i].name;
  price.value = dataArr[i].price;
  taxes.value = dataArr[i].taxes;
  discount.value = dataArr[i].discount;
  category.value = dataArr[i].category;
  //
  submit.innerHTML = "تعديل";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
  });
  getTotal();
}

// search
let searchMood = "nam";
function getSearch(id) {
  if (id == "nam") {
    searchMood = "nam";
    search.placeholder = "أبحث ب الأسم";
  } else {
    searchMood = "cate";
    search.placeholder = "أبحث ب النوع";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = ``;
  for (let i = 0; i < dataArr.length; i++) {
    if (searchMood == "nam") {
      if (dataArr[i].name.includes(value)) {
        table += `
        <tr>
                <td>${i + 1}</td>
                <td>${dataArr[i].name}</td>
                <td>${dataArr[i].price}</td>
                <td>${dataArr[i].taxes}</td>
                <td>${dataArr[i].discount}</td>
                <td>${dataArr[i].total}</td>
                <td>${dataArr[i].category}</td>
                <td onclick = "updateData(${i})" id="update">تعديل</td>
                <td onclick = "deleteData(${i})" id="delete2">حذف</td>
            </tr>
        `;
      }
    } else {
      if (dataArr[i].category.includes(value)) {
        table += `
        <tr>
                <td>${i + 1}</td>
                <td>${dataArr[i].name}</td>
                <td>${dataArr[i].price}</td>
                <td>${dataArr[i].taxes}</td>
                <td>${dataArr[i].discount}</td>
                <td>${dataArr[i].total}</td>
                <td>${dataArr[i].category}</td>
                <td onclick = "updateData(${i})" id="update">تعديل</td>
                <td onclick = "deleteData(${i})" id="delete2">حذف</td>
            </tr>
        `;
      }
    }
  }
  tbody.innerHTML = table;
}
