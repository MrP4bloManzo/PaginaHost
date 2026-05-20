'use strict';

/* =========================================================
   FASTSERVICE CAMPUS
   ULTRA PREMIUM NEXT GEN ENGINE
   FULL RESTRUCTURED APP
========================================================= */

window.FastService =
  window.FastService || {};

const App = window.FastService;

/* =========================================================
   HELPERS
========================================================= */

App.$ = (
  selector,
  scope = document
) => scope.querySelector(selector);

App.$$ = (
  selector,
  scope = document
) => [...scope.querySelectorAll(selector)];

App.formatPrice = value => {

  return new Intl.NumberFormat(
    'es-MX',
    {
      style: 'currency',
      currency: 'MXN'
    }
  ).format(Number(value || 0));

};

App.createElement = (
  tag,
  className = ''
) => {

  const element =
    document.createElement(tag);

  if (className) {

    element.className =
      className;

  }

  return element;

};

App.debounce = (
  callback,
  delay = 300
) => {

  let timeout;

  return (...args) => {

    clearTimeout(timeout);

    timeout = setTimeout(() => {

      callback(...args);

    }, delay);

  };

};

/* =========================================================
   STORAGE
========================================================= */

App.Storage = {

  key:
    'fastservice-campus-v3',

  get() {

    try {

      return JSON.parse(

        localStorage.getItem(
          this.key
        )

      ) || {};

    } catch {

      return {};

    }

  },

  save(data) {

    localStorage.setItem(
      this.key,
      JSON.stringify(data)
    );

  }

};

/* =========================================================
   STATE
========================================================= */

App.State = {

  logged: false,

  theme: 'light',

  currentView: 'home',

  currentStore: null,

  favorites: [],

  cart: [],

  orders: [],

  paymentType: 'cash',

  payment: {

    selected:
      'visa_4242',

    cards: [

      {
        id: 'visa_4242',
        type: 'visa',
        holder:
          'Pablo Manzo',
        number:
          '4242',
        expiry:
          '12/29'
      }

    ]

  }

};

/* =========================================================
   DATA
========================================================= */

App.Data = {

  stores: [

    {
      id: 'ccc',
      name:
        'CCC Cocina con Conciencia',

      products: [

        {
          id: 'bowl_pollo',
          name:
            'Bowl de Pollo',

          price: 125,

          image:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'bowl_atun',
          name:
            'Bowl de Atún',

          price: 145,

          image:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'agua_dia',
          name:
            'Agua del día',

          price: 35,

          image:
            'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'baguette_pollo',
          name:
            'Baguette de pollo',

          price: 89,

          image:
            'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'ensalada_cesar',
          name:
            'Ensalada César',

          price: 110,

          image:
            'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1200&auto=format&fit=crop'
        }

      ]

    },

    {
      id: 'tiendita',
      name: 'Tiendita',

      products: [

        {
          id: 'papitas',
          name: 'Papitas',
          price: 22,
          image:
            'https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'refrescos',
          name: 'Refrescos',
          price: 28,
          image:
            'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'fruta_picada',
          name: 'Fruta picada',
          price: 45,
          image:
            'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'comida_rapida',
          name: 'Comida rápida',
          price: 75,
          image:
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'galletas',
          name: 'Galletas',
          price: 18,
          image:
            'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'tacos_tux',
          name: 'Tacos Tuxpeños',
          price: 95,
          image:
            'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1200&auto=format&fit=crop'
        }

      ]

    },

    {
      id: 'papeleria',
      name: 'Papelería',

      products: [

        {
          id: 'copias',
          name: 'Copias',
          price: 1.5,
          image:
            'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'plumas',
          name: 'Plumas',
          price: 12,
          image:
            'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'carpetas',
          name: 'Carpetas',
          price: 38,
          image:
            'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'lapiz',
          name: 'Lápiz',
          price: 8,
          image:
            'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'pines',
          name: 'Pines',
          price: 4,
          image:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'clips',
          name: 'Clips',
          price: 6,
          image:
            'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop'
        }

      ]

    },

    {
      id: 'cafeteria',
      name: 'Cafetería',

      products: [

        {
          id: 'espresso',
          name: 'Café expreso',
          price: 42,
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'frapuccino',
          name: 'Frapuchino',
          price: 78,
          image:
            'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'cafe_helado',
          name: 'Café helado',
          price: 58,
          image:
            'https://images.unsplash.com/photo-1517701550927-30cf4ba1fddf?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'pastel',
          name:
            'Pastel chocolate',

          price: 68,

          image:
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'pay',
          name:
            'Pay del día',

          price: 55,

          image:
            'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'moka',
          name:
            'Moka blanco',

          price: 74,

          image:
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1200&auto=format&fit=crop'
        }

      ]

    },

    {
      id: 'servicios',
      name:
        'Cafetería de Servicios',

      products: [

        {
          id: 'comida_dia',
          name:
            'Comida del día',

          price: 95,

          image:
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'hotcakes',
          name:
            'Hot-Cakes',

          price: 80,

          image:
            'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'jugos',
          name:
            'Jugos',

          price: 38,

          image:
            'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'enchiladas',
          name:
            'Enchiladas',

          price: 92,

          image:
            'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'tortas',
          name:
            'Tortas',

          price: 65,

          image:
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'tacos',
          name:
            'Tacos',

          price: 28,

          image:
            'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1200&auto=format&fit=crop'
        },

        {
          id: 'burritos',
          name:
            'Burritos',

          price: 85,

          image:
            'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1200&auto=format&fit=crop'
        }

      ]

    }

  ]

};

