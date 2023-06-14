import { describe, it, expect } from "vitest";

import { Exception, ClientException } from "exce";

describe("Exception", () => {
  it("should be a class", () => {
    const err = new ClientException("Fail");

    // expect(err).toBeInstanceOf(Error);
    // expect(err).toBeInstanceOf(Exception);
    // expect(err).toBeInstanceOf(ClientException);
    expect(err instanceof Error).toBe(true);
    expect(err instanceof Exception).toBe(true);
    expect(err instanceof ClientException).toBe(true);
  });
});
