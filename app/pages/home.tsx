import Header from "~/components/Header";
import type { Route } from "./+types/home";
import ShopCart from "~/components/ShopCart";
import SearchIcon from '../assets/icons/search.svg?react';
import CartIcon from '../assets/icons/cart.svg?react';
import BottomNavigation from "~/components/BottomNavigation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Not Store" },
    { name: "description", content: "The Not Contest store" },
  ];
}

export default function Home() {
  return (
    <>
      <Header title="Not Store" icons={[SearchIcon, CartIcon]} />
      <div className="grid p-4 grid-cols-2 gap-x-3 gap-y-7 pb-24">
        <ShopCart name="not for climbing" img="https://not-contest-cdn.openbuilders.xyz/items/2.jpg" price={1999} currency="NOT" />
        <ShopCart name="not for climbing" img="https://not-contest-cdn.openbuilders.xyz/items/2.jpg" price={1999} currency="NOT" />
        <ShopCart name="not for climbing" img="https://not-contest-cdn.openbuilders.xyz/items/2.jpg" price={1999} currency="NOT" />
        <ShopCart name="not for climbing" img="https://not-contest-cdn.openbuilders.xyz/items/2.jpg" price={1999} currency="NOT" />
        <ShopCart name="not for climbing" img="https://not-contest-cdn.openbuilders.xyz/items/2.jpg" price={1999} currency="NOT" />
        <ShopCart name="not for climbing" img="https://not-contest-cdn.openbuilders.xyz/items/2.jpg" price={1999} currency="NOT" />
        <ShopCart name="not for climbing" img="https://not-contest-cdn.openbuilders.xyz/items/2.jpg" price={1999} currency="NOT" />
        <ShopCart name="not for climbing" img="https://not-contest-cdn.openbuilders.xyz/items/2.jpg" price={1999} currency="NOT" />
        <ShopCart name="not for climbing" img="https://not-contest-cdn.openbuilders.xyz/items/2.jpg" price={1999} currency="NOT" />
        <ShopCart name="not for climbing" img="https://not-contest-cdn.openbuilders.xyz/items/2.jpg" price={1999} currency="NOT" />

      </div>
      <BottomNavigation />
    </>
  );
}
