[![Travis Status][trav_img]][trav_site]
[![Test Coverage][cov_img]][cov_site]
[![Code Climate][code_img]][code_site]
[![NPM Package][npm_img]][npm_site]

# React Storybook Superficial Addon

A React Storybook addon for interacting with responsive Superficial looks.

![React Storybook README addon][screen_url]

[Example Storybook with Superficial addon][story_url]

This addon is designed to be used with the
[Superficial](https://github.com/gisikw/superficial) library, which allows
defining inline styles and automatic interpolation between breakpoints. The
storybook addon allows you to review the breakpoints across your full supported
design range.

Features:

* A slider to adjust the `width` property passed to the component under test
* A visualization of each of the style properties associated with the component
* Click-to-edit properties and values, or even add your own!
* Specify default, minimum, and maximum width ranges to test

## Install

`npm install storybook-addon-superficial`

## Usage

Register the addon at `.storybook/addons.js`

```js
import 'storybook-addon-superficial/register';`
```

Then wrap your component when creating your stories!

```js
import Looks from 'storybook-addon-superficial/register';


storiesOf('MyComponent', module)
  .add('Default', () => (
    <Looks>
      <MyComponent />
    </Looks>
  ));
```

You can also specify the minimum, maximum, and starting width values on the
`<Looks>` component itself:

```js
storiesOf('MyComponent', module)
  .add('Default', () => (
    <Looks min={200} max={800} width{600}>
      <MyComponent />
    </Looks>
  ));
```

## Contributing

Bug reports and pull requests are welcome on GitHub at
https://github.com/gisikw/storybook-addon-superficial

## License

The library is available as open source under the terms of the [MIT
License](http://opensource.org/licenses/MIT).

[trav_img]: https://api.travis-ci.org/gisikw/storybook-addon-superficial.svg
[trav_site]: https://travis-ci.org/gisikw/storybook-addon-superficial
[cov_img]: https://codeclimate.com/github/gisikw/storybook-addon-superficial/badges/coverage.svg
[cov_site]: https://codeclimate.com/github/gisikw/storybook-addon-superficial/coverage
[code_img]: https://codeclimate.com/github/gisikw/storybook-addon-superficial/badges/gpa.svg
[code_site]: https://codeclimate.com/github/gisikw/storybook-addon-superficial
[npm_img]: https://img.shields.io/npm/v/storybook-addon-superficial.svg
[npm_site]: https://www.npmjs.com/package/storybook-addon-superficial
[screen_url]: .storybook/screenshot.jpg?raw=true
[story_url]: https://gisikw.github.io/storybook-addon-superficial/
