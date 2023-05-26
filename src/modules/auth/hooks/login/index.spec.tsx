import { defaultRenderHook } from "src/tests";

import { useLoginController } from "./index";

describe("modules > auth > hooks > login", () => {
  it("should render", () => {
    const { result } = defaultRenderHook(() =>
      useLoginController({
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
        useLoginController({
          navigation: {
            navigate: jest.fn(),
          } as never,
        })
      );

      expect(result.current.isButtonSubmitDisabled).toBeTruthy();
    });

    it("should be true when form is valid and is submitting", () => {
      const { result } = defaultRenderHook(() =>
        useLoginController({
          navigation: {
            navigate: jest.fn(),
          } as never,
        })
      );

      expect(result.current.isButtonSubmitDisabled).toBeTruthy();
    });

    it("should be false when form is valid and is not submitting", () => {
      // here should create a component to test
    });
  });

  describe("isLoading", () => {
    it("should be true when form is submitting", () => {
      // here should create a component to test
    });

    it("should be false when form is not submitting", () => {
      const { result } = defaultRenderHook(() =>
        useLoginController({
          navigation: {
            navigate: jest.fn(),
          } as never,
        })
      );

      expect(result.current.isLoading).toBeFalsy();
    });
  });
});

export {};
