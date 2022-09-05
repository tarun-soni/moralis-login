import Image from "next/image";
import { useRouter } from "next/router";
import React, { lazy } from "react";
import { useMoralis } from "react-moralis";
import { useStore } from "../store";

function Nav() {
  const { isAuthenticated, user, removeUser } = useStore();
  const { push } = useRouter();
  const { logout } = useMoralis();

  const renderAuthenticatedNav = () => {
    return <></>;
  };

  const logoutPress = async () => {
    console.log("logout");
    await logout();
    removeUser();
    push("/");
  };

  console.log("user :>> ", user);

  if (!isAuthenticated) return null;

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Moralis - login</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ">
              {/* <img src="https://api.lorem.space/image/face?hash=33791" /> */}
              <Image
                alt="avatar"
                width={50}
                height={50}
                src={`https://avatars.dicebear.com/api/pixel-art-neutral/${user?.user?.attributes?.ethAddress}.svg`}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="border-2 menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-72"
          >
            <li>
              <a className="text-violet-300">
                {user?.user?.attributes?.username}
              </a>
            </li>
            <li onClick={logoutPress}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
