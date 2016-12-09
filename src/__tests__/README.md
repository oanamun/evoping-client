# Unit Tests

This folder contains unit tests for the project.

We are using [Jest](https://facebook.github.io/jest) as a testing framework and [Enzyme](https://github.com/airbnb/enzyme)
as a testing utility for React.

A great source for testing React/Redux applications with Jest: http://academy.plot.ly/react/6-testing/

### Conventions

  - All unit test file names should have the following structure:
   ```
   ComponentName.test.js
   ```

### Running unit tests

In case you want to run all unit tests just execute:
  ```
  npm test
  ```

If you only want to run unit tests that you changed/added run the following command (make sure you have jest globally
installed):
  ```
  jest -o
  ```

### Testing components with minimum props

Use component's default props to test the render of minimum requirements:
  ```
  describe('<MyComponent />', () => {
    it('renders without exploding', () => {
      expect(shallow(<MyComponent />).length).toEqual(1);
    });
  });
  ```

### Testing Components which use React Intl

Following the React Intl documentation from
https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl a module named **helpers/intl-enzyme-test-helper.js** 
was created that export some wrapper functions for injecting English-locale intl context into the components.

If you have components that require access to the intl context import on of the wrapper functions:
  ```
  import { shallowWithIntl, mountWithIntl } from './helpers/intl-enzyme-test-helper';
  ```

Use these methods instead of the usual **shallow**, **mount** ones:
  ```
  const wrapper = shallowWithIntl(<CustomComponent />, {});
  ```
