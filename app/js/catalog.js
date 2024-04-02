const carsFetch = fetch("./card.json");

const drinkNames = {
  juice: "Juices",
  coffee: "Coffees",
  water: "Waters",
  tea: "Teas",
};

let allCard = [];
let allTabs = [];
let topProducts = [];
let selectedTab;
let maxPrice;
let priceFilter;
let searchValue;

let catalogTabs = document.querySelector(".catalog__tabs");
let cardsWrapper = document.querySelector(".catalog__tabs-cards");
let topProductWrapper = document.querySelector(".top-product__cards");
carsFetch
  .then((response) => response.json())
  .then((cards) => {
    allCard = cards;
    renderAllFilters();
    topProducts = cards.filter((el) => el.topProduct);
    renderCards(cards);
    renderCardsTopProduct(topProducts);
  });

const getFilteredProducts = (tab, filter, name) => {
  let tabProducts = [];
  if (tab) {
    tabProducts = allCard.filter((card) => card.type === tab);
  } else {
    tabProducts = [...allCard];
  }
  if (filter) {
    tabProducts = tabProducts.filter(
      (card) => card.price >= filter.min && card.price <= filter.max
    );
  }

  if (name) {
    tabProducts = tabProducts.filter((card) => {
      const cardName = card.name.toLowerCase();
      const searchName = name.toLowerCase();
      const isValid = cardName.includes(searchName);

      return isValid;
    });
  }

  return tabProducts;
};

const getTabsName = (tab) => {
  let li = document.createElement("li");

  li.classList.add("catalog__tab-title");
  li.id = `catalog-tab-${tab}`;

  const caption = drinkNames[tab];
  li.innerHTML = caption;
  li.addEventListener("click", (e) => {
    if (selectedTab) {
      document
        .querySelector(`#catalog-tab-${selectedTab}`)
        .classList.remove("catalog__tab-title_selected");
    }
    if (selectedTab !== tab) {
      li.classList.add("catalog__tab-title_selected");
    }
    selectedTab = selectedTab !== tab ? tab : undefined;
    renderCards(getFilteredProducts(selectedTab, priceFilter, searchValue));
  });

  return li;
};
const renderAllFilters = () => {
  allTabs = allCard.reduce((acc, curr) => {
    if (!acc.includes(curr.type)) {
      acc.push(curr.type);
    }
    return acc;
  }, []);
  maxPrice = Math.max(...allCard.map((card) => card.price));
  renderTabs(allTabs);
  getSearchPrice();
  getSearchName();
};
const renderTabs = (tabs) => {
  let tabsContainer = document.querySelector(".catalog__tabs-container");
  tabs.forEach((el) => {
    tabsContainer.append(getTabsName(el));
  });
};
const renderCards = (cards) => {
  cardsWrapper.innerHTML = "";
  cards.forEach((card) => {
    cardsWrapper.append(getCardsCatalog(card));
  });
};
const renderCardsTopProduct = (cards) => {
  topProductWrapper.innerHTML = "";
  cards.forEach((card) => {
    topProductWrapper.append(getTopProduct(card));
  });
};
const getCardsCatalog = (card) => {
  let cardWrap = document.createElement("div");
  let cardTitle = document.createElement("h2");
  let cardImage = document.createElement("img");
  let oldPrice = document.createElement("span");
  let price = document.createElement("p");
  let btnBasket = document.createElement("a");
  let basketImage = document.createElement("img");
  basketImage.src = card.btnImage;
  btnBasket.classList.add("btn-basket");
  btnBasket.href = "#";
  price.innerHTML = `$ ${card.price.toFixed(2)}`;
  oldPrice.innerHTML = `$ ${card.oldPrice.toFixed(2)}`;
  cardWrap.classList.add("catalog__tabs-card");
  cardImage.src = card.image;
  cardTitle.innerHTML = card.name;
  cardsWrapper.append(cardWrap);
  cardWrap.append(cardImage, cardTitle, oldPrice, price, btnBasket);
  btnBasket.append(basketImage);
  return cardWrap;
};

