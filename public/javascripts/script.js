//variable
const searchProductBtn = document.getElementById("search-product-btn");
// const modals = document.getElementById("modals");
const stockUpdateDiv = document.getElementById("stockUpdateDiv");
const updateSearchProductForm = document.getElementById("stock-search-form");
const productNotFound = document.getElementById("product-not-found");
const loadingForSearchData = document.getElementById("loadingForSearchData");
const loadingForAddProduct = document.getElementById("loadingForAddProduct");
const loadingOrder = document.getElementById("loadingOrder");
const loadingForEdit = document.getElementById("loadingForEdit");
const loadingForAddCat = document.getElementById("loadingForAddCat");
const addCatform = document.getElementById("add-category-form");
const addCategoryCancel = document.getElementById("addCategoryCancel");
const addProductCancel = document.getElementById("addProductCancel");
const stockUpdateCancel = document.getElementById("stockUpdateCancel");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const dashboard = document.getElementById("dashboard");
const charts = document.getElementById("charts");
const editProductForm = document.getElementById("editProductForm");
const catListForm = document.getElementById("catList");
const allProductTable = document.getElementById("allProductTable");
const form = document.getElementById("add-product-form");
const editForm = document.getElementById("edit-product-form");
const loadingDashboard = document.getElementById("loadingDashboard");
const searchInput = updateSearchProductForm.querySelector('input[name="pID"]');
const addNewPro_name = form.querySelector('input[name="name"]');
const addNewPro_price = form.querySelector('input[name="price"]');
const addNewPro_category = form.querySelector('select[name="category"]');
const addNewPro_images = form.querySelector('input[name="images"]');
const addNewPro_description = form.querySelector(
  'textarea[name="description"]'
);

//order variable
const orderHomeSection = document.getElementById("order-home");
const OrderView = document.getElementById("OrderView");
const emptyOrderMessage = document.getElementById("emptyOrderMessage");
const orderConfirmButton = document.getElementById("orderConfirmButton");
const viewOrderInfo = document.getElementById("viewOrderProduct");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");
const loadingOrder2 = document.getElementById("loadingOrder2");

loadingDashboard.classList.remove("hidden");
//feather all
feather.replace();
function showSection(sectionId) {
  const sections = ["dashboard", "products", "categories", "orders", "users"];
  sections.forEach((id) => {
    document.getElementById(id).classList.add("hidden");
  });

  //hide empty error message
  emptyOrderMessage.classList.add("hidden");
  OrderView.classList.add("hidden");
  viewOrderProduct.classList.add("hidden");

  const orderTableBody = document.getElementById("orderTableBody");
  orderTableBody.innerHTML = "";

  //hide always chart
  charts.classList.add("hidden");

  // Hide all product info after click in another tab
  updateSearchProductForm.classList.add("hidden");
  if (searchInput) searchInput.value = "";
  stockUpdateDiv.classList.add("hidden");
  productNotFound.classList.add("hidden");

  //hide all add new pro form data after click another section
  form.classList.add("hidden");
  if (addNewPro_name) addNewPro_name.value = "";
  if (addNewPro_price) addNewPro_price.value = "";
  if (addNewPro_category) addNewPro_category.value = "";
  if (addNewPro_images) addNewPro_images.value = "";
  if (addNewPro_description) addNewPro_description.value = "";

  //hide all cat data
  addCatform.classList.add("hidden");
  catListForm.classList.remove("hidden"); //show this section when other section is active

  //only show the selected section
  document.getElementById(sectionId).classList.remove("hidden");

  // Fetch products when the Products section is shown
  if (sectionId === "products") {
    fetchProducts();
    allProductTable.classList.remove("hidden");
    editForm.classList.add("hidden");
    const l = 99;
  }
  //fetch dashboard data when dashboard is shown
  if (sectionId === "dashboard") {
    charts.classList.remove("hidden");
    fetchDashboardData();
  }
  //fetch category data when category is shown
  if (sectionId === "categories") {
    fetchCategoryData();
  }

  //fetch Order data when Order is shown
  if (sectionId === "orders") {
    orderHomeSection.classList.remove("hidden");
    OrderView.classList.add("hidden");
    orderHomeData();
  }
}

// Run automatically when page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchDashboardData();
  fetchCategories();
  fetchProducts();
  orderHomeData();
  //showData(card);
});

