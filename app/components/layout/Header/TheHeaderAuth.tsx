'use client'

import {useSession} from "next-auth/react";
import {
    NavbarItem,
    Button,
    Avatar,
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@nextui-org/react";
import {signIn, signOut} from "@/actions/authentication";

export default function TheHeaderAuth() {
    const session = useSession()

    const conditionalRendering = () => {
        if (session.status === 'loading') {
            return null
        } else if (session.data?.user) {
            return (
                <Popover placement="left">
                    <PopoverTrigger>
                        <Avatar src={session.data.user.image || ''}/>
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
        } else {
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
    }

    return conditionalRendering()
}
