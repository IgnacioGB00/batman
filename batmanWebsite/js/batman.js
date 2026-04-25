const batmanCharacters = [
  {
    name: "Batman",
    identity: "Bruce Wayne",
    role: "The Dark Knight & Protector of Gotham",
    description: "Driven by a childhood tragedy, he uses his intellect, martial arts mastery, and high-tech arsenal to fight crime.",
    img: "../img/batman.avif"
  },
  {
    name: "Robin",
    identity: "Dick Grayson",
    role: "The Boy Wonder & Loyal Partner",
    description: "An expert acrobat who balances Batman's darkness with energy and hope.",
    img: "../img/robin.avif"
  },
  {
    name: "Batgirl",
    identity: "Barbara Gordon",
    role: "The Brilliant Crime-Fighter",
    description: "The Commissioner's daughter. She is an exceptionally intelligent hero who operates with her own unique style.",
    img: "../img/batGirl.avif"
  },
  {
    name: "Alfred Pennyworth",
    identity: "Alfred Pennyworth",
    role: "The Loyal Butler & Father Figure",
    description: "The backbone of Wayne Manor. He provides medical aid, tactical advice, and emotional support to Bruce.",
    img: "../img/alfret.avif"
  },
  {
    name: "Commissioner James Gordon",
    identity: "Jim Gordon",
    role: "Batman's Primary Contact in the GCPD",
    description: "One of the few honest cops in Gotham. He trusts Batman to do what the law cannot.",
    img: "../img/gordon.avif"
  },
  {
    name: "Detective Harvey Bullock",
    identity: "Harvey Bullock",
    role: "The Gruff Detective",
    description: "A rough-around-the-edges cop who initially distrusts vigilantes but ultimately seeks true justice.",
    img: "../img/harvey.avif"
  },
  {
    name: "The Joker",
    identity: "Unknown",
    role: "The Ultimate Arch-nemesis",
    description: "The Clown Prince of Crime. He uses lethal gags and unpredictable chaos to challenge Batman's morality.",
    img: "../img/joker.avif"
  },
  {
    name: "Harley Quinn",
    identity: "Dr. Harleen Quinzel",
    role: "The Joker's Right-Hand & Partner",
    description: "A former psychiatrist who fell in love with the Joker. She is known for her acrobatic combat and chaotic energy.",
    img: "../img/harley.avif"
  },
  {
    name: "Bane",
    identity: "Unknown",
    role: "The Brilliant Tactician",
    description: "A physical powerhouse and strategic mastermind who uses Venom to gain immense strength.",
    img: "../img/bane.avif"
  },
  {
    name: "Two-Face",
    identity: "Harvey Dent",
    role: "The Fallen D.A.",
    description: "Once Gotham's White Knight, a tragic accident split his personality into two.",
    img: "../img/twoFace.avif"
  },
  {
    name: "Ra's al Ghul",
    identity: "Ra's al Ghul",
    role: "The Immortal Leader of the League of Shadows",
    description: "An eco-terrorist who seeks to save the planet by eradicating modern civilization.",
    img: "../img/ghul.avif"
  },
  {
    name: "Clayface",
    identity: "Matt Hagen",
    role: "The Shapeshifting Menace",
    description: "A former actor turned into living clay, able to reshape himself and mimic others.",
    img: "../img/clayface.avif"
  },
  {
    name: "Catwoman",
    identity: "Selina Kyle",
    role: "The Expert Thief",
    description: "A burglar with a complex relationship with Batman.",
    img: "../img/catWoman.avif"
  },
  {
    name: "The Penguin",
    identity: "Oswald Cobblepot",
    role: "The Aristocrat of Crime",
    description: "A refined criminal mastermind operating under high society.",
    img: "../img/penguin.avif"
  },
  {
    name: "Scarecrow",
    identity: "Jonathan Crane",
    role: "The Master of Fear",
    description: "Uses fear toxin to make victims face their worst nightmares.",
    img: "../img/scarecrow.avif"
  },
  {
    name: "The Riddler",
    identity: "Edward Nygma",
    role: "The Master of Puzzles",
    description: "Leaves riddles to prove his intelligence over Batman.",
    img: "../img/riddler.avif"
  },
  {
    name: "Killer Croc",
    identity: "Waylon Jones",
    role: "The Reptilian Criminal",
    description: "A sewer-dwelling criminal with a crocodile-like appearance.",
    img: "../img/croc.avif"
  },
  {
    name: "Mr. Freeze",
    identity: "Victor Fries",
    role: "The Tragic Scientist",
    description: "Driven to save his frozen wife, Nora.",
    img: "../img/freeze.avif"
  },
  {
    name: "Poison Ivy",
    identity: "Pamela Isley",
    role: "The Eco-Terrorist",
    description: "Uses plants and pheromones to protect the environment.",
    img: "../img/poison.avif"
  }
];

