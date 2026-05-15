'use strict';

/* =========================================================
   FASTSERVICE CAMPUS
   NEXT GEN FULL PRO ENGINE
   RESTRUCTURED + OPTIMIZED
========================================================= */

/* =========================================================
   GLOBAL APP
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
   SAFE STORAGE
========================================================= */

App.Storage = {

  key:
    'fastservice_nextgen_v2',

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

    try {

      localStorage.setItem(
        this.key,
        JSON.stringify(data)
      );

    } catch (error) {

      console.error(
        'Storage Error:',
        error
      );

    }

  }

};

/* =========================================================
   APP STATE
========================================================= */

App.State = {

  logged: false,

  theme: 'light',

  currentView: 'home',

  favorites: [],

  cart: [],

  orders: [],

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

  const persist = {

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

  };

  App.Storage.save(
    persist
  );

};

/* =========================================================
   UI CACHE
========================================================= */

App.UI = {

  splash:
    App.$('#splashScreen'),

  toast:
    App.$('#toast'),

  auth:
    App.$('#authScreen'),

  push:
    App.$('#pushNotification'),

  pushText:
    App.$('#pushText'),

  backdrop:
    App.$('#globalBackdrop'),

  drawer:
    App.$('#cartDrawer'),

  drawerItems:
    App.$('#drawerCartItems'),

  drawerTotal:
    App.$('#drawerTotal'),

  paymentModal:
    App.$('#paymentModal'),

  paymentMethods:
    App.$('#paymentMethods'),

  cartFab:
    App.$('#cartFab'),

  fabCount:
    App.$('#fabCount')

};

/* =========================================================
   TOAST
========================================================= */

