import Link from "next/link";
import {Suspense} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent
} from "@nextui-org/react";
import TheHeaderAuth from "@/app/components/layout/Header/TheHeaderAuth";
import SearchInput from "@/app/components/layout/Header/search-input";
import paths from "@/utils/paths";

export default function TheHeader(){
    return (
        <Navbar  className="shadow mb-6">
            <NavbarBrand>
                <Link href={paths.home()} className="font-bold">Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <Suspense>
                    <SearchInput />
                </Suspense>
            </NavbarContent>
            <NavbarContent justify="end">
                <TheHeaderAuth />
            </NavbarContent>
        </Navbar>
    )
}