/* =========================================================
   LOAD STORAGE
========================================================= */

App.loadStorage = () => {

  const saved =
    App.Storage.get();

  App.State = {

    ...App.State,
    ...saved

  };

};

App.saveStorage = () => {

  App.Storage.save({

    logged:
      App.State.logged,

    theme:
      App.State.theme,

    favorites:
      App.State.favorites,

    cart:
      App.State.cart,

    orders:
      App.State.orders,

    payment:
      App.State.payment

  });

};

/* =========================================================
   UI
========================================================= */

App.UI = {

  auth:
    App.$('#authScreen'),

  toast:
    App.$('#toast'),

  push:
    App.$('#pushNotification'),

  pushText:
    App.$('#pushText'),

  drawer:
    App.$('#cartDrawer'),

  backdrop:
    App.$('#globalBackdrop'),

  cartItems:
    App.$('#drawerCartItems'),

  drawerTotal:
    App.$('#drawerTotal'),

  cartFab:
    App.$('#cartFab'),

  fabCount:
    App.$('#fabCount'),

  paymentModal:
    App.$('#paymentModal')

};

/* =========================================================
   TOAST
========================================================= */

App.Toast = {

  timeout: null,

  show(message) {

    clearTimeout(
      this.timeout
    );

    App.UI.toast.textContent =
      message;

    App.UI.toast.classList.add(
      'show'
    );

    this.timeout =
      setTimeout(() => {

        App.UI.toast.classList.remove(
          'show'
        );

      }, 2600);

  }

};

/* =========================================================
   PUSH
========================================================= */

App.Push = {

  timeout: null,

  show(message) {

    clearTimeout(
      this.timeout
    );

    App.UI.pushText.textContent =
      message;

    App.UI.push.classList.add(
      'show'
    );

    this.timeout =
      setTimeout(() => {

        App.UI.push.classList.remove(
          'show'
        );

      }, 3500);

  }

};

/* =========================================================
   THEME
========================================================= */

App.Theme = {

  init() {

    document.documentElement
      .setAttribute(
        'data-theme',
        App.State.theme
      );

  },

  toggle() {

    App.State.theme =

      App.State.theme === 'dark'
        ? 'light'
        : 'dark';

    document.documentElement
      .setAttribute(
        'data-theme',
        App.State.theme
      );

    App.saveStorage();

  }

};

/* =========================================================
   NAVIGATION
========================================================= */

