import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    Input,
} from "@nextui-org/react";
import TheHeaderAuth from "@/app/components/layout/Header/TheHeaderAuth";
import paths from "@/utils/paths";

export default function TheHeader(){
    return (
        <Navbar  className="shadow mb-6">
            <NavbarBrand>
                <Link href={paths.home()} className="font-bold">Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <Input />
            </NavbarContent>
            <NavbarContent justify="end">
                <TheHeaderAuth />
            </NavbarContent>
        </Navbar>
    )
}