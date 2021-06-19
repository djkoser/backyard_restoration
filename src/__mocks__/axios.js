/* eslint-disable no-undef */
const axios = {
  get: jest.fn(() => Promise.resolve({ data: {} }))
};

export default axios;