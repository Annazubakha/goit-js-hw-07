import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  list: document.querySelector(".gallery"),
};

const listItemsMarkup = createListItemsMarkup(galleryItems);

refs.list.innerHTML = listItemsMarkup;

refs.list.addEventListener("click", onListElemClick);

function createListItemsMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) => `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`
    )
    .join("");
}

function onListElemClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") return;

  const instance = basicLightbox.create(
    `
     <img src="${evt.target.dataset.source}" width="800" height="600"/>
  `,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onEscapePress);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", onEscapePress);
      },
    }
  );
  instance.show();

  function onEscapePress(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
}

console.log(galleryItems);
