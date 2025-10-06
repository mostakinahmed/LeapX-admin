const loader = document.getElementById("loader");
const form = document.getElementById("full-form");

function createCategory(name) {
  const safeId = name.replace(/\s+/g, "_") + "Fields";
  const safeName = name.replace(/\s+/g, "_"); // use for input names

  return `
    <div class="border p-4 mb-2 rounded-lg bg-white shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xl font-semibold">${name}</span>
        <button type="button" onclick="addKeyValue('${safeId}', '${safeName}')" 
          class="text-green-600 bg-gray-100 rounded-md hover:bg-gray-200 px-3 font-bold text-2xl">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>

      <div id="${safeId}" class="space-y-2">
        <div class="flex gap-4 items-center">
          <input type="text" placeholder="Key" class="p-2 border rounded w-1/2" name="${safeName}Key[]">
          <input type="text" placeholder="Value" class="p-2 border rounded w-1/2" name="${safeName}Value[]">
          <button type="button" onclick="removeBox(this)" 
            class="text-red-500 bg-gray-100 rounded-md hover:bg-gray-200 px-3 font-bold text-2xl">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Add new Key-Value row
function addKeyValue(containerId, safeName) {
  const container = document.getElementById(containerId);
  const div = document.createElement("div");
  div.className = "flex gap-4 items-center";
  div.innerHTML = `
    <input type="text" placeholder="Key" class="p-2 border rounded w-1/2" name="${safeName}Key[]">
    <input type="text" placeholder="Value" class="p-2 border rounded w-1/2" name="${safeName}Value[]">
    <button type="button" onclick="removeBox(this)" 
        class="text-red-500 bg-gray-100 rounded-md hover:bg-gray-200 px-3 font-bold text-2xl">
        <i class="fa-solid fa-trash"></i>
    </button>
  `;
  container.appendChild(div);
}

// Remove a Key-Value row
function removeBox(button) {
  button.parentElement.remove();
}

const dropdown = document.getElementById("category");
const container = document.getElementById("categoriesContainer");
const saveBTN = document.getElementById("saveBTN");

//category show
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

  //dynamic filed view
  categoryDropdown.onchange = function () {
    saveBTN.classList.add("hidden");
    container.innerHTML = "";
    const currentCat = this.value;
    console.log("current category is : " + currentCat);

    //data load from api.. all sub cat list
    const specification = catData.find(
      (cat) => cat.catName === currentCat
    ).specifications;

    specification.forEach((name) => {
      container.innerHTML += createCategory(name);
    });
    saveBTN.classList.remove("hidden");
  };

  //save btn
  const submitForm = document.getElementById("productForm");
  submitForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // prevent reload
    form.classList.add("hidden");
    loader.classList.remove("hidden");

    const selectCat = document.getElementById("categoryDropdown").value;
    const catID = catData.find((cat) => cat.catName === selectCat);

    // Collect general info
    const product = {
      name: document.getElementById("productName").value.trim(),
      brandName: document.getElementById("brandName").value.trim(),
      description: document.getElementById("description").value.trim(),
      price: parseFloat(document.getElementById("price").value) || 0,
      stock: parseInt(document.getElementById("stock").value) || 0,
      category: catID.catID,
      images: document.getElementById("image").value.trim(),
      specifications: {}, // dynamic categories
    };

    // Collect dynamic specifications
    const specContainers = container.querySelectorAll("div[id$='Fields']"); // all dynamic category containers

    specContainers.forEach((catContainer) => {
      const safeName = catContainer.id.replace(/Fields$/, ""); // remove 'Fields' to get safeName
      const keyInputs = catContainer.querySelectorAll(
        `input[name='${safeName}Key[]']`
      );
      const valueInputs = catContainer.querySelectorAll(
        `input[name='${safeName}Value[]']`
      );

      if (keyInputs.length && valueInputs.length) {
        product.specifications[safeName] = [];
        keyInputs.forEach((keyInput, i) => {
          const valInput = valueInputs[i];
          if (keyInput.value.trim() && valInput.value.trim()) {
            product.specifications[safeName].push({
              key: keyInput.value.trim(),
              value: valInput.value.trim(),
            });
          }
        });
      }
    });

    console.log(product);

    // send to backend
    //3️⃣ Send to backend (example using fetch)
    fetch("https://fabribuzz.onrender.com/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
        // form.classList.re("hidden");
        // loader.classList.add("hidden");
      })
      .catch((err) => console.error(err));
  });
});