//popup maintainer
function showPopup() {
  document.getElementById("popup").style.display = "flex";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Show/hide add product form
function showAddProduct() {
  productNotFound.classList.add("hidden");
  updateSearchProductForm.classList.add("hidden");
  stockUpdateDiv.classList.add("hidden");
  allProductTable.classList.add("hidden");
  form.classList.remove("hidden");
}

// Show/hide update stock form
function showUpdateStock() {
  productNotFound.classList.add("hidden");
  form.classList.add("hidden");
  allProductTable.classList.add("hidden");
  updateSearchProductForm.classList.remove("hidden");

  stockUpdateDiv.classList.add("hidden");
  //input field make empty
  if (searchInput) searchInput.value = "";
}

// Show/hide add new category form
function showAddCategory() {
  catListForm.classList.add("hidden");
  addCatform.classList.remove("hidden");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("-translate-x-full");
}

// // Add Product
// const addBtn = document.getElementById("addProductBtn");
// addBtn.addEventListener("click", async function (e) {
//   e.preventDefault();
//   const form = e.target.form;

//   //cat data
//   const response = await fetch("https://fabribuzz.onrender.com/api/category");
//   const allCatData = await response.json();

//   const data = {
//     pID: "NULL",
//     name: form.name.value,
//     price: form.price.value,
//     category: form.category.value,
//     description: form.description.value,
//     images: form.images.value,
//   };

//   //replace category name with id
//   allCatData.forEach((category) => {
//     if (category.catName === data.category) {
//       data.category = category.catID;
//     }
//   });

//   if (
//     data.name === "" ||
//     data.price === "" ||
//     data.category === "" ||
//     data.images === "" ||
//     data.description === ""
//   ) {
//     alert("Please fill in all fields");
//     return;
//   } else {
//     loadingForAddProduct.classList.remove("hidden");
//     //console.log("All fields are filled");

//     const response = await fetch("https://fabribuzz.onrender.com/api/product", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     // await response.text();
//     await response.json();
//     //reset form and hide it
//     form.reset();
//     loadingForAddProduct.classList.add("hidden");
//     showSection("products");
//   }
// });

//cancel button
addProductCancel.addEventListener("click", (e) => {
  e.preventDefault();

  form.classList.add("hidden");
  allProductTable.classList.remove("hidden");
});

// Show all products
async function fetchProducts() {
  const response = await fetch("https://fabribuzz.onrender.com/api/product");
  const products = await response.json();
  countProduct = products.length;
  const productsContainer = document.getElementById("product-table-body");

  // Fetch categories
  const response2 = await fetch("https://fabribuzz.onrender.com/api/category");
  const cData = await response2.json();

  //reset  div
  productsContainer.innerHTML = "";

  products.forEach((product, index) => {
    // Find matching category by ID
    const category = cData.find((cat) => cat.catID === product.category);

    // Replace ID with category name (if found)
    const categoryName = category ? category.catName : "Unknown";

    // Create table row
    const productRow = document.createElement("tr");
    productRow.innerHTML = `
      <td class="px-6 py-4">${index + 1}</td>
      <td class="px-6 py-4">${product.pID}</td>
      <td class="px-6 py-4">${product.name}</td>
      <td class="px-6 py-4">$${product.price}</td>
      <td class="px-6 py-4">${product.stock}</td>
      <td class="px-6 py-4">${categoryName}</td>
      <td class="px-6 py-4">
        <img src="${product.images}" alt="${product.name}" 
             class="h-12 w-12 object-cover rounded-md" />
      </td>
     <td class="px-6 py-4 flex items-center space-x-2">
  <!-- Edit button -->
  <button class="bg-yellow-400 text-white px-2 py-1 rounded-lg hover:bg-yellow-500" onclick="editFunction(event, '${
    product._id
  }')">
    Edit
  </button>

  <!-- Delete button -->
  <button
    class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
    onclick="deleteFunction(event, '${product._id}')"
  >
    Delete
  </button>

  <!-- Loader-->
  <div
    id="loadingForDelete"
    class="hidden flex items-left space-x-2"
  >
    <div class="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    <span class="text-gray-600 text-[15px] font-medium">Deleting...</span>
  </div>
</td>
    `;
    // const loadingForDelete = getElementById("loadingForDelete");
    productsContainer.appendChild(productRow);
  });
}
fetchProducts();

//delete pro function
async function deleteFunction(event, productID) {
  event.preventDefault(); // prevents reload

  // loader is the next sibling of the Delete button
  const loaderForDelete = event.target.nextElementSibling;
  loaderForDelete.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://fabribuzz.onrender.com/api/product/delete/${productID}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = { message: "Product deleted (no JSON returned)" };
    }

    if (response.ok) {
      // alert(result.message);
      loaderForDelete.classList.add("hidden"); // hide loader
      // remove row from table
      const row = event.target.closest("tr");
      if (row) row.remove();
    } else {
      alert(result.message || "Delete failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting product");
  }
}

