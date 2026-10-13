const { createApp } = Vue;

createApp({
  data() {
    return {
      mobileMenuOpen: false,
      searchQuery: "",
      activeCategory: "all",
      favorites: [],
      toastMessage: "",
      toastTimeout: null,
      freeShippingThreshold: 499000,
      shippingBaseFee: 25000,
      categories: [
        { id: "all", name: "Tất cả" },
        { id: "charger", name: "Củ sạc" },
        { id: "cable", name: "Cáp sạc" },
        { id: "audio", name: "Tai nghe" },
        { id: "power", name: "Pin dự phòng" },
        { id: "case", name: "Ốp lưng" }
      ],
      products: [
        {
          id: 1,
          name: "Sạc nhanh Mini 20W",
          category: "charger",
          categoryName: "Củ sạc",
          price: 189000,
          oldPrice: 239000,
          rating: "4.9",
          badge: "Bán chạy",
          description: "Nhỏ gọn · Sạc nhanh chuẩn PD",
          image: "../images/charger.jpg",
          tone: "blue"
        },
        {
          id: 2,
          name: "Cáp Type-C Flex 1m",
          category: "cable",
          categoryName: "Cáp sạc",
          price: 89000,
          oldPrice: null,
          rating: "4.8",
          badge: null,
          description: "Bền bỉ · Sạc và truyền dữ liệu",
          image: "../images/cable.jpg",
          tone: "pink"
        },
        {
          id: 3,
          name: "Tai nghe Buds Air",
          category: "audio",
          categoryName: "Tai nghe",
          price: 459000,
          oldPrice: 529000,
          rating: "5.0",
          badge: "Giảm giá",
          description: "Bluetooth 5.3 · Hộp sạc nhỏ gọn",
          image: "../images/earbuds.jpg",
          tone: "lilac"
        },
        {
          id: 4,
          name: "Ốp lưng Flip Cover",
          category: "case",
          categoryName: "Ốp lưng",
          price: 129000,
          oldPrice: null,
          rating: "4.7",
          badge: "Mới",
          description: "Ốp dạng gập · Bảo vệ mặt trước sau",
          image: "../images/case.jpg",
          tone: "mint"
        },
        {
          id: 5,
          name: "Pin dự phòng Pocket 10K",
          category: "power",
          categoryName: "Pin dự phòng",
          price: 349000,
          oldPrice: 399000,
          rating: "4.9",
          badge: "Giảm giá",
          description: "10.000 mAh · Sạc nhanh 22.5W",
          image: "../images/power-bank.jpg",
          tone: "blue"
        },
        {
          id: 6,
          name: "Cáp sạc bọc dù 2m",
          category: "cable",
          categoryName: "Cáp sạc",
          price: 119000,
          oldPrice: null,
          rating: "4.8",
          badge: null,
          description: "Dài 2m · Bọc dù chống rối",
          image: "../images/braided-cable.jpg",
          tone: "pink"
        },
        {
          id: 7,
          name: "Củ sạc GaN Mini 30W",
          category: "charger",
          categoryName: "Củ sạc",
          price: 329000,
          oldPrice: null,
          rating: "4.9",
          badge: "Nhỏ mà mạnh",
          description: "GaN thế hệ mới · 2 cổng sạc",
          image: "../images/gan-charger.jpg",
          tone: "mint"
        },
        {
          id: 8,
          name: "Tai nghe chụp tai Cloud",
          category: "audio",
          categoryName: "Tai nghe",
          price: 599000,
          oldPrice: 699000,
          rating: "4.9",
          badge: "Yêu thích",
          description: "Êm tai · Âm thanh sống động",
          image: "../images/headphones.jpg",
          tone: "lilac"
        }
      ],
      cart: []
    };
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLocaleLowerCase("vi");

      return this.products.filter((product) => {
        const matchesCategory =
          this.activeCategory === "all" || product.category === this.activeCategory;
        const matchesSearch =
          !query ||
          product.name.toLocaleLowerCase("vi").includes(query) ||
          product.categoryName.toLocaleLowerCase("vi").includes(query) ||
          product.description.toLocaleLowerCase("vi").includes(query);

        return matchesCategory && matchesSearch;
      });
    },
    cartCount() {
      return this.cart.reduce((count, item) => count + item.quantity, 0);
    },
    cartSubtotal() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    shippingFee() {
      if (this.cartCount === 0 || this.cartSubtotal >= this.freeShippingThreshold) {
        return 0;
      }

      return this.shippingBaseFee;
    },
    grandTotal() {
      return this.cartSubtotal + this.shippingFee;
    },
    shippingProgress() {
      return Math.min(
        100,
        Math.round((this.cartSubtotal / this.freeShippingThreshold) * 100)
      );
    }
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0
      }).format(value);
    },
    categoryCount(categoryId) {
      if (categoryId === "all") return this.products.length;
      return this.products.filter((product) => product.category === categoryId).length;
    },
    addToCart(product) {
      const existing = this.cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }

      this.showToast(`Đã thêm ${product.name} vào giỏ hàng`);
    },
    removeFromCart(productId) {
      const removedProduct = this.cart.find((item) => item.id === productId);
      this.cart = this.cart.filter((item) => item.id !== productId);

      if (removedProduct) {
        this.showToast(`Đã xóa ${removedProduct.name} khỏi giỏ`);
      }
    },
    increaseQuantity(productId) {
      const item = this.cart.find((product) => product.id === productId);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(productId) {
      const item = this.cart.find((product) => product.id === productId);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart() {
      this.cart = [];
      this.showToast("Đã xóa toàn bộ giỏ hàng");
    },
    toggleFavorite(productId) {
      if (this.favorites.includes(productId)) {
        this.favorites = this.favorites.filter((id) => id !== productId);
      } else {
        this.favorites.push(productId);
      }
    },
    showToast(message) {
      this.toastMessage = message;
      window.clearTimeout(this.toastTimeout);
      this.toastTimeout = window.setTimeout(() => {
        this.toastMessage = "";
      }, 2400);
    },
    checkout() {
      if (this.cart.length === 0) return;

      this.showToast(`Đơn hàng ${this.formatPrice(this.grandTotal)} đã sẵn sàng!`);
    }
  }
}).mount("#app");
