import { cookies } from "next/headers";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import IconButton from '@mui/material/IconButton';

export default async function UserIcon() {
    const isLoggedIn = cookies().get("Authorization");
    return (
        <div>
            {
                !isLoggedIn ?
                    <IconButton aria-label='account' href="/login">
                        <PermIdentityIcon />
                    </IconButton>
                    :
                    <IconButton aria-label='profile' href="/profile">
                        <AccountCircleIcon />
                    </IconButton>
            }
        </div>
    )
}