//Update Product
async function editFunction(event, productID) {
  event.preventDefault(); // prevents reload
  //loadingForEdit.classList.remove("hidden");
  allProductTable.classList.add("hidden");
  const response = await fetch("https://fabribuzz.onrender.com/api/product");
  const products = await response.json();
  const product = products.find((p) => p._id === productID);

  //all product data
  editForm.classList.remove("hidden");
  allProductTable.classList.add("hidden");
  // loadingForEdit.classList.add("hidden");
  editProductForm.innerHTML = ""; //reset dashboard content
  editProductForm.innerHTML = `<input
                type="text"
                name="name"
                value="${product.name}"
                class="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="number"
                name="price"
                value="${product.price}"
                class="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
               <input
               name = "stock"
                type="number"
                disabled
                value="${product.stock}"
                class="w-full border p-2 rounded-lg  text-gray-500  focus:ring-2 focus:ring-indigo-400"
                required
              />
          
              <select
                id="categoryDropdownForEditProduct"
                name="category"
                class="w-full border p-2 rounded-lg"
                disabled
                required
              >
                <option value="${product.category}">${product.category}</option>
              </select>

              <input
                type="text"
                name="images"
                value="${product.images}"
                class="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />

             <textarea
  name="description"
  class="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
  required
>${product.description}</textarea>
               <button
                class="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg shadow hover:from-green-600 hover:to-teal-600" 
                onclick="updateProductFunction(event,'${product._id}')"
              >
                Update Product
              </button>
               <button
                id="editCancel"
                class="bg-gradient-to-r from-red-500 to-red-500 text-white px-4 py-2 rounded-lg shadow hover:from-red-600 hover:to-red-600"
              >
                Cancel
              </button>
  `;

  //cancel button
  const editCancel = document.getElementById("editCancel");
  editCancel.addEventListener("click", (e) => {
    e.preventDefault();

    editForm.classList.add("hidden");
    allProductTable.classList.remove("hidden");
  });

  //category dropdown for edit product
  categoryDropdownForEditProduct.addEventListener("focus", async () => {
    const selectedValue = categoryDropdownForEditProduct.value; // keep current selection

    const response = await fetch("https://fabribuzz.onrender.com/api/category");
    const catData = await response.json();

    categoryDropdownForEditProduct.innerHTML = `<option value="">-- Select Category --</option>`;
    catData.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.catName;
      option.textContent = category.catName;
      if (option.value === selectedValue) {
        option.selected = true; // restore previous selection
      }
      categoryDropdownForEditProduct.appendChild(option);
    });
  });
}

