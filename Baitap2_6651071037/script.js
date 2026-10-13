document.addEventListener("DOMContentLoaded", () => {
  const cart = new Map();
  const cartItems = document.querySelector("#cartItems");
  const emptyCart = document.querySelector("#emptyCart");
  const cartCount = document.querySelector("#cartCount");
  const cartSubtotal = document.querySelector("#cartSubtotal");
  const cartTotal = document.querySelector("#cartTotal");
  const checkoutButton = document.querySelector("#checkoutButton");
  const toast = document.querySelector("#toast");
  let toastTimer;

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0
    }).format(price);

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2300);
  }

  function renderCart() {
    cartItems.querySelectorAll(".cart-item").forEach((item) => item.remove());
    const entries = [...cart.values()];
    const totalQuantity = entries.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = entries.reduce((sum, item) => sum + item.price * item.quantity, 0);

    emptyCart.hidden = entries.length > 0;
    cartCount.textContent = String(totalQuantity);
    cartSubtotal.textContent = formatPrice(totalPrice);
    cartTotal.textContent = formatPrice(totalPrice);
    checkoutButton.disabled = entries.length === 0;

    entries.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";

      const details = document.createElement("div");
      const name = document.createElement("p");
      name.className = "text-sm font-semibold text-ink";
      name.textContent = item.name;
      const price = document.createElement("p");
      price.className = "mt-1 text-xs text-[#85897e]";
      price.textContent = formatPrice(item.price);

      const quantityControls = document.createElement("div");
      quantityControls.className = "quantity-control";
      const decrease = document.createElement("button");
      decrease.type = "button";
      decrease.dataset.action = "decrease";
      decrease.dataset.id = item.id;
      decrease.setAttribute("aria-label", `Giảm số lượng ${item.name}`);
      decrease.textContent = "−";
      const quantity = document.createElement("span");
      quantity.textContent = String(item.quantity);
      const increase = document.createElement("button");
      increase.type = "button";
      increase.dataset.action = "increase";
      increase.dataset.id = item.id;
      increase.setAttribute("aria-label", `Tăng số lượng ${item.name}`);
      increase.textContent = "+";
      quantityControls.append(decrease, quantity, increase);

      const lineTotal = document.createElement("span");
      lineTotal.className = "pt-0.5 text-sm font-bold text-leaf";
      lineTotal.textContent = formatPrice(item.price * item.quantity);

      details.append(name, price, quantityControls);
      row.append(details, lineTotal);
      cartItems.append(row);
    });
  }

  document.querySelector("#products").addEventListener("click", (event) => {
    const addButton = event.target.closest(".add-button");
    if (addButton) {
      const product = addButton.closest(".product-card");
      const { id, name, price } = product.dataset;
      const item = cart.get(id);

      if (item) {
        item.quantity += 1;
      } else {
        cart.set(id, { id, name, price: Number(price), quantity: 1 });
      }

      renderCart();
      addButton.classList.add("added");
      window.setTimeout(() => addButton.classList.remove("added"), 450);
      showToast(`Đã thêm ${name} vào giỏ bánh`);
      return;
    }

    const favoriteButton = event.target.closest(".favorite-button");
    if (favoriteButton) {
      favoriteButton.classList.toggle("is-favorite");
      favoriteButton.textContent = favoriteButton.classList.contains("is-favorite") ? "♥" : "♡";
      favoriteButton.setAttribute(
        "aria-pressed",
        String(favoriteButton.classList.contains("is-favorite"))
      );
    }
  });

  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const item = cart.get(button.dataset.id);
    if (!item) return;

    if (button.dataset.action === "increase") {
      item.quantity += 1;
    } else if (button.dataset.action === "decrease") {
      item.quantity -= 1;
      if (item.quantity <= 0) cart.delete(item.id);
    }
    renderCart();
  });

  document.querySelectorAll(".category-button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".category-button").forEach((categoryButton) => {
        const selected = categoryButton === button;
        categoryButton.classList.toggle("active", selected);
        categoryButton.setAttribute("aria-pressed", String(selected));
      });

      document.querySelectorAll(".product-card").forEach((product) => {
        product.classList.toggle(
          "is-filtered",
          filter !== "all" && product.dataset.category !== filter
        );
      });
    });
  });

  const menuToggle = document.querySelector("#menuToggle");
  const mobileMenu = document.querySelector("#mobileMenu");
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Mở menu" : "Đóng menu");
    menuToggle.textContent = isExpanded ? "☰" : "×";
    mobileMenu.classList.toggle("hidden", isExpanded);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Mở menu");
      menuToggle.textContent = "☰";
      mobileMenu.classList.add("hidden");
    });
  });

  checkoutButton.addEventListener("click", () => {
    if (cart.size > 0) {
      showToast("Cảm ơn bạn! Bếp Mơ sẽ sớm liên hệ xác nhận đơn.");
    }
  });

  renderCart();
});
