import { isDomainAllowed } from "./form-service";
import { describe, expect, it } from "vitest";

describe("isDomainAllowed", () => {
  it("returns false if the domain is not in the allow list", () => {
    const request = new Request("https://example.com");
    const form = {
      domainAllowList: ["example.org"],
    };

    expect(isDomainAllowed(request, form)).toBe(false);
  });

  it("returns true if the domain is in the allow list", () => {
    const request = new Request("https://example.com");
    const form = {
      domainAllowList: ["example.com"],
    };

    expect(isDomainAllowed(request, form)).toBe(true);
  });

  it("returns false if the allow list is empty", () => {
    const request = new Request("https://example.com");
    const form = {
      domainAllowList: [],
    };

    expect(isDomainAllowed(request, form)).toBe(false);
  });
});
