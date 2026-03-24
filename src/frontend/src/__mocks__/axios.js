// Basit axios Jest mock'u (ESM import hatasını önler)
const mockAxios = {
  create: () => mockAxios,
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() }
  }
};
module.exports = mockAxios;
