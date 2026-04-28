

// ═══════════════════════════════════════════════════════════════
//  DOM REFERENCES  (una sola lectura al cargar)
// ═══════════════════════════════════════════════════════════════
const characterImg         = document.querySelector('#character');
const identityCharacter    = document.querySelector('#identity');
const nameCharacter        = document.querySelector('#name');
const roleCharacter        = document.querySelector('#role');
const descriptionCharacter = document.querySelector('#description');
const characterSelect      = document.querySelectorAll('.ImgCharcter');
const sections             = document.querySelectorAll('section');
const navLinks             = document.querySelectorAll('.navlink');
const batMobile            = document.querySelector('.mobile');
const cardsContainer       = document.querySelector('.cards');
const allCards             = document.querySelectorAll('.card');
const buttonMain           = document.querySelectorAll('.buttonMain');
const playButton           = document.querySelector('#playButton');

// ═══════════════════════════════════════════════════════════════
//  CHARACTER SELECTOR
//  Sin reflow: solo escrituras agrupadas en rAF
// ═══════════════════════════════════════════════════════════════
const FADE_DURATION = 300;

function initCharacterSelector() {
  const characters = window.batmanCharacters;
  if (!characters) return;

  characterSelect.forEach((select, index) => {
    select.addEventListener('click', () => {
      if (!select.classList.contains('Disabled')) return;

      const character = characters[index];
      if (!character) return;

      // Actualizar selector activo
      characterSelect.forEach((img) => {
        img.classList.remove('active');
        img.classList.add('Disabled');
      });
      select.classList.add('active');
      select.classList.remove('Disabled');

      // Fade OUT
      characterImg.classList.add('fade-out');
      nameCharacter.classList.add('fade-out');
      identityCharacter.classList.add('fade-out');
      descriptionCharacter.classList.add('fade-out');

      setTimeout(() => {
        // Cambiar contenido estando invisible
        characterImg.src                 = character.img;
        nameCharacter.textContent        = character.name;
        identityCharacter.textContent    = character.identity;
        roleCharacter.textContent        = character.role;
        descriptionCharacter.textContent = character.description;

        // Fade IN
        requestAnimationFrame(() => {
          characterImg.classList.remove('fade-out');
          nameCharacter.classList.remove('fade-out');
          identityCharacter.classList.remove('fade-out');
          descriptionCharacter.classList.remove('fade-out');
        });

      }, FADE_DURATION);
    });
  });
}

// ═══════════════════════════════════════════════════════════════
//  NAV HIGHLIGHT — con IntersectionObserver
//  ✅ Sin offsetTop, sin reflow forzado
// ═══════════════════════════════════════════════════════════════
let currentSection = '';

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        currentSection = entry.target.getAttribute('id');

        // Escritura agrupada en rAF
        requestAnimationFrame(() => {
          navLinks.forEach((link) => {
            link.style.color =
              link.getAttribute('href') === `#${currentSection}`
                ? '#FFDD01'
                : '#F0EAD6';
          });
        });
      }
    });
  },
  {
    // El offset negativo hace que el observer dispare cuando la sección
    // ocupa al menos el 40% de la pantalla, similar al umbral de 150px anterior
    rootMargin: '-10% 0px -50% 0px',
    threshold: 0,
  }
);

sections.forEach((section) => navObserver.observe(section));

// ═══════════════════════════════════════════════════════════════
//  BATMOBILE — con IntersectionObserver sobre un sentinel
//  ✅ Cero lecturas de geometría, cero reflow
// ═══════════════════════════════════════════════════════════════

// Sentinel: un div de 1px justo debajo del header
const sentinel = document.createElement('div');
sentinel.style.cssText = 'position:absolute;top:80px;height:1px;width:1px;pointer-events:none;';
document.body.prepend(sentinel);

let batMobileVisible = false;

const mobileObserver = new IntersectionObserver(
  ([entry]) => {
    const shouldShow = !entry.isIntersecting; // visible cuando el sentinel sale del viewport

    if (shouldShow === batMobileVisible) return; // sin cambio, no escribe al DOM
    batMobileVisible = shouldShow;

    requestAnimationFrame(() => {
      if (shouldShow) {
        batMobile.classList.add('appear');
        batMobile.classList.remove('hidden');
      } else {
        batMobile.classList.remove('appear');
        batMobile.classList.add('hidden');
      }
    });
  },
  { threshold: 0 }
);

mobileObserver.observe(sentinel);

// ═══════════════════════════════════════════════════════════════
//  DRAG & DROP CARDS
//  ✅ Lectura de geometría (getBoundingClientRect) solo en el
//     evento drop — fuera del scroll, sin polling continuo
// ═══════════════════════════════════════════════════════════════
function setupBatmanDrag() {
  if (window.innerWidth < 1200) return;

  allCards.forEach((card, index) => {
    card.style.zIndex = allCards.length - index;
    card.setAttribute('draggable', 'true');

    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', index);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
  });

  cardsContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  cardsContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggingCard = document.querySelector('.dragging');
    if (!draggingCard) return;

    // ✅ getBoundingClientRect aquí es aceptable:
    // ocurre una sola vez por drop, no en cada frame de scroll
    const containerRect = cardsContainer.getBoundingClientRect();
    const isRight       = (e.clientX - containerRect.left) > containerRect.width / 2;
    const currentZ      = parseInt(draggingCard.style.zIndex);

    requestAnimationFrame(() => {
      if (isRight) {
        draggingCard.classList.add('at-right');
        draggingCard.style.zIndex = 100 + currentZ;
      } else {
        draggingCard.classList.remove('at-right');
        draggingCard.style.zIndex = allCards.length;
      }
    });
  });
}

window.addEventListener('load', setupBatmanDrag);
window.addEventListener('resize', setupBatmanDrag);

// ═══════════════════════════════════════════════════════════════
//  BUTTONS
// ═══════════════════════════════════════════════════════════════
buttonMain.forEach((button) => {
  button.addEventListener('click', () => window.open('https://www.hbomax.com', '_blank'));
});

playButton.addEventListener('click', () => {
  window.open('https://youtu.be/CjhNY2vAGP0?si=2_wOsiJIst53tL-h', '_blank');
});