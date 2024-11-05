import { List, ListItem } from "@chakra-ui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { NavItem } from "./NavItem";

const items = [
  {
    label: "IEP",
    icon: MdOutlineSpaceDashboard,
    path: "/",
  },
  {
    label: "Students",
    icon: MdOutlineSpaceDashboard,
    path: "/students",
  },
  {
    label: "Security",
    icon: MdOutlineShoppingBag,
    path: "/security",
  },
];

export const Navigation = ({ collapse }) => (
  <List w="full" my={8}>
    {items.map((item, index) => (
      <ListItem key={index}>
        <NavItem item={item} collapse={collapse} />
      </ListItem>
    ))}
  </List>
);