//Edit Product Button
async function updateProductFunction(event, productID) {
  event.preventDefault();
  //loadingForEdit.classList.remove("hidden");
  editForm.classList.add("hidden");
  const form = editProductForm;
  const data = {
    name: form.name.value,
    price: form.price.value,
    description: form.description.value,
    images: form.images.value,
    stock: form.stock.value,
    category: form.category.value,
  };

  //sent put req to api
  const response = await fetch(
    `https://fabribuzz.onrender.com/api/product/update/${productID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  // loadingForEdit.classList.add("hidden");

  fetchProducts();
  allProductTable.classList.remove("hidden");
  console.log(data);
}

//---------------------Add new category------------------
addCategoryBtn.addEventListener("click", async function (e) {
  loadingForAddCat.classList.remove("hidden");
  e.preventDefault();
  //  const categoryForm = document.getElementById("categoryForm");
  const categoryFormData = e.target.form;
  const data = {
    catName: categoryFormData.catname.value,
    catID: categoryFormData.catid.value,
  };

  if (data.catName === "" || data.catID === "") {
    alert("Please fill in all fields");
    return;
  } else {
    const response = await fetch(
      "https://fabribuzz.onrender.com/api/category",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    loadingForAddCat.classList.add("hidden");
    //reset form and hide it
    categoryForm.reset();
    fetchCategories();
    showSection("categories");
  }
});

//cancel button
//stock search Cancel
addCategoryCancel.addEventListener("click", (e) => {
  e.preventDefault();

  addCatform.classList.add("hidden");
  fetchCategories();
  showSection("categories");
});

// fetch Categories
async function fetchCategories() {
  const response = await fetch("https://fabribuzz.onrender.com/api/category");
  const categories = await response.json();
  catCount = categories.length;
  const categoriesContainer = document.getElementById("category-table-body");

  categoriesContainer.innerHTML = "";
  categories.forEach((category, index) => {
    // Create table row
    const categoryRow = document.createElement("tr");

    categoryRow.innerHTML = `
    <td class="px-6 py-4">${index + 1}</td>
      <td class="px-6 py-4">${category.catID}</td>
    <td class="px-6 py-4">${category.catName}</td>
  
    <td class="px-6 py-4 flex items-center space-x-2">
  <!-- Edit button -->
  <button class="bg-yellow-400 text-white px-2 py-1 rounded-lg hover:bg-yellow-500">
    Edit
  </button>

  <!-- Delete button -->
  <button
    class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
    onclick="deleteCategoryFunction(event, '${category._id}')"
  >
    Delete
  </button>

  <!-- Loader-->
  <div
    id="loadingForCatDelete"
    class=" hidden flex items-left pl-6 space-x-2"
  >
    <div class="w-5 h-5 mt-1 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    <span class="text-gray-600 text-[17px] font-medium">Deleting...</span>
  </div>
</td>
  `;

    // Append to tbody
    categoriesContainer.appendChild(categoryRow);
  });
}
fetchCategories(); // Run automatically when page loads

//delete cat function
async function deleteCategoryFunction(event, categoryID) {
  event.preventDefault(); // prevents reload

  // loader is the next sibling of the Delete button
  const loadingForCatDelete = event.target.nextElementSibling;
  loadingForCatDelete.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://fabribuzz.onrender.com/api/category/delete/${categoryID}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = { message: "Product deleted (no JSON returned)" };
    }

    if (response.ok) {
      // alert(result.message);
      loadingForCatDelete.classList.add("hidden"); // hide loader
      // remove row from table
      const row = event.target.closest("tr");
      if (row) row.remove();
    } else {
      alert(result.message || "Delete failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting product");
  }
}

//fetch dashboard data
async function fetchDashboardData() {
  //product fetch and count
  const response = await fetch("https://fabribuzz.onrender.com/api/product");
  const pData = await response.json();
  ///cat fetch and count
  const catResponse = await fetch(
    "https://fabribuzz.onrender.com/api/category"
  );
  const cData = await catResponse.json();
  //order fetch and count
  const orderResponse = await fetch("https://fabribuzz.onrender.com/api/order");
  const oData = await orderResponse.json();

  //pending order list
  const pendingData = oData.filter((data) => data.orderStatus === "Pending");
  const pendingOrderValue = pendingData.length;

  catCount = cData.length;
  countProduct = pData.length;
  let countOrder = oData.length;

  // Update dashboard elements
  dashboard.innerHTML = ""; //reset dashboard content
  dashboard.innerHTML = `
     <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div class="bg-gradient-to-r from-green-400 to-emerald-600 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-white/80 text-md font-medium">Total Products</h2>
      <p class="text-3xl font-extrabold text-white mt-2">${countProduct}</p>
    </div>
    <div class="bg-white/20 p-3 rounded-full">
      <!-- Box icon for products -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4m16 0l-8 8m8-8l-8-8" />
      </svg>
    </div>
  </div>
</div>

            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-white/80 text-md font-medium">Total Categories</h2>
      <p class="text-3xl font-extrabold text-white mt-2">${catCount}</p>
    </div>
    <div class="bg-white/20 p-3 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    </div>
  </div>
</div>

<div class="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-white/80 text-md font-medium">Total Order</h2>
      <p class="text-3xl font-extrabold text-white mt-2">${countOrder}</p>
    </div>
    <div class="bg-white/20 p-3 rounded-full">
      <!-- icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V7a2 2 0 00-2-2h-4l-2-2H8a2 2 0 00-2 2v6" />
      </svg>
    </div>
  </div>
</div>

<div class="bg-gradient-to-r from-pink-500 to-rose-500 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-white/80 text-md font-medium">Pending Orders</h2>
      <p class="text-3xl font-extrabold text-white mt-2" id="pendingOrderDashboard">${pendingOrderValue}</p>
    </div>
    <div class="bg-white/20 p-3 rounded-full">
      <!-- icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 4h10v10H7V7z" />
      </svg>
    </div>
  </div>
</div>

  `;

  charts.innerHTML = "";
  charts.innerHTML = `
   <div class="bg-white p-6 rounded-2xl shadow-lg">
            <h2 class="text-xl font-semibold mb-4">Orders Overview</h2>

            <!-- Chart wrapper with fixed height -->
            <div class="relative h-64">
              <!-- h-64 = 16rem (256px) -->
              <canvas id="ordersChart"></canvas>
            </div>
          </div>`;

  //bellow code for showing chart in dashboard
  const ctx = document.getElementById("ordersChart").getContext("2d");
  const ordersChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar"],
      datasets: [
        {
          label: "Pending",
          data: [5, 8, 4],
          backgroundColor: "rgba(255,206,86,0.6)",
          borderRadius: 6,
        },
        {
          label: "Completed",
          data: [3, 6, 7],
          backgroundColor: "rgba(75,192,192,0.6)",
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // very important for custom height
      plugins: {
        legend: { position: "top" },
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: "#E5E7EB" } },
      },
    },
  });

  loadingDashboard.classList.add("hidden");
}

categoryDropdown.addEventListener("focus", async () => {
  const selectedValue = categoryDropdown.value; // keep current selection

  const response = await fetch("https://fabribuzz.onrender.com/api/category");
  const catData = await response.json();

  categoryDropdown.innerHTML = `<option value="">-- Select Category --</option>`;
  catData.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.catName;
    option.textContent = category.catName;
    if (option.value === selectedValue) {
      option.selected = true; // restore previous selection
    }
    categoryDropdown.appendChild(option);
  });
});

//--------------stock update----------------
//search product
searchProductBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  loadingForSearchData.classList.remove("hidden");
  productNotFound.classList.add("hidden");
  stockUpdateDiv.classList.add("hidden");
  const form = e.target.form;
  pid = form.pID.value;

  //handle empty input
  if (pid == "") {
    loadingForSearchData.classList.add("hidden");
    alert("Please input Product ID");
    return;
  }
  //get product data
  const response = await fetch("https://fabribuzz.onrender.com/api/product");
  const proData = await response.json();

  let found = 0;
  let foundData;
  proData.forEach((product) => {
    if (product.pID === pid) {
      found = 1;
      foundData = product;
      return;
    }
  });

  if (found == 1) {
    loadingForSearchData.classList.add("hidden");
    stockUpdateDiv.classList.remove("hidden");
    productNotFound.classList.add("hidden");

    // stockUpdate(pid);
    showDataDiv(pid, foundData);
  } else if (found == 0) {
    loadingForSearchData.classList.add("hidden");
    productNotFound.classList.remove("hidden");
    stockUpdateDiv.classList.add("hidden");
  }
});

//stock search Cancel
stockUpdateCancel.addEventListener("click", (e) => {
  e.preventDefault();

  updateSearchProductForm.classList.add("hidden");
  fetchProducts();
  allProductTable.classList.remove("hidden");
});

//show div
function showDataDiv(ID, foundData) {
  const stockUpdateDiv = document.getElementById("stockUpdateDiv");

  stockUpdateDiv.innerHTML = "";
  stockUpdateDiv.innerHTML = ` <div class="flex-shrink-0 w-full md:w-1/3">
              <img
                id="product-image"
                src="${foundData.images}"
                alt="Product Image"
                class="w-full h-full object-cover rounded-xl border border-gray-200"
              />
            </div>

            <!-- Product Details & Update Stock -->
            <div class="flex-1 flex flex-col justify-between space-y-4">
              <!-- Product Info -->
              <div class="space-y-3">
                <h3
                  class="text-3xl font-extrabold text-gray-900 tracking-tight"
                  id="product-name"
                >
                  ${foundData.name}
                </h3>
                <div class="grid grid-cols-2 gap-4 text-gray-700">
                  <p class="font-medium">
                    <span class="text-gray-500">ID:</span>
                    <span id="product-id">${foundData.pID}</span>
                  </p>
                  <p class="font-medium">
                    <span class="text-gray-500">Price:</span> $<span
                      id="product-price"
                      >${foundData.price}</span
                    >
                  </p>
                  <p class="font-medium">
                    <span class="text-gray-500">Current Stock:</span>
                    <span id="product-stock">${foundData.stock}</span>
                  </p>

                </div>
              </div>

              <!-- Update Stock Form -->
              <form
                id="update-stock-form"
                class="mt-4 flex flex-col sm:flex-row items-center gap-3"
              >
                <input
                  type="number"
                  name="stock"
                  placeholder="Enter new stock"
                  class="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  required
                />
                <!-- Small loading spinner beside button -->
<div id="loadingForUpdateStock" class="flex items-center space-x-2 hidden">
  <!-- Spinner -->
  <div class="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  <!-- Text -->
  <span class="text-gray-600 text-sm font-medium">Updating...</span>
</div>
                <button
                id="update-stock-button"
                  type="submit"
                  class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transform transition"
                >
                  Update Stock
                </button>
              </form>
              <!-- loader -->
            </div>
  `;

  //for loader
  const loadingForUpdateStock = document.getElementById(
    "loadingForUpdateStock"
  );
  //for button
  const updateStockButton = document.getElementById("update-stock-button");
  //update stock button
  updateStockButton.addEventListener("click", (e) => {
    e.preventDefault();

    const form = e.target.form;
    let stockValue = form.stock.value;
    if (stockValue === "") {
      alert("Please input stock value.");
      return;
    }
    loadingForUpdateStock.classList.remove("hidden");
    stockValue = Number(stockValue);
    stockValue = stockValue + foundData.stock;
    stockUpdate(foundData.pID, stockValue);
  });
}

async function stockUpdate(pID, stockValue) {
  const data = { stock: stockValue };
  console.log(pID);
  const response = await fetch(
    `https://fabribuzz.onrender.com/api/product/${pID}/stock`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok) {
    loadingForUpdateStock.classList.add("hidden");
    showSection("products");
  }
  if (!response.ok) {
    throw new Error(`Failed to update stock: ${response.status}`);
  }
}

