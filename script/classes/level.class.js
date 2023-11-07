class Level {
  constructor(
    backgroundObjects = [],
    barriers = [],
    jellyfishes = [],
    pufferfishes = [],
    boss = [],
    poison = [],
    coins = []
  ) {
    this.backgroundObjects = backgroundObjects;
    this.barriers = barriers;
    this.jellyfishes = jellyfishes;
    this.pufferfishes = pufferfishes;
    this.boss = boss;
    this.poison = poison;
    this.coins = coins;
    this.levelEnd = 6600;
  }

  /**
   * creates coins with a for loop and assigns them random coordinates before pushing them into the coin array.
   * Checks before pushing if the assigned coordinates interfere with already established coins or the coordintes of barriers, in which case they are assigned new ones.
   * Highly taxing.
   * 
   * @param {number} count number of coins to be created
   * @param {object} barriers  new Barrier()
   * @returns coinObjects (array)
   */
  static generateCoins(count, barriers) {
    let coinObjects = [];
    for (let i = 0; i < count; i++) {
      let x, y, isOverlap;
      do {
        x = Math.random() * 4200 + 250;
        y = Math.random() * 440;

        //Checks overlap with coins
        isOverlap = coinObjects.some((coin) => {
          let distance = Math.sqrt((coin.x - x) ** 2 + (coin.y - y) ** 2);
          return distance < 50;
        });
        //Checks overlap with barriers
        isOverlap =
          isOverlap ||
          barriers.some((barrier) => {
            let isInsideX =
              x > barrier.x && x < (barrier.x + barrier.width || 220);
            let isInsideY =
              y > barrier.y && y < (barrier.y + barrier.height || 220);
            return isInsideX && isInsideY;
          });
      } while (isOverlap);

      coinObjects.push(new Coin(x, y));
    }
    return coinObjects;
  }

/**
 * autogenerates Jellyfishes
 * 
 * @param {number} count number of jellyfish
 * @returns jellyfishes = [];
 */
  static generateJellyfishes(count) {
    let jellyfishes = [];
    for (let i = 0; i < count; i++) {
      jellyfishes.push(new Jellyfish());
    }
    return jellyfishes;
  }

  /**
 * autogenerates pufferfishes
 * 
 * @param {number} count number of pufferfishes
 * @returns pufferfishes = [];
 */
  static generatePufferfishes(count) {
    let pufferfishes = [];
    for (let i = 0; i < count; i++) {
      pufferfishes.push(new Pufferfish());
    }
    return pufferfishes;
  }

  /**
   * generates a two sets of backgrounds in a staggered fashion
   * 
   * @param {number} count number ob background objects
   * @returns 
   */
  static fillBackground(count) {
    let backgroundObjects = [];
    for (let i = 0; i < count; i++) {
      backgroundObjects.push(
        new Background("./img/3. Background/Layers/5. Water/L.png", -720 + i * 1440),
        new Background(
          "./img/3. Background/Layers/4.Fondo 2/L2.png",
          -720 + i * 1440
        ),
        new Background(
          "./img/3. Background/Layers/3.Fondo 1/L2.png",
          -720 + i * 1440
        ),
        new Background("./img/3. Background/Light/2.png", -720 + i * 1440),
        new Background("./img/3. Background/Layers/1. Light/2.png", -720 + i * 1440),
        new Background(
          "./img/3. Background/Layers/5. Water/L.png",
          0 + i * 1440
        ),
        new Background(
          "./img/3. Background/Layers/3.Fondo 1/L.png",
          0 + i * 1440
        ),
        new Background(
          "./img/3. Background/Layers/4.Fondo 2/L.png",
          0 + i * 1440
        ),
        new Background("./img/3. Background/Light/1.png", 0 + i * 1440),
        new Background(
          "./img/3. Background/Layers/1. Light/1.png",
          0 + i * 1440
        )
      );
    }
    return backgroundObjects;
  }

  /**
   * loads all non-movable objects, counts are adjustable
   */
  loadStaticElements() {
    //this loads backgrounds, barriers, poison, coins
    this.backgroundObjects = Level.fillBackground(7);
    this.barriers = [
      new Barrier("./img/3. Background/Barrier/2.png", 530, 281),
      new Barrier("./img/3. Background/Barrier/3.png", 1130, -100),
      new Barrier("./img/3. Background/Barrier/2.png", 1130, 300),
      new Barrier("./img/3. Background/Barrier/3.png", 1630, -100),
      new Barrier("./img/3. Background/Barrier/2.png", 2000, 281),
      new Barrier("./img/3. Background/Barrier/3.png", 2690, -100),
      new Barrier("./img/3. Background/Barrier/3.png", 3240, -100),
      new Barrier("./img/3. Background/Barrier/2.png", 3830, 300),
      new Barrier("./img/3. Background/Barrier/3.png", 3830, -100),
    ];
    this.poison = [
      new Poison(455, 333),
      new Poison(1200, 150),
      new Poison(1400, 350),
      new Poison(1470, 325),
      new Poison(1540, 350),
      new Poison(2300, 50),
      new Poison(2300, 200),
      new Poison(2300, 350),
      new Poison(2500, 15),
      new Poison(2933, 400),
      new Poison(3000, 400),
      new Poison(3100, 150),
      new Poison(3480, 11),
      new Poison(3500, 380),
      new Poison(3670, 400),
    ];
    this.coins = Level.generateCoins(30, this.barriers);
  }

  /**
   * laods all movable objects. Counts are adjustable here
   */
  loadDynamicElements() {
    // Load jellyfishes, pufferfishes, and bosses
    this.jellyfishes = Level.generateJellyfishes(7);
    this.pufferfishes = Level.generatePufferfishes(8);
    this.boss = [new BigAssWhale()];
  }
}