const getTopProduct = (product) => {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card-gradient");
  
  let cardInner = document.createElement("div");
  cardInner.classList.add("card-gradient__inner");

  let imageProductWrap = document.createElement("div");
  imageProductWrap.classList.add("card-gradient__img");

  let topProductInfo = document.createElement("div");
  topProductInfo.classList.add("card-gradient__info");

  let productInfoTitle = document.createElement("h2");
  productInfoTitle.innerHTML = product.name;

  let imageProduct = document.createElement("img");
  imageProduct.src = product.topProductImage;

  let subtitleWrap = document.createElement("div");
  subtitleWrap.classList.add("card-gradient__info-subtitle__wrap");

  let infoSubtitle = document.createElement("div");
  infoSubtitle.classList.add("card-gradient__info-subtitle");

  let infoSpan = document.createElement("span");
  infoSpan.innerHTML = "Product Rating";

  let infoIcons = document.createElement("div");
  infoIcons.classList.add("card-gradient__info-stars");
  infoIcons.innerHTML = `
  <i class="fa-solid fa-star"></i>
  <i class="fa-solid fa-star"></i>
  <i class="fa-solid fa-star"></i>
  <i class="fa-solid fa-star"></i>
  <i class="fa-regular fa-star"></i>`;
  
  let infoDescription = document.createElement("p");
  infoDescription.innerHTML = product.description;

  let infoPriceWrap = document.createElement("div");
  infoPriceWrap.classList.add('card-gradient__info-price');

  let infoPrice = document.createElement("p");
  infoPrice.innerHTML = `$ ${product.price.toFixed(2)}`;

  let btnBasket = document.createElement("a");
  let basketImage = document.createElement("img");
  basketImage.src = product.btnImage;
  btnBasket.classList.add("btn-basket");
  btnBasket.href = "#";

  btnBasket.append(basketImage);
  topProductInfo.append(productInfoTitle, subtitleWrap, infoIcons, infoDescription, infoPriceWrap);
  infoPriceWrap.append(infoPrice, btnBasket)
  subtitleWrap.append(infoSubtitle);
  infoSubtitle.append(infoSpan);
  imageProductWrap.append(imageProduct);
  cardInner.append(imageProductWrap, topProductInfo);
  cardDiv.append(cardInner);
  return cardDiv;
};

const handleMinMax = (e) => {
  const el = e.target;
  if (el.value != "") {
    if (parseInt(el.value) < parseInt(el.min)) {
      el.value = el.min;
    }
    if (parseInt(el.value) > parseInt(el.max)) {
      el.value = el.max;
    }
  }
};

const getSearchPrice = () => {
  priceFilter = {
    min: 0,
    max: maxPrice,
  };
  const min = 0;
  const dash = document.createElement("span");
  dash.innerHTML = "-";
  let tabsPrice = document.querySelector(".catalog__tabs-price");
  tabsPrice.innerHTML = "Price";
  let inputMin = document.createElement("input");
  let inputMax = document.createElement("input");
  inputMin.classList.add("input-min");
  inputMax.classList.add("input-max");
  inputMin.type = "number";
  inputMax.type = "number";
  inputMin.min = min;
  inputMin.max = maxPrice;
  inputMin.placeholder = `$${min.toFixed(2)}`;
  inputMax.min = min;
  inputMax.max = maxPrice;
  inputMax.placeholder = `$${maxPrice.toFixed(2)}`;
  inputMax.addEventListener("keyup", handleMinMax);
  inputMin.addEventListener("keyup", handleMinMax);

  inputMax.addEventListener("input", (e) => {
    const userValue = Number(inputMax.value);
    priceFilter = { ...priceFilter, max: userValue || maxPrice };

    renderCards(getFilteredProducts(selectedTab, priceFilter, searchValue));
  });
  inputMin.addEventListener("input", (e) => {
    priceFilter = { ...priceFilter, min: Number(inputMin.value) };

    renderCards(getFilteredProducts(selectedTab, priceFilter, searchValue));
  });

  tabsPrice.append(inputMin, dash, inputMax);
  return tabsPrice;
};

const getSearchName = () => {
  let searchNameWrap = document.querySelector(".catalog__tabs-search");
  let inputSearchName = document.createElement("input");
  inputSearchName.placeholder = "search";
  inputSearchName.type = "text";

  inputSearchName.addEventListener("keyup", (e) => {
    searchValue = inputSearchName.value.trim();

    renderCards(getFilteredProducts(selectedTab, priceFilter, searchValue));
  });
  searchNameWrap.append(inputSearchName);
  return searchNameWrap;
};