//-----------------Order -------------------------------------
function backButton() {
  OrderView.classList.add("hidden");
  viewOrderProduct.classList.add("hidden");
  emptyOrderMessage.classList.add("hidden");
  orderHomeSection.classList.remove("hidden");
  loadingOrder2.classList.add("hidden");
  orderHomeData();

  //reset table
  const orderTableBody = document.getElementById("orderTableBody");
  orderTableBody.innerHTML = "";
}

//order home data
async function orderHomeData() {
  const totalOrder = document.querySelector("#totalOrder");
  const todaysOrder = document.querySelector("#todaysOrder");
  const pendingOrder = document.querySelector("#pendingOrder");
  const shippedOrder = document.querySelector("#shippedOrder");
  const deliveredOrder = document.querySelector("#deliveredOrder");
  const confirmOrder = document.querySelector("#confirmOrder");
  const cancelOrder = document.querySelector("#cancelOrder");

  // data fetch
  const response = await fetch("https://fabribuzz.onrender.com/api/order");
  const order = await response.json();

  //total order
  const totalOrderValue = order.length;
  totalOrder.textContent = totalOrderValue;

  //today order
  //-----------------------------------------------------------------------
  // Get today's date in 'YYYY-MM-DD'
  const today = new Date().toISOString().split("T")[0];

  // Filter orders created today
  const todaysData = order.filter((data) => {
    const orderDate = new Date(data.orderDate).toISOString().split("T")[0];
    return orderDate === today;
  });
  const todaysOrderValue = todaysData.length;
  todaysOrder.textContent = todaysOrderValue;
  //-----------------------------------------------------------------------

  //pending order
  const pendingData = order.filter((data) => data.orderStatus === "Pending");
  const pendingOrderValue = pendingData.length;
  pendingOrder.textContent = pendingOrderValue;

  //confirm order
  const confirmData = order.filter((data) => data.orderStatus === "Confirm");
  const confirmOrderValue = confirmData.length;
  confirmOrder.textContent = confirmOrderValue;

  //shipped order
  const shippedData = order.filter((data) => data.orderStatus === "Shipped");
  const shippedOrderValue = shippedData.length;
  shippedOrder.textContent = shippedOrderValue;

  //delivered order
  const deliveredData = order.filter(
    (data) => data.orderStatus === "Delivered"
  );
  const deliveredOrderValue = deliveredData.length;
  deliveredOrder.textContent = deliveredOrderValue;

  //cancel order
  const cancelData = order.filter((data) => data.orderStatus === "Cancel");
  const cancelOrderValue = cancelData.length;
  cancelOrder.textContent = cancelOrderValue;
}

