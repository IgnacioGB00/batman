// ═══════════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════════
const batmanCharacters = [
  { name: "Batman",                   identity: "Bruce Wayne",          role: "The Dark Knight & Protector of Gotham",        description: "Driven by a childhood tragedy, he uses his intellect, martial arts mastery, and high-tech arsenal to fight crime.",                                  img: "../img/batman.avif"    },
  { name: "Robin",                    identity: "Dick Grayson",         role: "The Boy Wonder & Loyal Partner",               description: "An expert acrobat who balances Batman's darkness with energy and hope.",                                                                         img: "../img/robin.avif"     },
  { name: "Batgirl",                  identity: "Barbara Gordon",       role: "The Brilliant Crime-Fighter",                  description: "The Commissioner's daughter. She is an exceptionally intelligent hero who operates with her own unique style.",                                  img: "../img/batGirl.avif"   },
  { name: "Alfred Pennyworth",        identity: "Alfred Pennyworth",    role: "The Loyal Butler & Father Figure",             description: "The backbone of Wayne Manor. He provides medical aid, tactical advice, and emotional support to Bruce.",                                         img: "../img/alfret.avif"    },
  { name: "Commissioner James Gordon",identity: "Jim Gordon",           role: "Batman's Primary Contact in the GCPD",         description: "One of the few honest cops in Gotham. He trusts Batman to do what the law cannot.",                                                               img: "../img/gordon.avif"    },
  { name: "Detective Harvey Bullock", identity: "Harvey Bullock",       role: "The Gruff Detective",                          description: "A rough-around-the-edges cop who initially distrusts vigilantes but ultimately seeks true justice.",                                             img: "../img/harvey.avif"    },
  { name: "The Joker",                identity: "Unknown",              role: "The Ultimate Arch-nemesis",                    description: "The Clown Prince of Crime. He uses lethal gags and unpredictable chaos to challenge Batman's morality.",                                         img: "../img/joker.avif"     },
  { name: "Harley Quinn",             identity: "Dr. Harleen Quinzel",  role: "The Joker's Right-Hand & Partner",             description: "A former psychiatrist who fell in love with the Joker. She is known for her acrobatic combat and chaotic energy.",                              img: "../img/harley.avif"    },
  { name: "Bane",                     identity: "Unknown",              role: "The Brilliant Tactician",                      description: "A physical powerhouse and strategic mastermind who uses Venom to gain immense strength.",                                                        img: "../img/bane.avif"      },
  { name: "Two-Face",                 identity: "Harvey Dent",          role: "The Fallen D.A.",                              description: "Once Gotham's White Knight, a tragic accident split his personality into two.",                                                                  img: "../img/twoFace.avif"   },
  { name: "Ra's al Ghul",             identity: "Ra's al Ghul",         role: "The Immortal Leader of the League of Shadows", description: "An eco-terrorist who seeks to save the planet by eradicating modern civilization.",                                                             img: "../img/ghul.avif"      },
  { name: "Clayface",                 identity: "Matt Hagen",           role: "The Shapeshifting Menace",                     description: "A former actor turned into living clay, able to reshape himself and mimic others.",                                                             img: "../img/clayface.avif"  },
  { name: "Catwoman",                 identity: "Selina Kyle",          role: "The Expert Thief",                             description: "A burglar with a complex relationship with Batman.",                                                                                           img: "../img/catWoman.avif"  },
  { name: "The Penguin",              identity: "Oswald Cobblepot",     role: "The Aristocrat of Crime",                      description: "A refined criminal mastermind operating under high society.",                                                                                  img: "../img/penguin.avif"   },
  { name: "Scarecrow",                identity: "Jonathan Crane",       role: "The Master of Fear",                           description: "Uses fear toxin to make victims face their worst nightmares.",                                                                                 img: "../img/scarecrow.avif" },
  { name: "The Riddler",              identity: "Edward Nygma",         role: "The Master of Puzzles",                        description: "Leaves riddles to prove his intelligence over Batman.",                                                                                        img: "../img/riddler.avif"   },
  { name: "Killer Croc",              identity: "Waylon Jones",         role: "The Reptilian Criminal",                       description: "A sewer-dwelling criminal with a crocodile-like appearance.",                                                                                  img: "../img/croc.avif"      },
  { name: "Mr. Freeze",               identity: "Victor Fries",         role: "The Tragic Scientist",                         description: "Driven to save his frozen wife, Nora.",                                                                                                       img: "../img/freeze.avif"    },
  { name: "Poison Ivy",               identity: "Pamela Isley",         role: "The Eco-Terrorist",                            description: "Uses plants and pheromones to protect the environment.",                                                                                      img: "../img/poison.avif"    },
];

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
characterSelect.forEach((select, index) => {
  select.addEventListener('click', () => {
    if (!select.classList.contains('Disabled')) return;

    const character = batmanCharacters[index];
    if (!character) return;

    // Actualizar selector activo
    requestAnimationFrame(() => {
      characterSelect.forEach((img) => {
        img.classList.remove('active');
        img.classList.add('Disabled');
      });
      select.classList.add('active');
      select.classList.remove('Disabled');
    });

    // 1️⃣ Fade OUT — agregar clase que baja la opacidad
    characterImg.classList.remove('animation');
    characterImg.classList.add('fade-out');

    // 2️⃣ Esperar que termine el CSS transition del fade-out
    characterImg.addEventListener('transitionend', function onFadeOut() {
      characterImg.removeEventListener('transitionend', onFadeOut);

      // 3️⃣ Cambiar src cuando ya está invisible
      characterImg.src = character.img;

      // 4️⃣ Fade IN del texto y la imagen nueva
      nameCharacter.textContent        = character.name;
      identityCharacter.textContent    = character.identity;
      roleCharacter.textContent        = character.role;
      descriptionCharacter.textContent = character.description;

      [nameCharacter, identityCharacter, descriptionCharacter].forEach(el => {
        el.classList.remove('animation');
      });

      characterImg.classList.remove('fade-out');

      requestAnimationFrame(() => {
        characterImg.classList.add('animation');
        nameCharacter.classList.add('animation');
        identityCharacter.classList.add('animation');
        descriptionCharacter.classList.add('animation');
      });
    }, { once: true });
  });
});

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