App.Navigation = {

  go(view) {

    

    App.State.currentView =
      view;

    App.$$('.view')
      .forEach(viewElement => {

        viewElement.classList.remove(
          'active'
        );

      });

    App.$(`#view-${view}`)
      ?.classList.add(
        'active'
      );

    App.$$('.nav-btn')
      .forEach(button => {

        button.classList.remove(
          'active'
        );

      });

    App.$(
      `[data-nav="${view}"]`
    )?.classList.add(
      'active'
    );

    App.Cart.updateFab();
  }

  

};

/* =========================================================
   AUTH
========================================================= */

App.Auth = {

  login(user, pass) {

    if (

      user.trim()
        .toLowerCase() ===
      'pablo'

      &&

      pass.trim() ===
      '1234'

    ) {

      App.State.logged =
        true;

      App.saveStorage();

      App.UI.auth.style.display =
        'none';

      App.Toast.show(
        'Bienvenido 🚀'
      );

      return;

    }

    App.Toast.show(
      'Credenciales inválidas ❌'
    );

  },

  logout() {

    App.State.logged =
      false;

    App.saveStorage();

    App.UI.auth.style.display =
      'flex';

  },

  init() {

    if (
      App.State.logged
    ) {

      App.UI.auth.style.display =
        'none';

    }

  }

};

/* =========================================================
   STORE VIEW
========================================================= */

App.Store = {

  open(storeId) {

    const store =
      App.Data.stores.find(
        item =>
          item.id === storeId
      );

    if (!store)
      return;

    App.State.currentStore =
      store;

    App.$('#storeTitle')
      .textContent =
      store.name;

    this.renderProducts(
      store.products
    );

    App.Navigation.go(
      'store'
    );

  },

  renderProducts(products) {

    const container =
      App.$('#storeProducts');

    container.innerHTML = '';

    products.forEach(product => {

      const card =
        App.createElement(
          'article',
          'product-card fade-up'
        );

      card.innerHTML = `

        <div class="product-card__image">

          <img
            loading="lazy"
            src="${product.image}"
            alt="${product.name}"
          />

        </div>

        <div class="product-card__content">

          <h3>
            ${product.name}
          </h3>

          <p>
            Producto premium disponible para pickup.
          </p>

          <div class="product-card__footer">

            <strong>
              ${App.formatPrice(
                product.price
              )}
            </strong>

            <button
              class="add-btn"
              data-product="${product.id}"
            >
              +
            </button>

          </div>

        </div>

      `;

      container.appendChild(
        card
      );

    });

  }

};

/* =========================================================
   CART
========================================================= */