//------add click on all card----------------
function showOrder(card) {
  loadingOrder2.classList.add("hidden");
  loadingOrder.classList.remove("hidden");
  orderHomeSection.classList.add("hidden");
  showData(card);
  OrderView.classList.remove("hidden");
}

//show data
async function showData(card) {
  // data fetch
  const response = await fetch("https://fabribuzz.onrender.com/api/order");
  const orders = await response.json();
  let Data = [];

  //separate pending
  if (card === "pending") {
    Data = orders.filter((data) => data.orderStatus === "Pending");
  } else if (card === "confirm") {
    Data = orders.filter((data) => data.orderStatus === "Confirm");
  } else if (card === "shipped") {
    Data = orders.filter((data) => data.orderStatus === "Shipped");
  } else if (card === "delivered") {
    Data = orders.filter((data) => data.orderStatus === "Delivered");
  } else if (card === "cancel") {
    Data = orders.filter((data) => data.orderStatus === "Cancel");
  } else if (card === "total") {
    Data = orders;
  } else if (card === "todays") {
    //today order
    //-----------------------------------------------------------------------
    // Get todays date in 'YYYY-MM-DD'
    const today = new Date().toISOString().split("T")[0];

    // Filter orders created today
    const todaysData = orders.filter((data) => {
      const orderDate = new Date(data.orderDate).toISOString().split("T")[0];
      return orderDate === today;
    });
    const todaysOrderValue = todaysData.length;
    todaysOrder.textContent = todaysOrderValue;
    //-----------------------------------------------------------------------
    Data = todaysData;
  }

  const orderTableBody = document.getElementById("orderTableBody");
  orderTableBody.innerHTML = "";

  // modals.classList.remove("hidden");
  loadingOrder.classList.add("hidden");
  const len = Data.length;
  if (len > 0) {
    Data.forEach((element, sn) => {
      const orderRow = document.createElement("tr");
      orderRow.innerHTML = `
                      <td class="px-6 py-4">${sn + 1}</td>
                      <td class="px-6 py-4">${element.OID}</td>
                      <td class="px-6 py-4">${element.customerName}</td>
                      <td class="px-6 py-4">
                        <span
                          class="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800"
                          >${element.orderStatus}</span
                        >
                      </td>
                      
 <td class="px-6 py-4 text-right">
                         <button
    class="text-indigo-600 hover:text-indigo-900 font-medium"
    onclick='viewAction(${JSON.stringify(JSON.stringify(element))})'>
    View
  </button>
                      </td>         
  `;
      orderTableBody.appendChild(orderRow);
    });
  } else {
    emptyOrderMessage.classList.remove("hidden");
  }
}