App.Toast = {

  timeout: null,

  show(message) {

    const toast =
      App.UI.toast;

    if (!toast) return;

    clearTimeout(
      this.timeout
    );

    toast.textContent =
      message;

    toast.classList.add(
      'show'
    );

    this.timeout =
      setTimeout(() => {

        toast.classList.remove(
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

    if (
      !App.UI.push ||
      !App.UI.pushText
    ) return;

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
   SPLASH
========================================================= */

App.Splash = {

  init() {

    if (!App.UI.splash)
      return;

    setTimeout(() => {

      App.UI.splash.style.opacity =
        '0';

      App.UI.splash.style.pointerEvents =
        'none';

      setTimeout(() => {

        App.UI.splash.remove();

      }, 500);

    }, 1800);

  }

};

/* =========================================================
   CLOCK
========================================================= */

App.Clock = {

  interval: null,

  init() {

    this.update();

    this.interval =
      setInterval(() => {

        this.update();

      }, 1000);

  },

  update() {

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

    this.updateIcon();

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

    this.updateIcon();

    App.saveStorage();

    App.Toast.show(

      App.State.theme === 'dark'
        ? 'Modo oscuro activado 🌙'
        : 'Modo claro activado ☀️'

    );

  },

  updateIcon() {

    const button =
      App.$('#themeToggle');

    if (!button) return;

    button.textContent =

      App.State.theme === 'dark'
        ? '☀️'
        : '🌙';

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

      App.Push.show(
        'Sesión iniciada'
      );

      return;

    }

    navigator.vibrate?.(120);

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

    App.Toast.show(
      'Sesión cerrada 👋'
    );

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
   NAVIGATION
========================================================= */

App.Navigation = {

  go(view) {

    App.State.currentView =
      view;

    App.$$('.view')
      .forEach(section => {

        section.classList.remove(
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

  }

};

/* =========================================================
   RIPPLE EFFECT
========================================================= */

App.Ripple = {

  create(
    element,
    event
  ) {

    const rect =
      element.getBoundingClientRect();

    const ripple =
      App.createElement(
        'span',
        'ripple'
      );

    const size =
      Math.max(
        rect.width,
        rect.height
      );

    ripple.style.width =
      ripple.style.height =
      `${size}px`;

    ripple.style.left =
      `${event.clientX - rect.left - size / 2}px`;

    ripple.style.top =
      `${event.clientY - rect.top - size / 2}px`;

    element.appendChild(
      ripple
    );

    ripple.addEventListener(
      'animationend',
      () => ripple.remove(),
      { once: true }
    );

  }

};

/* =========================================================
   FAVORITES
========================================================= */

App.Favorites = {

  toggle(card) {

    const id =
      card.dataset.id;

    const exists =
      App.State.favorites
        .includes(id);

    if (exists) {

      App.State.favorites =
        App.State.favorites
          .filter(item =>
            item !== id
          );

    } else {

      App.State.favorites
        .push(id);

      App.Toast.show(
        'Agregado a favoritos ❤️'
      );

    }

    App.saveStorage();

    this.render();

  },

  render() {

    App.$$('.restaurant-card')
      .forEach(card => {

        const id =
          card.dataset.id;

        const button =
          card.querySelector(
            '.restaurant-fav'
          );

        if (!button)
          return;

        button.textContent =

          App.State.favorites
            .includes(id)
              ? '♥'
              : '♡';

      });

  }

};

/* =========================================================
   FILTERS
========================================================= */

App.Filters = {

  search: '',
  category: 'all',

  apply() {

    const search =
      this.search
        .toLowerCase();

    App.$$('.restaurant-card')
      .forEach(card => {

        const category =
          card.dataset.category;

        const text =
          card.textContent
            .toLowerCase();

        const visible =

          (
            this.category === 'all'
            ||
            category === this.category
          )

          &&

          text.includes(search);

        card.hidden =
          !visible;

      });

  }

};

/* =========================================================
   CART ENGINE
========================================================= */

App.Cart = {

  add(product) {

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

    navigator.vibrate?.(10);

    App.saveStorage();

    this.render();

    this.updateFab();

    App.Toast.show(
      `${product.name} agregado 🛒`
    );

  },

  decrease(id) {

    const item =
      App.State.cart.find(
        product =>
          product.id === id
      );

    if (!item)
      return;

    if (item.qty > 1) {

      item.qty--;

    } else {

      App.State.cart =
        App.State.cart.filter(
          product =>
            product.id !== id
        );

    }

    App.saveStorage();

    this.render();

    this.updateFab();

  },

  clear() {

    App.State.cart = [];

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

  updateFab() {

    const total =
      this.totalItems();

    App.UI.cartFab
      ?.classList.toggle(
        'visible',
        total > 0
      );

    if (App.UI.fabCount) {

      App.UI.fabCount.textContent =
        total;

    }

  },

  render() {

    if (
      !App.UI.drawerItems ||
      !App.UI.drawerTotal
    ) return;

    if (
      !App.State.cart.length
    ) {

      App.UI.drawerItems.innerHTML = `

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

    App.UI.drawerItems.innerHTML =

      App.State.cart.map(item => `

        <article class="product-card fade-up">

          <div>

            <h3>
              ${item.name}
            </h3>

            <p>
              Cantidad: ${item.qty}
            </p>

            <strong>

              ${App.formatPrice(
                item.price * item.qty
              )}

            </strong>

          </div>

          <button
            class="add-btn"
            data-remove="${item.id}"
          >
            −
          </button>

        </article>

      `).join('');

    App.UI.drawerTotal.textContent =

      App.formatPrice(
        this.total()
      );

  }

};

/* =========================================================
   DRAWER
========================================================= */

App.Drawer = {

  open() {

    App.UI.drawer
      ?.classList.add(
        'active'
      );

    App.UI.backdrop
      ?.classList.add(
        'active'
      );

  },

  close() {

    App.UI.drawer
      ?.classList.remove(
        'active'
      );

    App.UI.backdrop
      ?.classList.remove(
        'active'
      );

  }

};

/* =========================================================
   PAYMENT
========================================================= */

App.Payment = {

  render() {

    if (
      !App.UI.paymentMethods
    ) return;

    App.UI.paymentMethods.innerHTML =

      App.State.payment.cards
        .map(card => `

        <button
          class="payment-method"
          data-payment="${card.id}"
        >

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

        </button>

      `).join('');

  },

  open() {

    if (
      !App.State.cart.length
    ) {

      App.Toast.show(
        'Tu carrito está vacío 😕'
      );

      return;

    }

    this.render();

    App.UI.paymentModal
      ?.classList.add(
        'active'
      );

  },

  close() {

    App.UI.paymentModal
      ?.classList.remove(
        'active'
      );

  },

  async confirm() {

    App.Toast.show(
      'Procesando pago...'
    );

    await new Promise(resolve => {

      setTimeout(
        resolve,
        2000
      );

    });

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

    App.Cart.clear();

    this.close();

    App.Drawer.close();

    App.Orders.render();

    App.Pickup.start();

    App.Navigation.go(
      'orders'
    );

    App.Push.show(
      'Pedido confirmado 🍔'
    );

    App.Toast.show(
      'Pago aprobado ✅'
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

    if (
      !App.State.orders.length
    ) {

      container.innerHTML =
        '';

      return;

    }

    container.innerHTML =

      App.State.orders.map(order => `

        <article class="profile-item fade-up">

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

        </article>

      `).join('');

  }

};

/* =========================================================
   PICKUP ENGINE
========================================================= */

App.Pickup = {

  interval: null,

  start() {

    const countdown =
      App.$('#pickupCountdown');

    const status =
      App.$('#pickupStatus');

    const progress =
      App.$('#pickupProgressBar');

    if (
      !countdown ||
      !status ||
      !progress
    ) return;

    clearInterval(
      this.interval
    );

    let total = 540;

    this.interval =
      setInterval(() => {

        total--;

        const minutes =
          Math.floor(total / 60);

        const seconds =
          total % 60;

        countdown.textContent =

          `${String(minutes)
            .padStart(2, '0')}:${String(seconds)
            .padStart(2, '0')}`;

        const percentage =

          100 -
          (
            total / 540
          ) * 100;

        progress.style.width =
          `${percentage}%`;

        if (percentage > 90) {

          status.textContent =
            'Listo 🚀';

        } else if (
          percentage > 60
        ) {

          status.textContent =
            'Empacando';

        } else if (
          percentage > 30
        ) {

          status.textContent =
            'Preparando';

        }

        if (total <= 0) {

          clearInterval(
            this.interval
          );

          App.Push.show(
            'Tu pedido está listo 🍔'
          );

        }

      }, 1000);

  }

};

/* =========================================================
   PWA
========================================================= */

App.PWA = {

  async register() {

    if (
      !('serviceWorker' in navigator)
    ) return;

    try {

      await navigator
        .serviceWorker
        .register('./sw.js');

      console.log(
        '✅ SW Registered'
      );

    } catch (error) {

      console.error(
        'SW Error:',
        error
      );

    }

  }

};

/* =========================================================
   EVENTS
========================================================= */

App.Events = {

  bind() {

    /* LOGIN */

    App.$('#loginForm')
      ?.addEventListener(
        'submit',
        event => {

          event.preventDefault();

          App.Auth.login(

            App.$('#loginUser')
              ?.value || '',

            App.$('#loginPass')
              ?.value || ''

          );

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

    /* THEME */

    App.$('#themeToggle')
      ?.addEventListener(
        'click',
        () => {

          App.Theme.toggle();

        }
      );

    /* SEARCH */

    App.$('#searchInput')
      ?.addEventListener(
        'input',

        App.debounce(event => {

          App.Filters.search =
            event.target.value;

          App.Filters.apply();

        }, 250)

      );

    /* CATEGORY */

    App.$$('.category-pill')
      .forEach(button => {

        button.addEventListener(
          'click',
          () => {

            App.$$('.category-pill')
              .forEach(item => {

                item.classList.remove(
                  'active'
                );

              });

            button.classList.add(
              'active'
            );

            App.Filters.category =
              button.dataset.category;

            App.Filters.apply();

          }
        );

      });

    /* NAVIGATION */

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

    /* DRAWER */

    App.UI.cartFab
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

    App.$('#confirmPayment')
      ?.addEventListener(
        'click',
        () => {

          App.Payment.confirm();

        }
      );

    /* GLOBAL CLICK */

    document.addEventListener(
      'click',
      event => {

        const target =
          event.target;

        /* RIPPLE */

        const rippleElement =
          target.closest(
            '[data-ripple]'
          );

        if (rippleElement) {

          App.Ripple.create(
            rippleElement,
            event
          );

        }

        /* FAVORITES */

        const favorite =
          target.closest(
            '.restaurant-fav'
          );

        if (favorite) {

          const card =
            favorite.closest(
              '.restaurant-card'
            );

          App.Favorites.toggle(
            card
          );

        }

        /* ADD CART */

        const add =
          target.closest(
            '[data-action="add-cart"]'
          );

        if (add) {

          const product =
            add.closest(
              '.product-card'
            );

          App.Cart.add({

            id:
              product.dataset.id,

            name:
              product.dataset.name,

            price:
              Number(
                product.dataset.price
              )

          });

        }

        /* REMOVE */

        const remove =
          target.closest(
            '[data-remove]'
          );

        if (remove) {

          App.Cart.decrease(
            remove.dataset.remove
          );

        }

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

  App.Splash.init();

  App.Clock.init();

  App.Cart.render();

  App.Cart.updateFab();

  App.Favorites.render();

  App.Orders.render();

  App.Events.bind();

  App.PWA.register();

  console.log(
    '🚀 FastService Initialized'
  );

};

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
  'DOMContentLoaded',
  App.init
);