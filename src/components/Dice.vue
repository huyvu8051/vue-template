<template>
  <div class="dice rounded-lg">
    <ol class="die-list even-roll" data-roll="1" id="die-1">
      <li class="die-item" data-side="1">
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="2">
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="3">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="4">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="5">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="6">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$eventBus.$on("dice", (diceValue) => {
      const dice = [...document.querySelectorAll(".die-list")];
      dice.forEach((die) => {
        this.toggleClasses(die);
        die.dataset.roll = diceValue;
      });
    });
  },
  destroyed() {
    this.$eventBus.$off("dice");
  },
  methods: {
    toggleClasses(die) {
      die.classList.toggle("odd-roll");
      die.classList.toggle("even-roll");
    },
  },
};
</script>

<style lang="css" scoped>
*,
*::before,
*::after {
  box-sizing: content-box;
}

.dice {
  align-items: center;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  grid-template-rows: auto;
  justify-items: center;
  padding: 2rem;
  perspective: 600px;
}

.die-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: 5rem;
  list-style-type: none;
  transform-style: preserve-3d;
  width: 5rem;
}

.even-roll {
  transition: transform 1s ease-out;
}

.odd-roll {
  transition: transform 1s ease-out;
}

.die-item {
  background-color: #ff0000;
  display: grid;
  grid-column: 1;
  grid-row: 1;
  grid-template-areas:
    "one two three"
    "four five six"
    "seven eight nine";
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 70%;
  padding: 0.3rem;
  width: 70%;
}

.dot {
  align-self: center;
  background-color: #ffffff;
  border-radius: 50%;
  display: block;
  height: 0.625rem;
  justify-self: center;
  width: 0.625rem;
}

.even-roll[data-roll="1"] {
  transform: rotateX(360deg) rotateY(720deg) rotateZ(360deg);
}

.even-roll[data-roll="2"] {
  transform: rotateX(450deg) rotateY(720deg) rotateZ(360deg);
}

.even-roll[data-roll="3"] {
  transform: rotateX(360deg) rotateY(630deg) rotateZ(360deg);
}

.even-roll[data-roll="4"] {
  transform: rotateX(360deg) rotateY(810deg) rotateZ(360deg);
}

.even-roll[data-roll="5"] {
  transform: rotateX(270deg) rotateY(720deg) rotateZ(360deg);
}

.even-roll[data-roll="6"] {
  transform: rotateX(360deg) rotateY(900deg) rotateZ(360deg);
}

.odd-roll[data-roll="1"] {
  transform: rotateX(-360deg) rotateY(-720deg) rotateZ(-360deg);
}

.odd-roll[data-roll="2"] {
  transform: rotateX(-270deg) rotateY(-720deg) rotateZ(-360deg);
}

.odd-roll[data-roll="3"] {
  transform: rotateX(-360deg) rotateY(-810deg) rotateZ(-360deg);
}

.odd-roll[data-roll="4"] {
  transform: rotateX(-360deg) rotateY(-630deg) rotateZ(-360deg);
}

.odd-roll[data-roll="5"] {
  transform: rotateX(-450deg) rotateY(-720deg) rotateZ(-360deg);
}

.odd-roll[data-roll="6"] {
  transform: rotateX(-360deg) rotateY(-900deg) rotateZ(-360deg);
}

[data-side="1"] {
  transform: rotate3d(0, 0, 0, 90deg) translateZ(2rem);
}

[data-side="2"] {
  transform: rotate3d(-1, 0, 0, 90deg) translateZ(2rem);
}

[data-side="3"] {
  transform: rotate3d(0, 1, 0, 90deg) translateZ(2rem);
}

[data-side="4"] {
  transform: rotate3d(0, -1, 0, 90deg) translateZ(2rem);
}

[data-side="5"] {
  transform: rotate3d(1, 0, 0, 90deg) translateZ(2rem);
}

[data-side="6"] {
  transform: rotate3d(1, 0, 0, 180deg) translateZ(2rem);
}

[data-side="1"] .dot:nth-of-type(1) {
  grid-area: five;
}

[data-side="2"] .dot:nth-of-type(1) {
  grid-area: one;
}

[data-side="2"] .dot:nth-of-type(2) {
  grid-area: nine;
}

[data-side="3"] .dot:nth-of-type(1) {
  grid-area: one;
}

[data-side="3"] .dot:nth-of-type(2) {
  grid-area: five;
}

[data-side="3"] .dot:nth-of-type(3) {
  grid-area: nine;
}

[data-side="4"] .dot:nth-of-type(1) {
  grid-area: one;
}

[data-side="4"] .dot:nth-of-type(2) {
  grid-area: three;
}

[data-side="4"] .dot:nth-of-type(3) {
  grid-area: seven;
}

[data-side="4"] .dot:nth-of-type(4) {
  grid-area: nine;
}

[data-side="5"] .dot:nth-of-type(1) {
  grid-area: one;
}

[data-side="5"] .dot:nth-of-type(2) {
  grid-area: three;
}

[data-side="5"] .dot:nth-of-type(3) {
  grid-area: five;
}

[data-side="5"] .dot:nth-of-type(4) {
  grid-area: seven;
}

[data-side="5"] .dot:nth-of-type(5) {
  grid-area: nine;
}

[data-side="6"] .dot:nth-of-type(1) {
  grid-area: one;
}

[data-side="6"] .dot:nth-of-type(2) {
  grid-area: three;
}

[data-side="6"] .dot:nth-of-type(3) {
  grid-area: four;
}

[data-side="6"] .dot:nth-of-type(4) {
  grid-area: six;
}

[data-side="6"] .dot:nth-of-type(5) {
  grid-area: seven;
}

[data-side="6"] .dot:nth-of-type(6) {
  grid-area: nine;
}

button {
  align-self: center;
  background-color: #efefef;
  border: none;
  color: #333;
  font-size: 1.25rem;
  font-weight: 700;
  justify-self: center;
  padding: 0.5rem 1rem;
}

button:hover {
  cursor: pointer;
}
</style>