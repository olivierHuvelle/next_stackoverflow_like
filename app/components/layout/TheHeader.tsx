import {auth} from "@/auth/auth";
import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    Button,
    Avatar
} from "@nextui-org/react";
import paths from "@/utils/paths";

export default async function TheHeader(){
    const session = await auth()

    return (
        <Navbar  className="shadow mb-6">
            <NavbarBrand>
                <Link href={paths.home()} className="font-bold">Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <Input />
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <div>{session?.user ? 'signed in' : 'signed out'}</div>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}