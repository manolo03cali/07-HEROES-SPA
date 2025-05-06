import "whatwg-fetch";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock("query-string", () => ({
  parse: jest.fn(() => ({})),
  stringify: jest.fn(() => ""),
}));