// container section
//const viewOrderProduct = document.getElementById("viewOrderProduct");

// image + text fields
const orderImage = document.getElementById("orderImage");
const orderProductName = document.getElementById("orderProductName");
const orderId = document.getElementById("orderId");
const orderStatus = document.getElementById("orderStatus");
const customerName = document.getElementById("customerName");
const customerEmail = document.getElementById("customerEmail");
const customerPhone = document.getElementById("customerPhone");
const shippingAddress = document.getElementById("shippingAddress");
const paymentMethod = document.getElementById("paymentMethod");
const productId = document.getElementById("productId");
const productCategory = document.getElementById("productCategory");
const productQuantity = document.getElementById("productQuantity");
const productPrice = document.getElementById("productPrice");
const totalPrice = document.getElementById("totalPrice");
const multipleActionBtn = document.getElementById("multipleActionBtn");

// buttons
const closeBtn = document.getElementById("closeBtn");

function viewAction(orderData) {
  const order = JSON.parse(orderData); // back to object

  orderImage.src = order.images;
  orderProductName.textContent = order.productName;
  orderId.textContent = order.OID;
  orderStatus.textContent = order.orderStatus;
  customerName.textContent = order.customerName;
  customerEmail.textContent = order.customerEmail;
  customerPhone.textContent = order.customerPhone;
  shippingAddress.textContent = order.shippingAddress;
  paymentMethod.textContent = order.paymentMethod;
  productId.textContent = order.pID;
  productCategory.textContent = order.category;
  productQuantity.textContent = order.productQuantity;
  productPrice.textContent = order.productPrice;
  totalPrice.textContent = order.totalPrice;
  confirmBtn.dataset.oid = order.OID;
  confirmBtn.dataset.currStatus = order.orderStatus;
  cancelBtn.dataset.oid = order.OID;
  cancelBtn.dataset.currStatus = order.orderStatus;

  //auto enable button
  confirmBtn.classList.remove("hidden");
  cancelBtn.classList.remove("hidden");

  // //action btn name management
  if (order.orderStatus === "Pending") {
    multipleActionBtn.textContent = "Confirm";
    confirmBtn.dataset.status = "Confirm";
  } else if (order.orderStatus === "Confirm") {
    //  cancelBtn.classList.add("hidden");
    multipleActionBtn.textContent = "Shipped";
    confirmBtn.dataset.status = "Shipped";
  } else if (order.orderStatus === "Shipped") {
    multipleActionBtn.textContent = "Delivered";
    confirmBtn.dataset.status = "Delivered";
  }

  if (order.orderStatus === "Delivered") {
    cancelBtn.classList.add("hidden");
    confirmBtn.classList.add("hidden");
  }

  if (order.orderStatus === "Cancel") {
    cancelBtn.classList.add("hidden");
    confirmBtn.classList.add("hidden");
  }
  //auto enable
  // confirmBtn.classList.remove("hidden");
  // cancelBtn.classList.remove("hidden");
  // //current date
  // const todayDate = new Date().toISOString().split("T")[0];
  // // Filter orders created today
  // const orderDate = new Date(order.orderDate).toISOString().split("T")[0];
  // if (orderDate === todayDate) {
  //   confirmBtn.classList.add("hidden");
  //   cancelBtn.classList.add("hidden");
  // }

  // show the section
  OrderView.classList.add("hidden");
  viewOrderProduct.classList.remove("hidden");
  loadingOrder2.classList.add("hidden");
}

