import { render, screen } from "@testing-library/react";
import Message from "./Message";
import { userContext } from "../../context/userContext";
import { getTime } from "../../utils/getTime";
import {
  fakeObjMessageA,
  fakeObjMessageB,
  fakeProviderValue,
} from "../../utils/fakeValues";
import { IChildrenProps } from "../../interfaces/childrenPropsInterface";

const FakeUserProvider = ({ children }: IChildrenProps) => {
  const { Provider } = userContext;
  return <Provider value={fakeProviderValue}>{children}</Provider>;
};

describe("message component", () => {
  it("renders with text", () => {
    render(<Message message={fakeObjMessageA} />);

    expect(screen.getByText(fakeObjMessageA.description)).toBeInTheDocument();
  });

  it("renders with image", () => {
    render(<Message message={fakeObjMessageA} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("dynamyc styles works", () => {
    render(
      <FakeUserProvider>
        <Message message={fakeObjMessageA} />
      </FakeUserProvider>
    );
    expect(screen.getByRole("messageContainer")).toHaveClass("current");
  });

  it("dynamyc styles not works with the uncurrent user", () => {
    render(
      <FakeUserProvider>
        <Message message={fakeObjMessageB} />
      </FakeUserProvider>
    );
    expect(screen.getByRole("messageContainer")).not.toHaveClass("current");
  });

  it("getTime function works currently", () => {
    render(<Message message={fakeObjMessageB} />);
    expect(getTime("2022-02-02T14:01:59.276Z", false)).toMatch(
      "02.02.2022 14:01"
    );
    expect(getTime("2022-02-02T14:01:59.276Z", true)).toMatch("14:01");
    expect(screen.getByRole("time").innerHTML).toMatch("02.02.2022 14:01");
    expect(screen.getByText("02.02.2022 14:01")).toBeInTheDocument();
  });
});
