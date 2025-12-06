"use client";

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
  // get current language from url
  const position = window.location.pathname.startsWith("/es")
    ? "es"
    : window.location.pathname.startsWith("/ja")
      ? "ja"
      : "en";

  const handleOnSetPosition = (value: string) => {
    // redirect to the selected language
    window.location.href = `/${value}`;
  };

  return (
    // TODO: redo to not use client side rendering
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="noShadow">Language selector</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel inset>Language</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={handleOnSetPosition}>
            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ja">日本語</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