App.Cart = {

  add(productId) {

    const product =
      App.getProductById(
        productId
      );

    if (!product)
      return;

    const existing =
      App.State.cart.find(
        item =>
          item.id === product.id
      );

    if (existing) {

      existing.qty++;

    } else {

      App.State.cart.push({

        ...product,
        qty: 1

      });

    }

    App.saveStorage();

    this.render();

    this.updateFab();

    App.Toast.show(
      `${product.name} agregado 🛒`
    );

  },

  increase(productId) {

    const item =
      App.State.cart.find(
        product =>
          product.id === productId
      );

    if (!item)
      return;

    item.qty++;

    App.saveStorage();

    this.render();

    this.updateFab();

  },

  decrease(productId) {

    const item =
      App.State.cart.find(
        product =>
          product.id === productId
      );

    if (!item)
      return;

    if (item.qty > 1) {

      item.qty--;

    } else {

      App.State.cart =
        App.State.cart.filter(
          product =>
            product.id !== productId
        );

    }

    App.saveStorage();

    this.render();

    this.updateFab();

  },

  total() {

    return App.State.cart.reduce(

      (
        total,
        item
      ) => {

        return total +
          (
            item.price *
            item.qty
          );

      },

      0

    );

  },

  totalItems() {

    return App.State.cart.reduce(

      (
        total,
        item
      ) => {

        return total +
          item.qty;

      },

      0

    );

  },

  render() {

    const container =
      App.UI.cartItems;

    container.innerHTML = '';

    if (
      !App.State.cart.length
    ) {

      container.innerHTML = `

        <div class="empty-state">

          <div class="empty-state__emoji">
            🛒
          </div>

          <h3>
            Tu carrito está vacío
          </h3>

          <p>
            Agrega productos para comenzar.
          </p>

        </div>

      `;

      App.UI.drawerTotal.textContent =
        '$0';

      return;

    }

    App.State.cart.forEach(item => {

      const card =
        App.createElement(
          'article',
          'product-card'
        );

      card.innerHTML = `

        <div class="product-card__image">

          <img
            src="${item.image}"
            alt="${item.name}"
          />

        </div>

        <div class="product-card__content">

          <h3>
            ${item.name}
          </h3>

          <p>
            ${App.formatPrice(
              item.price
            )}
          </p>

          <div class="product-card__footer">

            <div class="quantity-box">

              <button
                class="quantity-btn"
                data-decrease="${item.id}"
              >
                −
              </button>

              <span class="quantity-value">
                ${item.qty}
              </span>

              <button
                class="quantity-btn"
                data-increase="${item.id}"
              >
                +
              </button>

            </div>

            <strong>

              ${App.formatPrice(
                item.price * item.qty
              )}

            </strong>

          </div>

        </div>

      `;

      container.appendChild(
        card
      );

    });

    App.UI.drawerTotal.textContent =

      App.formatPrice(
        this.total()
      );

  },

  updateFab() {

  const total =
    this.totalItems();

  const isLogged =
    App.State.logged;

  const currentView =
    App.State.currentView;

  const authVisible =
    App.UI.auth.style.display !== 'none';

  const shouldShow =

    isLogged &&

    !authVisible &&

    total > 0 &&

    (
      currentView === 'home'
      ||
      currentView === 'store'
    );

  App.UI.cartFab
    .classList.toggle(
      'visible',
      shouldShow
    );

  App.UI.fabCount.textContent =
    total;

}

};

/* =========================================================
   DRAWER
========================================================= */

App.Drawer = {

  open() {

    App.UI.drawer
      .classList.add(
        'active'
      );

    App.UI.backdrop
      .classList.add(
        'active'
      );

  },

  close() {

    App.UI.drawer
      .classList.remove(
        'active'
      );

    App.UI.backdrop
      .classList.remove(
        'active'
      );

  }

};

/* =========================================================
   PAYMENT
========================================================= */

App.Payment = {

  open() {

    if (
      !App.State.cart.length
    ) {

      App.Toast.show(
        'Tu carrito está vacío 😕'
      );

      return;

    }

    App.UI.paymentModal
      .classList.add(
        'active'
      );

    App.UI.backdrop
      .classList.add(
        'active'
      );

    this.renderCards();

  },

  close() {

    App.UI.paymentModal
      .classList.remove(
        'active'
      );

    App.UI.backdrop
      .classList.remove(
        'active'
      );

  },

  renderCards() {

    const container =
      App.$('#paymentMethods');

    container.innerHTML = '';

    App.State.payment.cards
      .forEach(card => {

        const button =
          App.createElement(
            'button',
            'payment-method'
          );

        button.dataset.card =
          card.id;

        button.innerHTML = `

          <div>

            <strong>
              💳 •••• ${card.number}
            </strong>

            <p>
              ${card.holder}
            </p>

          </div>

          <span>

            ${
              App.State.payment.selected
                === card.id
                  ? '✓'
                  : '○'
            }

          </span>

        `;

        container.appendChild(
          button
        );

      });

  },

  addCard() {

    const holder =
      App.$('#cardHolder')
        .value
        .trim();

    const number =
      App.$('#cardNumber')
        .value
        .replace(/\s/g, '');

    const expiry =
      App.$('#cardExpiry')
        .value
        .trim();

    const cvv =
      App.$('#cardCVV')
        .value
        .trim();

    if (

      !holder
      ||
      number.length < 16
      ||
      expiry.length < 5
      ||
      cvv.length < 3

    ) {

      App.Toast.show(
        'Datos inválidos ❌'
      );

      return;

    }

    const card = {

      id:
        `card_${Date.now()}`,

      holder,

      number:
        number.slice(-4),

      expiry

    };

    App.State.payment.cards.push(
      card
    );

    App.State.payment.selected =
      card.id;

    App.saveStorage();

    this.renderCards();

    App.Toast.show(
      'Tarjeta agregada 💳'
    );

    App.$('#cardHolder').value =
      '';

    App.$('#cardNumber').value =
      '';

    App.$('#cardExpiry').value =
      '';

    App.$('#cardCVV').value =
      '';

  },

  confirm() {

    const order = {

      id:
        Math.floor(
          Math.random() * 9999
        ),

      total:
        App.Cart.total(),

      createdAt:
        new Date()
          .toLocaleString(
            'es-MX'
          )

    };

    App.State.orders.unshift(
      order
    );

    App.saveStorage();

    App.Cart.clear?.();

    App.State.cart = [];

    App.Cart.render();

    App.Cart.updateFab();

    this.close();

    App.Drawer.close();

    App.Orders.render();

    App.Navigation.go(
      'orders'
    );

    App.Toast.show(
      'Pedido confirmado ✅'
    );

  }

};