// ─── DOM References ───────────────────────────────────────────────────────────
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

// ─── Character Selector ───────────────────────────────────────────────────────
characterSelect.forEach((select, index) => {
  select.addEventListener('click', () => {
    if (!select.classList.contains('Disabled')) return;

    // ✅ Lectura primero — antes de tocar el DOM
    const character = batmanCharacters[index];
    if (!character) return;

    // ✅ Escritura agrupada en un solo frame
    requestAnimationFrame(() => {
      characterSelect.forEach((otherImg) => {
        otherImg.classList.remove('active');
        otherImg.classList.add('Disabled');
      });

      select.classList.add('active');
      select.classList.remove('Disabled');

      characterImg.src = character.img;
      characterImg.classList.remove('animation');
      nameCharacter.textContent = character.name;
      nameCharacter.classList.remove('animation');
      identityCharacter.textContent = character.identity;
      identityCharacter.classList.remove('animation');
      roleCharacter.textContent = character.role;
      descriptionCharacter.textContent = character.description;
      descriptionCharacter.classList.remove('animation');

      // Segundo frame para agregar animación tras haberla removido
      requestAnimationFrame(() => {
        characterImg.classList.add('animation');
        nameCharacter.classList.add('animation');
        identityCharacter.classList.add('animation');
        descriptionCharacter.classList.add('animation');
      });
    });
  });
});

// ─── Scroll: Nav highlight ────────────────────────────────────────────────────
let sectionPositions = [];

// ✅ Lectura de offsetTop dentro de rAF — evita reflow forzado
function updateSectionPositions() {
  requestAnimationFrame(() => {
    sectionPositions = Array.from(sections).map((section) => ({
      id: section.getAttribute('id'),
      top: section.offsetTop,
      height: section.clientHeight
    }));
  });
}

window.addEventListener('load', updateSectionPositions);
window.addEventListener('resize', updateSectionPositions);

let navTicking = false;

window.addEventListener('scroll', () => {
  if (navTicking) return;
  navTicking = true;

  requestAnimationFrame(() => {
    let actual = "";

    // ✅ Solo lectura de variable en memoria — sin tocar el DOM
    sectionPositions.forEach((section) => {
      if (window.scrollY >= section.top - 150) {
        actual = section.id;
      }
    });

    // ✅ Solo escritura agrupada al final
    navLinks.forEach((link) => {
      link.style.color = link.getAttribute('href') === `#${actual}`
        ? '#FFDD01'
        : '#F0EAD6';
    });

    navTicking = false;
  });
});

// ─── Scroll: BatMobile ────────────────────────────────────────────────────────
let mobileTicking = false;
let batMobileVisible = false; // ✅ Estado en memoria — evita escrituras innecesarias al DOM

window.addEventListener('scroll', () => {
  if (mobileTicking) return;
  mobileTicking = true;

  requestAnimationFrame(() => {
    const shouldShow = window.scrollY > 50;

    // ✅ Solo escribe si el estado realmente cambió
    if (shouldShow && !batMobileVisible) {
      batMobile.classList.add('appear');
      batMobile.classList.remove('hidden');
      batMobileVisible = true;
    } else if (!shouldShow && batMobileVisible) {
      batMobile.classList.remove('appear');
      batMobile.classList.add('hidden');
      batMobileVisible = false;
    }

    mobileTicking = false;
  });
});

// ─── Drag & Drop Cards ────────────────────────────────────────────────────────
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

    // ✅ Fase de lectura primero — fuera del rAF
    const containerRect = cardsContainer.getBoundingClientRect();
    const dropX = e.clientX - containerRect.left;
    const isRight = dropX > containerRect.width / 2;
    const currentZ = parseInt(draggingCard.style.zIndex);

    // ✅ Fase de escritura después — dentro del rAF
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

// ─── Buttons ──────────────────────────────────────────────────────────────────
buttonMain.forEach((button) => {
  button.addEventListener('click', () => {
    window.open('https://www.hbomax.com', '_blank');
  });
});

playButton.addEventListener('click', () => {
  window.open('https://youtu.be/CjhNY2vAGP0?si=2_wOsiJIst53tL-h', '_blank');
});