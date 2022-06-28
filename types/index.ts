import Moralis from "moralis/types";

export interface User {
  user: Moralis.User<Moralis.Attributes> | null;
}