/* =========================================================
   ORDERS
========================================================= */

App.Orders = {

  render() {

    const container =
      App.$('#ordersHistory');

    if (!container)
      return;

    container.innerHTML = '';

    App.State.orders.forEach(order => {

      const card =
        App.createElement(
          'article',
          'profile-item'
        );

      card.innerHTML = `

        <div class="profile-item__left">

          <div class="profile-item__icon">
            🧾
          </div>

          <div>

            <strong>
              Pedido #${order.id}
            </strong>

            <p>
              ${order.createdAt}
            </p>

          </div>

        </div>

        <strong>

          ${App.formatPrice(
            order.total
          )}

        </strong>

      `;

      container.appendChild(
        card
      );

    });

  }

};

/* =========================================================
   HELPERS
========================================================= */

App.getProductById =
  productId => {

    for (
      const store
      of App.Data.stores
    ) {

      const product =
        store.products.find(
          item =>
            item.id === productId
        );

      if (product)
        return product;

    }

    return null;

  };

/* =========================================================
   EVENTS
========================================================= */

App.Events = {

  init() {

    /* LOGIN */

    App.$('#loginForm')
      ?.addEventListener(
        'submit',
        event => {

          event.preventDefault();

          App.Auth.login(

            App.$('#loginUser')
              .value,

            App.$('#loginPass')
              .value

          );

        }
      );

    /* THEME */

    App.$('#themeToggle')
      ?.addEventListener(
        'click',
        () => {

          App.Theme.toggle();

        }
      );

    /* NAV */

    App.$$('.nav-btn')
      .forEach(button => {

        button.addEventListener(
          'click',
          () => {

            App.Navigation.go(
              button.dataset.nav
            );

          }
        );

      });

    /* OPEN STORE */

    document.addEventListener(
      'click',
      event => {

        const button =
          event.target.closest(
            '[data-open-store]'
          );

        if (!button)
          return;

        App.Store.open(
          button.dataset.openStore
        );

      }
    );

    /* BACK */

    App.$('#backHomeBtn')
      ?.addEventListener(
        'click',
        () => {

          App.Navigation.go(
            'home'
          );

        }
      );

    /* ADD CART */

    document.addEventListener(
      'click',
      event => {

        const button =
          event.target.closest(
            '[data-product]'
          );

        if (!button)
          return;

        App.Cart.add(
          button.dataset.product
        );

      }
    );

    /* CART */

    App.$('#cartFab')
      ?.addEventListener(
        'click',
        () => {

          App.Drawer.open();

        }
      );

    App.$('#closeDrawer')
      ?.addEventListener(
        'click',
        () => {

          App.Drawer.close();

        }
      );

    /* QUANTITY */

    document.addEventListener(
      'click',
      event => {

        const increase =
          event.target.closest(
            '[data-increase]'
          );

        const decrease =
          event.target.closest(
            '[data-decrease]'
          );

        if (increase) {

          App.Cart.increase(
            increase.dataset.increase
          );

        }

        if (decrease) {

          App.Cart.decrease(
            decrease.dataset.decrease
          );

        }

      }
    );

    /* PAYMENT */

    App.$('#checkoutBtn')
      ?.addEventListener(
        'click',
        () => {

          App.Payment.open();

        }
      );

    App.$('#closePaymentModal')
      ?.addEventListener(
        'click',
        () => {

          App.Payment.close();

        }
      );

    App.$('#saveCardBtn')
      ?.addEventListener(
        'click',
        () => {

          App.Payment.addCard();

        }
      );

    App.$('#confirmPayment')
      ?.addEventListener(
        'click',
        () => {

          App.Payment.confirm();

        }
      );

    /* PAYMENT TYPE */

    App.$$('.payment-option')
      .forEach(option => {

        option.addEventListener(
          'click',
          () => {

            App.$$('.payment-option')
              .forEach(item => {

                item.classList.remove(
                  'active'
                );

              });

            option.classList.add(
              'active'
            );

            const type =
              option.dataset.paymentType;

            App.State.paymentType =
              type;

            App.$('#cashPaymentBox')
              .classList.toggle(
                'hidden',
                type !== 'cash'
              );

            App.$('#cardPaymentBox')
              .classList.toggle(
                'hidden',
                type !== 'card'
              );

          }
        );

      });

    /* CHANGE */

    App.$('#cashAmount')
      ?.addEventListener(
        'input',
        event => {

          const value =
            Number(
              event.target.value
            );

          const total =
            App.Cart.total();

          const change =
            value - total;

          App.$('#changeAmount')
            .textContent =

            change > 0
              ? App.formatPrice(
                  change
                )
              : '$0';

        }
      );

    /* LOGOUT */

    App.$('#logoutBtn')
      ?.addEventListener(
        'click',
        () => {

          App.Auth.logout();

        }
      );

    /* PASSWORD */

    App.$('#togglePassword')
      ?.addEventListener(
        'click',
        () => {

          const input =
            App.$('#loginPass');

          input.type =

            input.type === 'password'
              ? 'text'
              : 'password';

        }
      );

  }

};

