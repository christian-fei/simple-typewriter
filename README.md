# simple-typewriter

## installation

```shell
npm install --save simple-typewriter
```

# usage

```javascript
const element = document.querySelector('.some-element')
const interval = 100
const stopTypewriter = simpleTypewriter('test', element, { interval: interval })

// you can stop the typewriter if you need
stopTypewriter()
```

# documentation

## simpleTypewriter(text, element[, options])

| argument | required | type | description |
|----------|----------|------|-------------|
| **text** | true | String | The text the typewriter will type out |
| **element** | true | Element | The element on which to write the text |
| **options** | false | Object | See [options](#options) section

#### options

Supported parameters are:

| argument | required | type | description |
|----------|----------|------|-------------|
| **interval** | true | String | The interval at which each letter is typed |
| **nextText** | false | Object | [nextText](https://www.npmjs.com/package/next-text#options--object--optional-) options |


# development

Install dependencies:

```
npm i
```

Run tests:

```
npm t
# or
npm t -- --watch
```
