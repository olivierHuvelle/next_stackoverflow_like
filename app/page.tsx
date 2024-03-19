import {signIn, signOut} from "@/actions/authentication";
import {auth} from "@/auth/auth";
import {Button} from "@nextui-org/react";

export default async function Home() {
    const session = await auth()

    return (
        <main>
            <div>
                <form action={signIn}>
                    <Button type="submit">Sign In</Button>
                </form>

                <form action={signOut}>
                    <Button type="submit">Sign Out</Button>
                </form>

                {
                    session?.user ? <div>{JSON.stringify(session.user)}</div> : <div>Signed out</div>
                }
            </div>
        </main>
    );
}