/* =========================================================
   CLOCK
========================================================= */

App.Clock = {

  init() {

    setInterval(() => {

      const time =
        new Date()
          .toLocaleTimeString(
            'es-MX',
            {
              hour: '2-digit',
              minute: '2-digit'
            }
          );

      App.$$('.status-time')
        .forEach(element => {

          element.textContent =
            time;

        });

    }, 1000);

  }

};

/* =========================================================
   RIPPLE
========================================================= */

App.Ripple = {

  init() {

    document.addEventListener(
      'click',
      event => {

        const button =
          event.target.closest(
            '[data-ripple]'
          );

        if (!button)
          return;

        const ripple =
          document.createElement(
            'span'
          );

        const rect =
          button.getBoundingClientRect();

        const size =
          Math.max(
            rect.width,
            rect.height
          );

        ripple.className =
          'ripple';

        ripple.style.width =
          ripple.style.height =
          `${size}px`;

        ripple.style.left =
          `${event.clientX - rect.left - size / 2}px`;

        ripple.style.top =
          `${event.clientY - rect.top - size / 2}px`;

        button.appendChild(
          ripple
        );

        ripple.addEventListener(
          'animationend',
          () => ripple.remove()
        );

      }
    );

  }

};

/* =========================================================
   INIT
========================================================= */

App.init = () => {

  App.loadStorage();

  App.Theme.init();

  App.Auth.init();

  App.Events.init();

  App.Cart.render();

  App.Cart.updateFab();

  App.Orders.render();

  App.Clock.init();

  App.Ripple.init();

  setTimeout(() => {

    App.$('#splashScreen')
      ?.remove();

  }, 1800);

};

document.addEventListener(
  'DOMContentLoaded',
  App.init
);

document.body.classList.add(
  'modal-open'
);
document.body.classList.remove(
  'modal-open'
);