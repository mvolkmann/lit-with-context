import { createContext } from "@lit/context";

export interface MyContext {
  name: string;
  setName: (name: string) => void;
}

export const myContext = createContext<MyContext>("my-context");
