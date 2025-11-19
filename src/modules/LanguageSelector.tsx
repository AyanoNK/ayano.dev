"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageSelector() {
  const [position, setPosition] = React.useState("bottom"); // fix: this is a redirect to the selected language page

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="noShadow">Language selector</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel inset>Language</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ja">日本語</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
