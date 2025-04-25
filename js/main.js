document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("chessboard");
  if (!board) {
    console.warn("#chessboard bulunamadı.");
    return;
  }

  const squares = [];

  for (let row = 8; row >= 1; row--) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = "absolute w-[12.5%] h-[12.5%]";
      square.style.left = `${col * 12.5}%`;
      square.style.top = `${(8 - row) * 12.5}%`;
      square.dataset.defaultColor = (row + col) % 2 === 0 ? "#ffffff" : "#777777";
      square.style.backgroundColor = square.dataset.defaultColor;
      board.appendChild(square);
      squares.push(square);
    }
  }

  function getSquareElement(squareId) {
    const col = squareId.charCodeAt(0) - "a".charCodeAt(0);
    const row = parseInt(squareId[1]) - 1;
    const index = (7 - row) * 8 + col;
    return squares[index];
  }

  function highlightSquares(squaresToHighlight) {
    squaresToHighlight.forEach((sq) => {
      const el = getSquareElement(sq);
      el.style.backgroundColor = "#F15A22";
    });
  }

  function resetSquares(squaresToReset) {
    squaresToReset.forEach((sq) => {
      const el = getSquareElement(sq);
      el.style.backgroundColor = el.dataset.defaultColor;
    });
  }

  function createPiece(image, position) {
    const img = document.createElement("img");
    img.src = `./img/${image}`;
    img.className = "absolute w-[12.5%] h-[12.5%]";
    board.appendChild(img);
    moveTo(img, position, false);
    return img;
  }

  function moveTo(piece, square, animate = true) {
    const col = square.charCodeAt(0) - "a".charCodeAt(0);
    const row = parseInt(square[1]) - 1;
    const x = col * (512 / 8);
    const y = (7 - row) * (512 / 8);

    try {
      gsap.killTweensOf(piece);
    } catch (e) {
      console.warn("GSAP killTweensOf hatası:", e);
    }

    if (animate) {
      gsap.to(piece, {
        duration: 2,
        x,
        y,
        scale: 0.9,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(piece, { scale: 0.9 });
        },
      });
    } else {
      gsap.set(piece, { x, y });
    }
  }

  const pieces = {
    sah: createPiece("beyaz-sah.png", "e1"),
    siyahSah: createPiece("siyah-sah.png", "g8"),
    vezir: createPiece("beyaz-vezir.png", "f6"),
    at: createPiece("beyaz-at.png", "d5"),
    kale: createPiece("beyaz-kale.png", "c7"),
    fil: createPiece("beyaz-fil.png", "f5"),
    piyon: createPiece("beyaz-piyon.png", "h6"),
  };

  const moves = [
    {
      do: [],
      undo: [],
    },
    {
      do: [() => moveTo(pieces.vezir, "f6"), () => moveTo(pieces.vezir, "f7"), () => highlightSquares(["f6", "f7"])],
      undo: [() => resetSquares(["f6", "f7"]), () => moveTo(pieces.vezir, "f6")],
    },
    {
      do: [() => moveTo(pieces.at, "d7"), () => moveTo(pieces.at, "e7"), () => highlightSquares(["d5", "d6", "d7", "e7"])],
      undo: [() => resetSquares(["d5", "d6", "d7", "e7"]), () => moveTo(pieces.at, "d7"), () => moveTo(pieces.at, "d5")],
    },
    {
      do: [() => moveTo(pieces.kale, "c8"), () => highlightSquares(["c7", "c8"])],
      undo: [() => resetSquares(["c7", "c8"]), () => moveTo(pieces.kale, "c7")],
    },
    {
      do: [() => moveTo(pieces.fil, "h7"), () => highlightSquares(["f5", "g6", "h7"])],
      undo: [() => resetSquares(["f5", "g6", "h7"]), () => moveTo(pieces.fil, "f5")],
    },
    {
      do: [() => moveTo(pieces.piyon, "h7"), () => highlightSquares(["h6", "h7"])],
      undo: [() => resetSquares(["h6", "h7"]), () => moveTo(pieces.piyon, "h6")],
    },
  ];

  let activeIndex = 0;

  const swiper = new Swiper(".mySwiper", {
    direction: "horizontal",
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: function () {
        const newIndex = this.activeIndex;
        const sound = document.getElementById("moveSound");
        if (sound) {
          sound.currentTime = 0;
          sound.play().catch((e) => console.warn("Ses çalınamadı:", e));
        }

        if (newIndex > activeIndex) {
          moves[activeIndex]?.undo?.forEach((fn) => fn());
          moves[newIndex]?.do?.forEach((fn) => fn());
        } else if (newIndex < activeIndex) {
          moves[activeIndex]?.undo?.forEach((fn) => fn());
          moves[newIndex]?.do?.forEach((fn) => fn());
        }

        activeIndex = newIndex;
      },
    },
  });

  // parallax
  const scene = document.getElementById("scene");
  const layers = scene?.querySelectorAll(".layer");
  if (scene && layers.length > 0) {
    document.addEventListener("mousemove", function (e) {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      layers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute("data-depth"));
        const moveX = x * depth * 50;
        const moveY = y * depth * 50;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    });
  }
});