closeBtn.addEventListener("click", () => {
  viewOrderProduct.classList.add("hidden");
  OrderView.classList.remove("hidden");
  loadingOrder2.classList.add("hidden");
});

//confirm btn
confirmBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  viewOrderProduct.classList.add("hidden");
  loadingOrder2.classList.remove("hidden");
  let newStatus = confirmBtn.dataset.status;
  let oid = confirmBtn.dataset.oid;
  let currStatus = confirmBtn.dataset.currStatus;

  // // inside an async function
  try {
    const response = await fetch(
      `https://fabribuzz.onrender.com/api/order/status/${oid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      console.error("Server error:", errData);
    } else {
      let cSts = currStatus.toLowerCase();
      showOrder(cSts);
      loadingOrder2.classList.add("hidden");
      OrderView.classList.remove("hidden");
      const data = await response.json();
      console.log("Updated order:", data);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
});

//confirm btn
cancelBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  viewOrderProduct.classList.add("hidden");
  loadingOrder2.classList.remove("hidden");
  let newStatus = "Cancel";
  let oid = cancelBtn.dataset.oid;
  let currStatus = cancelBtn.dataset.currStatus;
  // // inside an async function
  try {
    const response = await fetch(
      `https://fabribuzz.onrender.com/api/order/status/${oid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      console.error("Server error:", errData);
    } else {
      let cSts = currStatus.toLowerCase();
      showOrder(cSts);
      loadingOrder2.classList.add("hidden");
      OrderView.classList.remove("hidden");
      const data = await response.json();
      console.log("Updated order:", data);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
});
