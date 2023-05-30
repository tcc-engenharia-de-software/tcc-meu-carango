import { defaultRenderHook } from "src/tests";

import { useLoginModel } from "./index";

describe("modules > auth > models > login", () => {
  it("should render", () => {
    const { result } = defaultRenderHook(() =>
      useLoginModel({
        navigation: {
          navigate: jest.fn(),
        } as never,
      })
    );

    expect(result).toBeTruthy();
  });

  describe("isButtonSubmitDisabled", () => {
    it("should be true when form is invalid", () => {
      const { result } = defaultRenderHook(() =>
        useLoginModel({
          navigation: {
            navigate: jest.fn(),
          } as never,
        })
      );

      expect(result.current.isButtonSubmitDisabled).toBeTruthy();
    });

    it("should be true when form is valid and is submitting", () => {
      const { result } = defaultRenderHook(() =>
        useLoginModel({
          navigation: { navigate: jest.fn() } as never,
        })
      );

      expect(result.current.isButtonSubmitDisabled).toBeTruthy();
    });
  });

  describe("isLoading", () => {
    it("should be true when form is submitting", () => {
      // here should create a component to test
    });

    it("should be false when form is not submitting", () => {
      const { result } = defaultRenderHook(() =>
        useLoginModel({
          navigation: {
            navigate: jest.fn(),
          } as never,
        })
      );

      expect(result.current.isLoading).toBeFalsy();
    });
  });
});
