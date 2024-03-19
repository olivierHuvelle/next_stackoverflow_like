import {auth} from "@/auth/auth";
import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    Button,
    Avatar,
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@nextui-org/react";
import paths from "@/utils/paths";
import {signIn, signOut} from "@/actions/authentication";

export default async function TheHeader(){
    const session = await auth()

    const conditionalRendering = () => {
        if(session?.user){
            return (
                <Popover placement="left">
                    <PopoverTrigger>
                        <Avatar src={session.user.image || ''} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="p-4">
                            <form action={signOut}>
                                <Button type="submit" color="danger" variant="bordered">Sign Out</Button>
                            </form>
                        </div>
                    </PopoverContent>
                </Popover>
            )
        }
        return (
            <>
                <NavbarItem>
                    <form action={signIn}>
                        <Button type="submit" color="primary" variant="bordered">Sign In</Button>
                    </form>
                </NavbarItem>
                <NavbarItem>
                    <form action={signIn}>
                        <Button type="submit" color="success" variant="bordered">Sign up</Button>
                    </form>
                </NavbarItem>
            </>
        )
    }

    return (
        <Navbar  className="shadow mb-6">
            <NavbarBrand>
                <Link href={paths.home()} className="font-bold">Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <Input />
            </NavbarContent>
            <NavbarContent justify="end">
                {conditionalRendering()}
            </NavbarContent>
        </Navbar>
    )
}