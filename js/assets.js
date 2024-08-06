// CLASSES

class Card {
  constructor(value, suit, face, asset = "card") {
    this.value = value;
    this.suit = suit;
    this.face = face;
    this.asset = asset;
  }
}

class Deck {
  static suits = ["heart", "diamond", "spades", "clubs"];
  static values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  static faces = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  constructor() {
    this.cards = [];
  }

  createDeck(isTest = false) {
    const newDeck = [];
    let ClassRef = isTest ? TestDeck : Deck;
    ClassRef.suits.forEach((suit) => {
      ClassRef.values.forEach((val, idx) => {
        newDeck.push(new Card(val, suit, ClassRef.faces[idx]));
      });
    });
    this.cards = newDeck;
  }
  shuffle() {
    // fisher-yates algo: source geeks for geeks
    for (let i = this.cards.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i inclusive
      let j = Math.floor(Math.random() * (i + 1));

      // Swap arr[i] with the element
      // at random index
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  split() {
    const p1 = [];
    const p2 = [];
    let count = 0;

    while (this.cards.length) {
      let card = this.cards.splice(
        Math.floor(Math.random() * this.cards.length),
        1
      );
      if (count % 2 == 0) {
        p1.push(...card);
      } else {
        p2.push(...card);
      }
      count++;
    }

    return [p1, p2];
  }
}

class TestDeck extends Deck {
  static suits = ["heart", "diamond"];
  static values = [2, 3, 4, 5];
  static faces = ["2", "3", "4", "5"];
}
