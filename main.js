import { menu, buttonsData } from "./db.js";
// htmlden gelenler
const menuArea = document.getElementById("menu-area");
const buttonsArea = document.getElementById("buttons-area");

// sayfanın yüklenme olayı izleme
// yüklendiği anda ekrana menü elemanlarını basan fonksiyonu çalıştır

document.addEventListener("DOMContentLoaded", () => {
  renderButtons("all");
  renderMenuItems(menu);
});

// butonlar kısmında tıklanma olayllarını izker

buttonsArea.addEventListener("click", searchCategory);
//! ekrana menü elemanlarını basar
function renderMenuItems(menuItems) {
  // dizideki her bir obje için bir elemanı temsil eden html oluştur
  // bu htmlyi bir diziye aktar ve stringe çevir

  let menuHtml = menuItems.map((item) => {
    let newPrice = item.price * 15;
    newPrice = newPrice.toFixed(2);
    return `
  <a id="card" href="" class="d-flex gap-3 flex-column flex-md-row text-decoration-none text-dark"
>
  <img class="rounded shadow" src=${item.img} alt="" />

  <div>
    <div class="d-flex justify-content-between">
      <h3>${item.title}</h3>
      <p class="text-success"> ${newPrice}₺</p>
    </div>
    <p class="lead">
      ${item.desc}
    </p>
  </div>
</a>
  `;
  });
  // diziyi strginge çevirme

  menuHtml = menuHtml.join("");
  // oluşturulan htmlyi ekrana basma

  menuArea.innerHTML = menuHtml;
}

// ! Filtreleme
// tıklanılan butona göre ekrana o butonun categorisine göre üünleri listleler
function searchCategory(e) {
  const category = e.target.dataset.category;
  // tüm dizi elemanlarından yalnızca kategori değeri butonun kategori değeriyle eşleşenleri getir
  const filteredMenu = menu.filter((item) => item.category === category);
  if (category === "all") {
    renderMenuItems(menu);
  } else {
    renderMenuItems(filteredMenu);
  }
  // butonları güncelle

  renderButtons(category);
}

// !ekrana butonları basacak fonksiyon

function renderButtons(active) {
  buttonsArea.innerHTML = " ";
  console.log(active);
  // yeni butonlar oluşturma

  buttonsData.forEach((btn) => {
    // html butonu oluşturma
    const buttonELe = document.createElement("button");
    // butona gerekli classları verme
    buttonELe.className = "btn btn-outline-dark filter-btn";
    // içerisindeki yazıyı değiştirme
    buttonELe.innerText = btn.text;
    // bton hangi kategoriye ait onun bilgisini ekleme
    buttonELe.dataset.category = btn.value;
    // eğer active kategoriyle buton eşleşirse ona farklı classs ver

    if (btn.value === active) {
      console.log("active buton ");
    }

    // htmlye gönderme
    buttonsArea.appendChild(buttonELe);
  });
}
