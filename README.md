# SpotAngels Analytics Dashboard

## Installation

Use git in order to clone this repository locally

with HTTPS:

```
git clone https://github.com/CLEDeveloppers/kudos.git
```

with [SSH](https://help.github.com/en/enterprise/2.15/user/articles/adding-a-new-ssh-key-to-your-github-account) (recommended):

```
git clone git@github.com:zakariaelas/kudos.git
```

Once in the project directory, you will need to install all dependencies by running the following command:

```
npm install
```

Before starting the app, you will need to create a `.env` file containing the following lines:

```
REACT_APP_URL=api_url
REACT_APP_USERNAME=username
REACT_APP_PASSWORD=password
```

Once that done, you can then run the following to start the app:

```
npm start
```

## Development Environment

Under the root folder of the project, you might notice the following files:

- `.eslintrc.json`: Used to define a set of linting rules throughout the project. Personally, just like most people, I just use the airbnb eslint config.
- `.prettierrc`: Used to define the code formatting rules to be enforced throughout the project. Once again, nothing crazy, but feel free to take a look at the file if you're interested.

## Approach

I am aware that this is only an exercise to get a brief idea about my React skills, and that this write up might not be necessary, but I feel like this could help you understand why I did some things the way I did ... so please just bear with me 😆.

This metrics dashboard was built with an idea in mind: that it is a small part of a much **larger** project. This is the main assumption I have made while working on this exercise. I hope that this somewhat explains the list of dependencies discussed below:

### Dependencies

I would also like to allocate some time to talk about some of the dependencies and libraries used, as well as the reason why I chose to use them.

### [Material UI](https://material-ui.com/)

As a react library that is based on Material Design, I really enjoy using it because of the freedom it offers. I can use the UI components that come with the library, go for my own components, or even customize the one that come with the library without much trouble. I also enjoy the fact that they do not rely on any style sheets. Styles are injected using jss, and there a many different ways to override the default styles. It is also one of my favorite documentations out there.

### [Material UI Pickers](https://material-ui-pickers.dev/)

This library builds on top of material-ui and exposes date and time pickers. I am using it because the ones that ship with "vanilla" material-ui are not so great. They rely on the default date and time inputs. However, from my experience, I have encountered some issues with the library, that fortunately, will be fixed in v3.

### [Formik](https://jaredpalmer.com/formik/)

A popular form management library that I have used before to manage forms throughout my application. It keeps your components concise and clean, without having to repeatedly creating your own state, adding input event handlers, and validating your forms. Formik takes all of that away from us and handles it under the hood.

### [Redux](https://redux.js.org/) + [React-Redux](https://react-redux.js.org/)

I must admit that looking at this particular exercise, and IT **only**. One could definitely argue that redux is an **overkill**. However, as I have mentioned before, the idea is that this is typically part of a larger project. I also believe that in the sample application provided, redux was used (not entirely sure tho). Personally, I also wanted to use this opportunity to get acquainted with the new hooks API. I wanted to see the differences between it and the usual `connect` + `mapState/DispatchToProps`.

### [Reselect](https://github.com/reduxjs/reselect)

Personally my first time using this library. I always came across reselect while reading the react-redux documentation, so I wanted to give the library a try in this project. The main advantage reselect offers is efficiency through memoization. Selectors are typically ran every time an action is dispatched, which might cause performance issues. So the idea is to use these more "sophisticated" selectors that can be memoized and save performance.

### [React-Table v7](https://github.com/tannerlinsley/react-table)

React-table v7 is a "headless" table library for react. The headless part means that it is entirely customizable. Developers are responsible for how the tables' UI. I enjoy using it because it allows me to use the material-ui table components. The library provides mechanisms for filtering, sorting, paginating, etc. In this project, I have used it to make the tables sortable and paginated. As opposed to the sample application provided, I prefer to use pagination for better user experience instead of rendering all rows at once.

### [query-string](https://github.com/sindresorhus/query-string)

For parsing and stringifying URLs as the API exposed makes use of query params.

### [moment](https://momentjs.com/)

For data parsing and validation.

## Improvements

A couple of improvements I think would make my version better:

- ~~_Better form validation with yup_: Instead of using the `minDate` prop on the `MuiKeyboadDatePickerFormik` component to make sure the `endDate` is always after the `startDate`. It would be better to enforce this through yup, the form validation library. A bug that needs fixing is the following: when `endDate` and `startDate` are the same, `endTime` can be set _before_ `startTime`. Luckily, this does not cause the API to crash or whatever, and will only need fixing client-side using yup validation.~~
- _Better way to handle the export to csv feature_: More on this [here]()

### Wrap up

Looking at the length of this file .. maybe this was a stretch and totally unnecessary 🤦‍♂️. Nevertheless, please let me know about what you think. I would love to discuss things with you.
