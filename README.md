# vue3-fortune-wheel

👊 An easier Wheel in Vue.js 👊

🔥 Vue3 + Typescript 🔥

## Installation

#### NPM / YARN

Install the package:

```
npm install vue3-fortune-wheel --save
yarn add vue3-fortune-wheel
```

```javascript
import { Wheel } from 'vue3-fortune-wheel'

export default {
  components: {
    Wheel,
  },
}
```

```html
<Wheel />
```

## Data binding 🐝

This data corresponds to the id of your winning object. In my case an API returns me the id.
If you are not in this case you can create a method that randomly chooses an id

Exemple of this method

```javascript
randomGift() {
  return Math.floor(Math.random() * this.data.lengh) + 1
}
```


### Gift
- Type: `Number`
- Default: `null`

id of the gain / gift

## Props/Options

### animDuration
- Type: `Number`
- Default: `5000`

How many millisecondes you want the wheel to turn

### Data

- Type: `Array`
- Default: `[]`

* value: `string`
* id: `number`

#### Example :

```javascript
data: [
  {
    value: "Gift 1",
    id: 1,
    color: '#7d7db3'
    color:
  },
  {
    value: "Gift 2",
    id: 2,
    color: '#ffffff'
  },
  {
    value: "Gift 3",
    id: 3,
    color: '#c92729'
  },
],
```

### ImgParams

- Type: `Object`
- Default: `{}`

Possible to add an image in the center

#### Example :

```javacript
  {
    src: string
    width: number
    height: number
  }
```
